import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createNewGeneral, createNewMod, createNewPackage, createNewSkill } from '@/utils/models.js';
import { loadModFromFile, saveModToFile } from '@/utils/fileHandler.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { exportToLua } from '@/utils/exporter.js';
import localforage from 'localforage';

const autoSaveKey = 'autoSaveMod';
const autoSaveInterval = 5000;

export const useModStore = defineStore('mod', () => {
  const storage = localforage.createInstance({
    name: 'localStorage',
    storeName: 'localStore'
  });

  const saveLocalData = async (key, value) => {
    try {
      await storage.setItem(key, value);
    } catch (error) {
      console.error('保存数据到本地失败:', error);
      throw new Error('保存数据到本地失败');
    }
  };

  const loadLocalData = async (key) => {
    try {
      return await storage.getItem(key);
    } catch (error) {
      console.error('从本地加载数据失败:', error);
      throw new Error('从本地加载数据失败');
    }
  };

  // 当前项目
  const currentMod = ref(null);

  loadLocalData(autoSaveKey).then((res) => {
    if (res) {
      currentMod.value = JSON.parse(res);
      setCurrentNode({
        type: 'mod',
        value: currentMod.value
      });
    }
  });

  const autoSaveModeTimout = ref(null);
  const autoSaveMod = () => {
    autoSaveModeTimout.value = setTimeout(async () => {
      const mod = currentMod.value;
      if (mod) {
        await saveLocalData(autoSaveKey, JSON.stringify(mod));
      }
      autoSaveMod();
    }, autoSaveInterval);
  };
  autoSaveMod();

  // 当前节点
  const currentNode = ref({
    type: '',
    value: null
  });

  const setCurrentMod = (mod) => {
    currentMod.value = mod;
  };

  const setCurrentNode = (node) => {
    currentNode.value = node;
  };

  // 创建mod
  const newMod = async () => {
    if (currentMod.value) {
      const confirm = await ElMessageBox.confirm('当前有正在操作的项目，新建项目会覆盖当前项目，请确认进度是否已保存？', '警告', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => null);
      if (!confirm) return;
    }
    setCurrentMod(createNewMod());
    setCurrentNode({
      type: 'mod',
      value: currentMod.value
    });
  };

  // 加载mod
  const loadMod = async () => {
    if (currentMod.value) {
      const confirm = await ElMessageBox.confirm('当前有正在操作的项目，加载项目会覆盖当前项目，请确认进度是否已保存？', '警告', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => null);
      if (!confirm) return;
    }
    try {
      const mod = await loadModFromFile();
      setCurrentMod(mod);
      setCurrentNode({
        type: 'mod',
        value: mod
      });
    } catch (error) {
      await ElMessageBox.alert('加载失败: ' + error.message);
    }
  };

  // 保存mod
  const saveMod = async () => {
    if (!currentMod.value) {
      await ElMessageBox.alert('没有可保存的项目，请先创建或加载项目。');
      return;
    }
    try {
      await saveModToFile(currentMod.value);
    } catch (error) {
      await ElMessageBox.alert('保存失败: ' + error.message);
    }
    await ElMessageBox.alert(`项目【${currentMod.value.name}】已保存`, '保存成功', {
      type: 'success'
    });
  };

  // 导出Lua
  const exportLua = async () => {
    try {
      await exportToLua(currentMod.value);
    } catch (error) {
      console.error(error); // FIXME: 神秘报错机制导致压根无法捕获到错误
      await ElMessageBox.alert('导出失败: ' + error.message);
    }
    await ElMessageBox.alert(`项目【${currentMod.value.name}】已导出Lua`, '导出成功', {
      type: 'success'
    });
  };

  // 添加包
  const addPackage = () => {
    const newPkg = createNewPackage();
    currentNode.value.value.packages.push(newPkg);
  };

  // 添加武将
  const addGeneral = () => {
    const newGen = createNewGeneral();
    currentNode.value.value.generals.push(newGen);
  };

  // 添加技能
  const addSkill = () => {
    const newSkill = createNewSkill();
    currentNode.value.value.skills.push(newSkill);
  };

  // 删除包或武将
  const deletePackage = () => {
    const node = currentNode.value.value;
    let tips = `确认删除包【${node.name}】？`;
    if (node.generals.length > 0 || node.skills.length > 0) {
      tips = `删除包【${node.name}】将会删除所有包含的武将和技能，是否继续？`;
    }
    ElMessageBox.confirm(tips, '警告', {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deletePackageInMod(node.id);
      ElMessage.success('删除成功！');
    });
  };
  const deletePackageInMod = (packageId) => {
    currentMod.value.packages = currentMod.value.packages.filter((p) => p.id !== packageId);
    if (currentNode.value.value.id === packageId) {
      currentNode.value = {
        type: 'mod',
        value: currentMod.value
      };
    }
  };
  // 删除武将
  const deleteGeneral = () => {
    const node = currentNode.value.value;
    const tips = `确认删除武将【${node.name}】？`;
    ElMessageBox.confirm(tips, '警告', {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleteGeneralInMod(node.id);
      ElMessage.success('删除成功！');
    });
  };

  const deleteGeneralInMod = (generalId) => {
    for (const pkg of currentMod.value.packages) {
      const index = pkg.generals.findIndex((g) => g.id === generalId);
      if (index !== -1) {
        pkg.generals.splice(index, 1);
        if (currentNode.value.value.id === generalId) {
          currentNode.value = {
            type: 'package',
            value: pkg
          };
        }
        break;
      }
    }
  };

  const deleteSkill = () => {
    const node = currentNode.value.value;
    const tips = `确认删除技能【${node.name}】？`;
    ElMessageBox.confirm(tips, '警告', {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleteSkillInMod(node.id);
      ElMessage.success('删除成功！');
    });
  };

  const deleteSkillInMod = (skillId) => {
    for (const pkg of currentMod.value.packages) {
      const index = pkg.skills.findIndex((g) => g.id === skillId);
      if (index !== -1) {
        pkg.skills.splice(index, 1);
        if (currentNode.value.value.id === skillId) {
          currentNode.value = {
            type: 'package',
            value: pkg
          };
        }
        break;
      }
    }
  };

  return {
    saveLocalData,
    loadLocalData,
    currentMod,
    currentNode,
    setCurrentNode,
    newMod,
    saveMod,
    loadMod,
    exportLua,
    addPackage,
    addGeneral,
    addSkill,
    deletePackage,
    deleteGeneral,
    deleteSkill
  };
});
