<script setup lang="ts">
import LayoutHeader from "@/components/layout/LayoutHeader.vue";
import LayoutFooter from "@/components/layout/LayoutFooter.vue";
import ModalBase from "@/components/base/ModalBase.vue";


</script>


<template>
  <div class="bg-gray-100 min-h-screen flex flex-col w-full">
    <header class="bg-white fixed t-0 left-0 right-0 z-9">
      <LayoutHeader/>
    </header>

    <main class="flex-1 mt-26">
      <RouterView/>
    </main>

    <footer class="bg-white">
      <LayoutFooter/>
    </footer>
    <ModalBase/>
  </div>

</template>
