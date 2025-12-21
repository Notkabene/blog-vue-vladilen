import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from "vue";
import type {Post} from "@/types/posts.ts";

export const useArticleStore = defineStore('article', () => {

  const article = ref<Post>({})
  const isInEditMode = ref<boolean>(false)

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`);

      if (!response.ok) {
        throw new Error("Ошибка получения статьи");
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        article.value = data.data;
      }

      return article;
    } catch (error) {
      console.error(error)
    }
  }

  const toggleEditMode = () => isInEditMode.value = !isInEditMode.value;

  const updateArticle = async ({title, content, imageUrl}: Post) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || article.value.title,
          content: content || article.value.content,
          imageUrl: imageUrl || article.value.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка получения статьи");
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        article.value = data.data;
      }

      return 'success';
    } catch (error) {
      console.error(error)
    }
  };

  const deleteArticle = async () => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка удаления статьи");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error)
    }
  };

  const addComment = async (newComment: string) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка добавления комментария");
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        article.value.comments.push(data.data);
      }
      return data;
    } catch (error) {
      console.error(error)
    }
  }


  const deleteComment = async (commentId:string) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка удаления комментария");
      }
      const data = await response.json();

      if(!data.error) {
        article.value.comments = article.value.comments.filter(item => item.id !== commentId);
      }

      return data;
    } catch (error) {
      console.error(error)
    }
  };


  return {article, isInEditMode, toggleEditMode, fetchArticle, updateArticle, deleteArticle, addComment, deleteComment}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot))
}
