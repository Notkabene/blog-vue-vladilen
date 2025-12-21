<script setup lang="ts">
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import ArticleDetails from "@/components/ArticleDetails.vue";
import CommentsList from "@/components/CommentsList.vue";
import CommentsForm from "@/components/CommentsForm.vue";
import {onBeforeMount} from "vue";
import {useArticleStore} from "@/stores/article.ts";
import ArticleDetailsForm from "@/components/ArticleDetailsForm.vue";
import {useUserStore} from "@/stores/user.ts";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const articleStore = useArticleStore();
const userStore = useUserStore();

const formatDateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

onBeforeMount(async () => {
  try {
    await articleStore.fetchArticle(props.id);
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <LayoutContainer>
    <ArticleDetailsForm v-if="articleStore.isInEditMode"/>
    <ArticleDetails v-else :date-options="formatDateOptions"/>
    <div v-if="!articleStore.isInEditMode && (articleStore.article?.comments?.length > 0 || userStore.isAuthorized)">
      <h2 class="text-2xl font-bold mb-4">Комментарии</h2>
      <CommentsList :date-options="formatDateOptions"/>
      <CommentsForm v-if="userStore.isAuthorized"/>
    </div>
  </LayoutContainer>
</template>
