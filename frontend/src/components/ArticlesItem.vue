<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCalendar, faComment} from "@fortawesome/free-solid-svg-icons";
import type {Post} from "@/types/posts.ts";
import type {PropType} from "vue";
import {formatDate} from "@/utils/dateFormaters.ts";

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true },
})
</script>

<template>
  <li class="flex">
    <article class="flex w-full">
      <RouterLink :to="`/post/${post.id}`" class="bg-white flex w-full flex-col p-4 rounded-md shadow hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <img class="w-full h-48 object-cover" :src="post.imageUrl"
               alt="">
        </div>
        <h3 class="text-xl mb-2">{{post.title}}</h3>
        <div class="flex align-center justify-between mt-auto">
          <p>
            <time :datetime="post.publishedAt">
              <FontAwesomeIcon :icon="faCalendar"/>
              {{ formatDate(post.publishedAt) }}
            </time>
          </p>
          <p class="">
            <FontAwesomeIcon :icon="faComment"/>
            {{ post.comments.length }}
            <span class="sr-only">комментариев</span>
          </p>
        </div>
      </RouterLink>
    </article>
  </li>
</template>

<style scoped>

</style>
