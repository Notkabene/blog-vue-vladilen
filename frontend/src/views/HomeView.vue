<script setup lang="ts">
import LayoutContainer from "@/components/LayoutContainer.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import SearchBase from "@/components/SearchBase.vue";
import {useArticlesStore} from "@/stores/stores.ts";

const articlesStore = useArticlesStore();

</script>

<template>
  <LayoutContainer>
    <SearchBase :on-search="articlesStore.fetchArticles"/>
    <ArticlesList/>
  </LayoutContainer>
</template>

<style scoped>

</style>
