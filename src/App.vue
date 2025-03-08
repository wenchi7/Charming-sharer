<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- <NavView /> -->
    <div class="flex flex-col">
      <SideBar v-if="showSideBar" class="fixed top-1/4 left-0 h-full w-32 z-50" />

      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
// import NavView from './components/NavView.vue'
import SideBar from './view/SideBar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showSideBar = computed(() => {
  return route.meta.requiresSideBar
})
</script>
<style>
body {
  background-color: #d89bc0;
}
</style>
