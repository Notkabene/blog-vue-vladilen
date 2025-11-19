<script setup lang="ts">

import ArticlesItem from "@/components/ArticlesItem.vue";
import {useArticlesStore} from "@/stores/stores.ts";
import {onBeforeMount} from "vue";

const articlesStore = useArticlesStore();

onBeforeMount(() => {
  articlesStore.fetchArticles();
})


</script>

<template>
  <section class="my-8">
    <h2 class="sr-only">Последние статьи</h2>
    <ul v-if="articlesStore.articles.length" class="grid grid-cols-3 gap-8">
      <ArticlesItem v-for="post in articlesStore.articles" :post="post" :key="post.id"/>
    </ul>
    <p class="text-center text-gray-500" v-else>
      Нет статей для отображения
    </p>
  </section>
</template>

<style scoped>

</style>
