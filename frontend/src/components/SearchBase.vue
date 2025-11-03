<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {ref, watch} from "vue";

const searchQuery = ref('');

const props = defineProps({
  onSearch: {
    type: Function,
    required: true,
  }
})


const handleSearch = () => {
  props.onSearch(searchQuery.value);
}

let debouncedTimer:number | undefined;

const debouncedSearch = (query:string) => {
  clearTimeout(debouncedTimer);

  debouncedTimer = setTimeout(() => {
    props.onSearch(query);
  },2000)
}

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
})


</script>

<template>
  <form @submit.prevent="handleSearch" class="w-full mt-12 relative">
    <input v-model="searchQuery"  class="w-full bg-white border border-gray-300 p-2 rounded-md pr-20" type="text" name="search" placeholder="Поиск по блогу" />
    <button class="bg-blue-400 hover:bg-blue-600 text-white py-2 px-5 rounded-md cursor-pointer absolute right-0 top-0">
      <FontAwesomeIcon :icon="faMagnifyingGlass"/>
    </button>
  </form>
</template>

<style scoped>

</style>
