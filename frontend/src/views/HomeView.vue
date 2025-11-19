<script setup lang="ts">
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import SearchBase from "@/components/base/SearchBase.vue";
import {useArticlesStore} from "@/stores/stores.ts";
import PaginationBase from "@/components/base/PaginationBase.vue";

const {fetchArticles, totalPage, currentPage} = useArticlesStore();

</script>

<template>
  <LayoutContainer>
    <SearchBase :on-search="fetchArticles"/>
    <ArticlesList/>
    <PaginationBase v-if="totalPage > 1" :current-page="currentPage" :total-page="totalPage" :on-page-changes="fetchArticles" />
  </LayoutContainer>
</template>

<style scoped>

</style>
