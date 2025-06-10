<template>
  <el-dialog class="method-editor-dialog" :model-value="props.modelValue" :title="'方法编辑：' + props.data.name" fullscreen :close-on-click-modal="false" :show-close="false" append-to-body>
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">方法编辑：{{ props.data.name }}</div>
        <div class="method-editor-buttons">
          <el-button type="primary" @click="testMethod">预览Lua代码</el-button>
          <el-button type="primary" @click="saveMethod">保存</el-button>
          <el-button type="warning" plain @click="resetToDefault">清空</el-button>
          <el-button type="danger" @click="closeMethod">关闭</el-button>
        </div>
      </div>
    </template>
    <div class="method-editor">
      <div ref="blocklyDiv" class="blockly-container"></div>
    </div>
    <div class="bottom-info">
      <p>注意：编辑完成后请点击保存按钮以保存修改。</p>
      <p>@ Powr By Blockly</p>
    </div>
  </el-dialog>
  <el-dialog v-model="showCodeDialog" title="预览Lua代码" :close-on-click-modal="false" :show-close="true" width="80%" append-to-body>
    <pre v-highlight><code class="lua">{{ code }}</code></pre>
    <template #footer>
      <el-button type="primary" @click="copyTextToClip(code, '代码复制成功！')">复制</el-button>
      <el-button type="danger" @click="showCodeDialog = false">关闭</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { nextTick, onMounted, ref, toRaw } from 'vue';
import * as Blockly from 'blockly';
import { luaGenerator, Order } from 'blockly/lua';
import toolbox_server from '@/blockly/toolboxes/toolbox_server.js';
import { ElMessageBox } from 'element-plus';
import { copyTextToClip } from '@/utils/web.js';

// 当需要弹出param工具栏时，都临时创建一个block类别，然后将那个block放进去
const methodParamsCallback = function (workspace) {
  const blockList = [];
  workspace.localMethod.params.forEach((v) => {
    const blkType = 'param_get_' + v.name;
    blockList.push({
      kind: 'block',
      type: blkType
    });
  });
  return blockList;
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['update:modelValue', 'save']);

const close = () => {
  emit('update:modelValue', false);
  const rawWorkspace = toRaw(workspace.value);
  if (rawWorkspace) {
    rawWorkspace.dispose();
  }
};
const localMethod = ref();
const workspace = ref();
const blocklyDiv = ref();
onMounted(() => {
  nextTick(() => {
    initBlockly();
  });
});
const closeMethod = () => {
  ElMessageBox.confirm('关闭编辑页面会导致未保存数据丢失，是否确认关闭？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    close();
  });
};

const initBlockly = () => {
  workspace.value = Blockly.inject(blocklyDiv.value, {
    media: 'https://unpkg.com/blockly@10.0.0/media/',
    toolbox: toolbox_server,
    scrollbars: true,
    trashcan: true,
    collapse: true,
    renderer: 'thrasos',
    grid: {
      spacing: 20,
      length: 2,
      colour: '#ccc'
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true
    }
  });
  const rawWorkspace = toRaw(workspace.value);
  localMethod.value = JSON.parse(JSON.stringify(props.data));
  rawWorkspace.localMethod = localMethod.value;
  rawWorkspace.registerToolboxCategoryCallback('METHOD_PARAMS', methodParamsCallback);
  localMethod.value.params.forEach((v) => {
    const blkType = 'param_get_' + v.name;
    Blockly.defineBlocksWithJsonArray([
      {
        type: blkType,
        message0: v.message,
        output: v.type,
        colour: 112 // TODO 颜色换个好看点的
      }
    ]);
    luaGenerator.forBlock[blkType] = () => [v.name, Order.ATOMIC];
  });

  // 加载已有块
  workspace.value.addChangeListener(onBlocklyChange);
  if (localMethod.value.blocksState) {
    Blockly.serialization.workspaces.load(localMethod.value.blocksState, rawWorkspace);
  } else {
    addDefaultStartBlock();
  }
};
const addDefaultStartBlock = () => {
  const rawWorkspace = toRaw(workspace.value);
  const startBlock = rawWorkspace.newBlock('function_start');
  startBlock.initSvg();
  startBlock.render();
  startBlock.setDeletable(false);
  startBlock.moveBy(30, 30);
};
const onBlocklyChange = (event) => {
  // 确保function_start块不能被删除
  const rawWorkspace = toRaw(workspace.value);
  if (event.type === Blockly.Events.BLOCK_DELETE) {
    const block = rawWorkspace.getBlockById(event.blockId);
    if (block && block.type === 'function_start') {
      Blockly.Events.disable();
      addDefaultStartBlock();
      Blockly.Events.enable();
    }
  }
};

const code = ref('');
const showCodeDialog = ref(false);
const testMethod = async () => {
  const rawWorkspace = toRaw(workspace.value);
  try {
    code.value = luaGenerator.workspaceToCode(rawWorkspace);
    showCodeDialog.value = true;
  } catch (error) {
    ElMessageBox.alert('预览lua失败: ' + error.message, { type: 'error' });
  }
};
const saveMethod = () => {
  const rawWorkspace = toRaw(workspace.value);
  localMethod.value.blocksState = Blockly.serialization.workspaces.save(rawWorkspace);
  emit('save', {
    blocksState: localMethod.value.blocksState
    // blocksCode: luaGenerator.workspaceToCode(rawWorkspace)
  });
};
const resetToDefault = () => {
  ElMessageBox.confirm('清空会导致未保存数据丢失，是否确认清空？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localMethod.value.blocksJson = null;
    localMethod.value.isDefault = true;
    const rawWorkspace = toRaw(workspace.value);
    rawWorkspace.clear();
    addDefaultStartBlock();
  });
};
</script>
<style>
.method-editor-dialog {
  overflow: hidden !important;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.dialog-title {
  color: var(--text-color-title);
}

.blockly-container {
  height: calc(100vh - 168px);
  width: 100%;
  border: 1.4px solid #5f92cd;
  border-radius: var(--el-border-radius-base);
}

:deep(.injectionDiv) {
  border-radius: var(--el-border-radius-base);
}

.bottom-info {
  line-height: 1;
  color: var(--el-button-border-color);
  font-size: 0.9rem;
  text-align: right;
}

code {
  height: 40vh;
  border: 1px solid var(--selected-background-color);
  border-radius: var(--el-border-radius-base);
  font-family: Consolas, 'Courier New', Courier, monospace !important;
}

.blocklyToolboxCategory {
  cursor: pointer;
  display: flex;
  padding: 2px 0;
  align-items: center;
}

/* 下拉框无法显示，抬一下z */
.blocklyDropDownDiv {
  z-index: 9999;
}

@media (prefers-color-scheme: dark) {
  .blocklySvg {
    background-color: #222;
  }

  .blocklyToolbox {
    background-color: #333;
  }

  .blocklyFlyoutBackground {
    fill: #333;
  }
}
</style>
