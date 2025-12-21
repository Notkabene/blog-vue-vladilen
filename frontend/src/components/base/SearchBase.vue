<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {ref, watch} from "vue";
import InputBase from "@/components/base/InputBase.vue";
import ButtonBase from "@/components/base/ButtonBase.vue";

const searchQuery = ref('');

const props = defineProps({
  onSearch: {
    type: Function,
    required: true,
  }
})

let debouncedTimer: number | undefined;

const handleSearch = () => {
  clearTimeout(debouncedTimer);
  props.onSearch({search: searchQuery.value});
}


const debouncedSearch = (query: string) => {
  clearTimeout(debouncedTimer);

  debouncedTimer = setTimeout(() => {
    props.onSearch({search: query});
  }, 2000)
}

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
})


</script>

<template>
  <form @submit.prevent="handleSearch" class="w-full mt-12 relative">
    <input v-model="searchQuery" class="w-full bg-white border border-gray-300 p-2 rounded-md pr-20"
           type="text" name="search" placeholder="Поиск по блогу"/>
    <ButtonBase class="absolute right-0 top-0">
      <FontAwesomeIcon :icon="faMagnifyingGlass"/>
    </ButtonBase>
  </form>
</template>
