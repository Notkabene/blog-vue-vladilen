<script setup lang="ts">

import LayoutContainer from "@/components/LayoutContainer.vue";
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col w-full">
    <header class="bg-white fixed t-0 left-0 right-0">
      <LayoutContainer>
        header
      </LayoutContainer>
    </header>

    <main class="flex-1 mt-26">
      <RouterView/>
    </main>

    <footer class="bg-white">
      <LayoutContainer>
        footer
      </LayoutContainer>
    </footer>
  </div>

</template>
