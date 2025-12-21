<script setup lang="ts">
import {faCalendar, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useArticleStore} from "@/stores/article.ts";
import {formatDate} from "@/utils/dateFormaters.ts";
import {useUserStore} from "@/stores/user.ts";
import {useModalStore} from "@/stores/modal.ts";
import {useRouter} from "vue-router";

const articleStore = useArticleStore();
const modalStore = useModalStore();
const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  dateOptions: {
    type: Object
  }
})

const handleDeleteArticle = () => {
  modalStore.open('Вы уверены что хотите удалить статью?', async () => {
    const response = await articleStore.deleteArticle()
    if (!response.error) {
      await router.push('/')
    }
  });
}

</script>

<template>
  <div class="bg-white rounded-md shadow-md p-8 mt-4 mb-8">
    <div class="mb-4">
      <img class="w-full h-64 object-cover rounded-md" :src="articleStore.article.imageUrl" alt="">
    </div>
    <p class="text-gray-600 mb-4">
      <FontAwesomeIcon :icon="faCalendar"/> &nbsp;
      <time :datetime="articleStore.article.publishedAt">
        {{ formatDate(articleStore.article.publishedAt, dateOptions) }}
      </time>
    </p>
    <div class="flex justify-between mb-4 items-center">
      <h1 class="text-3xl">{{ articleStore.article.title }}</h1>
      <div class="flex gap-4 text-xl">
        <button @click="articleStore.toggleEditMode" v-if="userStore.isAdmin"
                class="cursor-pointer dark:hover:bg-blue-500" type="button"
                aria-label="Редактировать статью">
          <FontAwesomeIcon :icon="faPenToSquare"/>
        </button>
        <button @click="handleDeleteArticle" v-if="userStore.isAdmin"
                class="cursor-pointer dark:hover:bg-red-500" type="button"
                aria-label="Удалить статью">
          <FontAwesomeIcon :icon="faTrash"/>
        </button>
      </div>
    </div>

    <div class="whitespace-pre-wrap">
      {{ articleStore.article.content }}
    </div>
  </div>
</template>
