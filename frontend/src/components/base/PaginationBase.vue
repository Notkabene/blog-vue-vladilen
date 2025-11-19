<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
  onPageChanges: {
    type: Function,
    required: true,
  }
})

const activeClass = 'underline :hover:text-blue-500 cursor-pointer'
const disabledClass = 'text-gray-500'

const goToPage = (page: number) => {
  props.onPageChanges({page});
}

</script>

<template>
  <ul class="flex align-center justify-center gap-4 pt-8 pb-16">
    <li>
      <button @click="goToPage(1)" :disabled="currentPage === 1" type="button"
              :class="currentPage === 1 ? disabledClass :activeClass">
        В начало
      </button>
    </li>
    <li>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" type="button"
              :class="currentPage === 1 ? disabledClass :activeClass">
        Предыдущая
      </button>
    </li>
    <li>
      {{ currentPage }}
    </li>
    <li>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPage" type="button"
              :class="currentPage === totalPage ? disabledClass :activeClass">
        Следующая
      </button>
    </li>
    <li>
      <button @click="goToPage(totalPage)" :disabled="currentPage === totalPage" type="button"
              :class="currentPage === totalPage ? disabledClass :activeClass">
        В конец
      </button>
    </li>
  </ul>
</template>

<style scoped>

</style>
