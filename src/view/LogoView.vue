<template>
  <div>
    <RouterLink
        :to="{ name: 'home' }"
        class="flex flex-col w-60 my-4 text-center text-4xl font-bold leading-[1.15] cursor-pointer"
      >
        <p class="rotate-[-2deg]">CHARMING</p>
        <p class="rotate-[-10deg] translate-x-4 tracking-widest">SHARER</p>
      </RouterLink>
  </div>
</template>
