<template>
  <div class="w-full min-h-screen flex flex-col">
    <NavView />
    <div class="flex flex-col">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import NavView from './components/NavView.vue'
</script>
<style>
body {
  background-color: #ffa29d;
}
</style>
