<script setup lang="ts">
import LayoutHeader from "@/components/LayoutHeader.vue";
import LayoutFooter from "@/components/LayoutFooter.vue";
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col w-full">
    <header class="bg-white fixed t-0 left-0 right-0 z-99">
      <LayoutHeader/>
    </header>

    <main class="flex-1 mt-26">
      <RouterView/>
    </main>

    <footer class="bg-white">
      <LayoutFooter/>
    </footer>
  </div>

</template>
