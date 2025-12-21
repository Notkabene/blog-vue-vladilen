<script setup lang="ts">
import {useModalStore} from "@/stores/modal.ts";

const modalStore = useModalStore();

</script>

<template>
  <div v-show="modalStore.isVisible" class="fixed left-0 right-0 bottom-0 top-0 z-50">
    <div class="fixed bg-black opacity-30  left-0 right-0 bottom-0 top-0 "
         @click="modalStore.close"></div>
    <div class="bg-white rounded-md p-8 relative w-lg mx-auto top-50">
      <p class="text-center m-8">{{ modalStore.message }}</p>
      <div class="flex gap-4 justify-end">

        <button class="cursor-pointer bg-gray-200 :hover-bg-gray-500 rounded-md py-2 px-4 "
                type="button" @click="modalStore.close">Отмена
        </button>
        <button
          class="cursor-pointer bg-blue-500 :hover-bg-blue-700 rounded-md py-2 px-4 text-white"
          type="button" @click="modalStore.confirm">Да
        </button>
      </div>
    </div>
  </div>
</template>
