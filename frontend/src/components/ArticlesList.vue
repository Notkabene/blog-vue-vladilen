<script setup lang="ts">

import ArticlesItem from "@/components/ArticlesItem.vue";
import {useArticlesStore} from "@/stores/stores.ts";
import {onBeforeMount} from "vue";
import {formatDate} from "@/utils/dateFormaters.ts";

const articlesStore = useArticlesStore();

onBeforeMount(() => {
  articlesStore.fetchArticles();
})

formatDate

</script>

<template>
  <section class="my-8">
    <h2 class="sr-only">Последние статьи</h2>
    <ul class="grid grid-cols-3 gap-8">

      <ArticlesItem v-for="post in articlesStore.articles" :post="post" :key="post.id"/>
    </ul>
  </section>
</template>

<style scoped>

</style>
