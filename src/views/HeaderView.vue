<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useModStore } from '@/stores/mod.js';

const activeIndex = ref('home');

const router = useRouter();
const modStore = useModStore();

const handleSelect = (index) => {
  activeIndex.value = index;
  const isRouter = index.startsWith('/');
  if (isRouter) {
    router.push(index);
  } else {
    switch (index) {
      case '@newMod':
        modStore.newMod().then(() => {
          router.push('/mod');
        });
        break;
      case '@loadMod':
        modStore.loadMod().then(() => {
          router.push('/mod');
        });
        break;
      case '@saveMod':
        modStore.saveMod();
        break;
      case '@exportLua':
        modStore.exportLua();
        break;
      default:
        console.warn('未知操作:', index);
    }
  }
};
const path = computed(() => router.currentRoute.value.fullPath);
</script>
<template>
  <el-menu :default-active="activeIndex" :ellipsis="false" class="el-menu-demo" mode="horizontal" background-color="#707e9c" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item index="/home" style="font-size: 1.2em">
      <img src="@/assets/favicon.png" alt="Logo" style="width: 30px; height: auto; margin-right: 10px" />
      拓展包制作器
    </el-menu-item>
    <el-menu-item v-if="path !== '/mod' && modStore.currentMod" index="/mod">返回项目</el-menu-item>
    <el-sub-menu>
      <template #title>项目管理</template>
      <el-menu-item index="@newMod">新建项目</el-menu-item>
      <el-menu-item index="@loadMod">加载项目</el-menu-item>
      <el-menu-item index="@saveMod">保存项目</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="@exportLua" v-if="modStore.currentMod">导出Lua包</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
  </el-menu>
</template>
<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
