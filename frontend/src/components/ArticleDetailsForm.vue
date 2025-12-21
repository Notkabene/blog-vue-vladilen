<script setup lang="ts">
import {
  faArrowRotateLeft,
  faFloppyDisk,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useArticleStore} from "@/stores/article.ts";
import {ref} from "vue";
import {useModalStore} from "@/stores/modal.ts";
import {useRouter} from "vue-router";

const articleStore = useArticleStore();
const editedArticle = ref({...articleStore.article})
const modalStore = useModalStore();
const router = useRouter();


const handleArticleUpdate = async () => {
  try {
    const response = await articleStore.updateArticle(editedArticle.value);
    if (response === 'success') {
      articleStore.toggleEditMode();
    }
  } catch (error) {
    console.log(error)
  }
}

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
  <form @submit.prevent="handleArticleUpdate" class="bg-white rounded-md shadow-md p-8 mt-4 mb-8">
    <div class="flex justify-between mb-4 items-center">
      <h1 class="text-3xl">Редактировать статью</h1>

      <div class="flex gap-4 text-xl">
        <button @click="articleStore.toggleEditMode" class="cursor-pointer dark:hover:bg-blue-500"
                type="button"
                aria-label="Отменить изменения">
          <FontAwesomeIcon :icon="faArrowRotateLeft"/>
        </button>
        <button class="cursor-pointer dark:hover:bg-blue-500" type="submit"
                aria-label="Сохранить статью">
          <FontAwesomeIcon :icon="faFloppyDisk"/>
        </button>
        <button
          @click="handleDeleteArticle"
          class="cursor-pointer dark:hover:bg-red-500" type="button"
          aria-label="Удалить статью">
          <FontAwesomeIcon :icon="faTrash"/>
        </button>
      </div>

    </div>

    <p class="mb-4">
      <input class="w-full border rounded-md p-2 border-gray-300" type="text"
             v-model="editedArticle.title" placeholder="Url изображения">
    </p>
    <p class="mb-4">
      <input class="w-full border rounded-md p-2 border-gray-300" type="text"
             v-model="editedArticle.imageUrl"
             placeholder="Заголовок статьи"></p>
    <p class="mb-4">
      <textarea class="w-full border rounded-md p-2 border-gray-300" rows="10"
                v-model="editedArticle.content"
                placeholder="Содержание статьи"></textarea></p>
  </form>
</template>
