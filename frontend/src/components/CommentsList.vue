<script setup lang="ts">
import {faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {formatDate} from "@/utils/dateFormaters.ts";
import {useArticleStore} from "@/stores/article.ts";
import {useUserStore} from "@/stores/user.ts";
import {useModalStore} from "@/stores/modal.ts";
import {ref} from "vue";
import MessageBoxBase from "@/components/base/MessageBoxBase.vue";

defineProps({
  dateOptions: {
    type: Object,
    required: false
  }
})

const articleStore = useArticleStore();
const userStore = useUserStore();
const modalStore = useModalStore();

const errorMessage = ref<string>('');

const handleDeleteComment = async (commentId: string) => {
  modalStore.open('Удалить комментарий?', async () => {
    errorMessage.value = '';
    const response = await articleStore.deleteComment(commentId);

    if(response.error) {
      errorMessage.value = response.error;
    }


  })
}
</script>


<template>
  <ul>

    <li v-for="comment in articleStore.article.comments"
        class="bg-white rounded-md shadow-md p-4 mb-4">
      <div class="flex justify-between mb-2">
        <p class="font-bold">
          <FontAwesomeIcon :icon="faUser"/>
          &nbsp;
          {{ comment.author }}
        </p>
        <button v-if="userStore.isAdmin || userStore.isModerator" type="button"
                class="text-red-500 cursor-pointer hover:text-red-700"
                @click="handleDeleteComment(comment.id)">
          <FontAwesomeIcon :icon="faTrash"/>
          Удалить
        </button>
      </div>

      <p class="text-gray-500 text-sm mb-2">
        <time datetime="">
          {{ formatDate(comment.publishedAt, dateOptions) }}
        </time>
      </p>

      <div class="whitespace-pre-wrap">
        <p>
          {{ comment.content }}
        </p>
      </div>
    </li>
  </ul>
  <MessageBoxBase v-if="errorMessage" type="error">{{errorMessage}}</MessageBoxBase>
</template>
