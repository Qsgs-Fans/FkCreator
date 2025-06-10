<template>
  <el-form :model="localValue" label-width="80px" :rules="formRules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item prop="name">
          <template #label>
            <span>武将姓名</span>
            <span class="remark">（长度限制20）</span>
          </template>
          <el-input v-model="localValue.name" placeholder="请输入武将名称" maxlength="20"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="internal_name">
          <template #label>
            <span>内部名称（code）</span>
            <span class="remark">（长度限制60）</span>
          </template>
          <el-input v-model="localValue.internal_name" placeholder="请输入内部名称" maxlength="60"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-select v-model="localValue.gender">
            <el-option value="General.Male" label="男" />
            <el-option value="General.Female" label="女" />
            <el-option value="General.Agender" label="无性别" />
            <el-option value="General.Bigender" label="双性别（用于男女同框）" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="势力" prop="kingdom">
          <el-select v-model="localValue.kingdom">
            <el-option value="wei" label="魏" />
            <el-option value="shu" label="蜀" />
            <el-option value="wu" label="吴" />
            <el-option value="qun" label="群" />
            <el-option value="jin" label="晋" />
            <el-option value="god" label="神" />
            <el-option value="evil" label="魔" />
            <el-option value="qin" label="秦" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="初始体力" class="number-input" prop="hp">
        <el-input-number v-model="localValue.hp" :min="1" :max="1000" @change="localValue.maxHp = Math.max(localValue.maxHp, localValue.hp)" />
      </el-form-item>
      <el-form-item label="体力上限" class="number-input" prop="maxHp">
        <el-input-number v-model="localValue.maxHp" :min="localValue.hp" :max="1000" />
      </el-form-item>
      <el-form-item label="初始护甲" class="number-input" prop="shield">
        <el-input-number v-model="localValue.shield" :min="0" :max="5" />
      </el-form-item>
      <el-switch
        v-model="localValue.hidden"
        class="mb-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="隐藏武将（只能通过自由选将选择）"
        inactive-text="正常武将"
        prop="hidden"
      />
    </el-row>
    <el-form-item label="绑定技能">
      <el-autocomplete v-model="skillSearch" :fetch-suggestions="querySkillSearch" placeholder="请输入技能名称 或 技能内部名称" @select="handleSkillSelect">
        <template #append>
          <el-button @click="addCustomSkill(skillSearch)">
            <span>直接添加<span class="info">（非本扩展包技能）</span></span>
          </el-button>
        </template>
        <template #loading>
          <el-icon class="is-loading">
            <svg class="circular" viewBox="0 0 20 20">
              <g class="path2 loading-path" stroke-width="0" style="animation: none; stroke: none">
                <circle r="3.375" class="dot1" rx="0" ry="0" />
                <circle r="3.375" class="dot2" rx="0" ry="0" />
                <circle r="3.375" class="dot4" rx="0" ry="0" />
                <circle r="3.375" class="dot3" rx="0" ry="0" />
              </g>
            </svg>
          </el-icon>
        </template>
        <template #default="{ item }">
          <span>{{ item.name }} ({{ item.internal_name }})</span>
        </template>
      </el-autocomplete>
      <div class="tips">（如需添加本扩展包技能，请在下拉搜索结果中点击；否则请点击“直接添加”）</div>
      <div class="skill-list">
        <template v-for="skill in localValue.skills" :key="skill">
          <el-tag size="large" type="success" closable @close="localValue.skills.splice(localValue.skills.indexOf(skill), 1)">
            <span v-html="getSkillLabel(skill)"></span>
          </el-tag>
        </template>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import { useModStore } from '@/stores/mod.js';
import { ElMessage, ElMessageBox } from 'element-plus';

const modStore = useModStore();

const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(['update:modelValue']);
const localValue = ref(modelValue);
const updateValue = (value) => {
  localValue.value = value;
  emits('update:modelValue', localValue.value);
};
watchEffect(() => {
  updateValue(localValue.value);
});
// 初始体力不能大于体力上限
const validateHp = (rule, value, callback) => {
  if (value > localValue.value.maxHp) {
    callback(new Error('初始体力不能大于体力上限'));
    return;
  }
  callback();
};
const formRules = reactive({
  name: [{ required: true, message: '武将姓名不能为空', trigger: 'change' }],
  internal_name: [
    { required: true, message: '内部名称不能为空', trigger: 'change' },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
      message: '仅允许英文开头，且仅包含英文字母、数字、下划线',
      trigger: 'change'
    }
  ],
  gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
  hp: [{ validator: validateHp, trigger: 'change' }]
});

const skillSearch = ref('');
const querySkillSearch = (queryString, cb) => {
  const results = [];
  if (!queryString) {
    cb(results);
    return;
  }
  const mod = modStore.currentMod;
  for (let i = 0; i < mod.packages.length; i++) {
    const pkg = mod.packages[i];
    const skills = pkg.skills;
    if (skills) {
      for (let j = 0; j < skills.length; j++) {
        const skill = skills[j];
        if (skill.name.includes(queryString) || skill.internal_name.includes(queryString)) {
          results.push(skill);
        }
      }
    }
  }
  cb(results);
};

const handleSkillSelect = (item) => {
  if (!localValue.value.skills) {
    localValue.value.skills = [];
  }
  if (localValue.value.skills.some((skill) => skill === item.internal_name)) {
    ElMessage.warning('技能已存在');
    return;
  }
  localValue.value.skills.push(item.internal_name);
};
const getSkillLabel = (internalName) => {
  const mod = modStore.currentMod;
  for (let i = 0; i < mod.packages.length; i++) {
    const pkg = mod.packages[i];
    const skill = pkg.skills.find((s) => s.internal_name === internalName);
    if (skill) {
      return `${skill.internal_name}<span class="info">（${pkg.name}-${skill.name}）</span>`;
    }
  }
  return `${internalName}<span class="info">（非本扩展技能）</span>`;
};
const addCustomSkill = (skillCode) => {
  if (!skillCode || !skillCode.trim()) {
    return;
  }
  ElMessageBox.confirm(`是否添加自定义技能 "${skillCode}"？`, '添加自定义技能', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      if (!localValue.value.skills) {
        localValue.value.skills = [];
      }
      if (localValue.value.skills.includes(skillCode)) {
        ElMessage.warning('技能已存在');
        return;
      }
      localValue.value.skills.push(skillCode);
    })
    .catch(() => {});
};
</script>

<style scoped>
.remark {
  font-size: 0.8em;
  color: var(--el-button-border-color);
}

.tips {
  color: var(--text-color-remark);
}

.number-input {
  width: 20%;
  min-width: 120px;
}

.skill-list {
  width: 100%;
  margin-top: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

:deep(.el-tag__content) {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #317725;
}

:deep(.el-input-group__append) {
  background: #f0f9eb;
}

:deep(.el-input-group__append button.el-button span) {
  color: #317725;
}

:deep(.info) {
  font-size: 0.8rem;
  color: #50a5a5 !important;
  margin-left: 5px;
}
</style>
