<template>
  <el-form label-width="80px" :model="localValue" :rules="formRules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item prop="name">
          <template #label>
            <span>技能名称</span>
            <span class="remark">（长度限制10）</span>
          </template>
          <el-input v-model="localValue.name" placeholder="技能名称" maxlength="10"></el-input>
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
    <el-form-item label="技能描述" prop="description">
      <el-input type="textarea" :rows="4" v-model="localValue.description" placeholder="这是一个刚创建的技能，请添加相关信息"></el-input>
    </el-form-item>
    <el-form-item label="技能标签" prop="tags">
      <el-select v-model="localValue.tags" multiple placeholder="Select" style="width: 100%">
        <el-option v-for="item in skillTagOptions" :key="item.value" :label="item.label" :value="item.value"
      /></el-select>
    </el-form-item>
    <el-form-item label="技能效果">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="showAddEffectDialog = true">添加效果</el-button>
        </el-col>
        <el-col :span="24">
          <el-table :data="localValue.effects" border class="table">
            <el-table-column prop="name" label="效果名" min-width="100" />
            <el-table-column prop="description" label="描述" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.description || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="80" align="center">
              <template #default="scope">
                <el-button type="text" @click="() => openEffectMethodsDialog(scope.row)"> 方法配置 </el-button>
                <el-button type="danger" text @click="deleteEffect(scope.$index, scope.row)"> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <AddEffectDialog v-model="showAddEffectDialog" @create="createEffect" />
  <EffectMethodsDialog v-model="showEffectMethodsDialog" :data="effectMethods"></EffectMethodsDialog>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddEffectDialog from '@/components/AddEffectDialog.vue';
import EffectMethodsDialog from '@/components/EffectMethodsDialog.vue';
import { getTemplateByEffectType } from '@/utils/effects.js';
import { createNewEffect } from '@/utils/models.js';

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
const skillTagOptions = [
  { label: '主公技', value: 'Skill.Lord' },
  { label: '锁定技', value: 'Skill.Compulsory' }
  // { label: '限定技', value: 'Skill.Limited' },
  // { label: '觉醒技', value: 'Skill.Wake' },
  // { label: '转换技', value: 'Skill.Switch' },
  // { label: '使命技', value: 'Skill.Quest' },
  // { label: '持恒技', value: 'Skill.Permanent' },
  // { label: '主将技', value: 'Skill.MainPlace' },
  // { label: '副将技', value: 'Skill.DeputyPlace' },
  // { label: '隐匿技', value: 'Skill.Hidden' },
  // { label: '势力技', value: 'Skill.AttachedKingdom' },
  // { label: '蓄力技', value: 'Skill.Charge' },
  // { label: '宗族技', value: 'Skill.Family' },
  // { label: '连招技', value: 'Skill.Combo' },
  // { label: '韵律技', value: 'Skill.Rhyme' },
  // { label: '奋武技', value: 'Skill.Force' },
  // { label: '昂扬技', value: 'Skill.Spirited' }
];
watchEffect(() => {
  updateValue(localValue.value);
});
const formRules = reactive({
  name: [{ required: true, message: '技能名称不能为空', trigger: 'change' }],
  internal_name: [
    { required: true, message: '内部名称不能为空', trigger: 'change' },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
      message: '仅允许英文开头，且仅包含英文字母、数字、下划线',
      trigger: 'change'
    }
  ]
});

// 技能效果
const showAddEffectDialog = ref(false);

const createEffect = (data) => {
  const template = getTemplateByEffectType(data.type);
  if (!template || Object.keys(template).length === 0) {
    ElMessage.error('未找到效果模板');
    return;
  }
  const newEffect = createNewEffect(data);
  // 合并模板和新效果
  const resEffect = { ...JSON.parse(JSON.stringify(template)), ...newEffect };
  localValue.value.effects.push(resEffect);
  return resEffect;
};

const deleteEffect = (index, data) => {
  ElMessageBox.confirm(`确定删除效果【${data.name}】吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localValue.value.effects.splice(index, 1);
    ElMessage.success('删除成功');
  });
};

const showEffectMethodsDialog = ref(false);
const effectMethods = ref([]);
const openEffectMethodsDialog = (effect) => {
  effectMethods.value = effect.methods;
  showEffectMethodsDialog.value = true;
};
</script>

<style scoped>
.remark {
  font-size: 0.8em;
  color: var(--el-button-border-color);
}

.table {
  margin-top: 10px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 800px;
}
</style>
