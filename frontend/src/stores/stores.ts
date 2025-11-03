import {ref} from 'vue'
import {acceptHMRUpdate, defineStore} from 'pinia'
import type {Post} from "@/types/posts.ts";

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Post[]>([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/posts')
      if (!response.ok) {
        throw new Error('Posts request error');
      }
      const {data} = await response.json();

      articles.value = data.posts
    } catch (err) {
      console.error(err)
    }
  }

  return {articles, fetchArticles}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}

