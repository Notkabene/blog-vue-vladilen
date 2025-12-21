<script setup lang="ts">
import ButtonBase from "@/components/base/ButtonBase.vue";
import {useArticleStore} from "@/stores/article.ts";
import {ref} from "vue";

const articleStore = useArticleStore();


const newComment = ref<string>('');
const errorMessage = ref<string>('');

const handleCommentSubmit = async () => {
  errorMessage.value = '';
  if (!newComment.value) {
    errorMessage.value = 'Комментарий не может быть пустым';
    return
  }

  const response = await articleStore.addComment(newComment.value);
  if (response.error) {
    errorMessage.value = response.error;
  } else {
    newComment.value = '';
  }

}
</script>

<template>
  <form
    @submit.prevent="handleCommentSubmit"
    class="bg-white rounded-md shadow-md p-4 mb-8"
  >
    <label class="block" for="newComment">
      Ваш комментарий
    </label>
    <textarea v-model="newComment" class="border border-gray-300 rounded-md w-full p-2 mb-2"
              name="newComment"
              id="newComment"/>
    <div class="flex justify-between">
      <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      <ButtonBase class="w-xs ml-auto" type="submit">Отправить</ButtonBase>
    </div>
  </form>
</template>

