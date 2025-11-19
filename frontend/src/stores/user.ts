import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from "vue";
import {useArticlesStore} from "@/stores/stores.ts";

export const useUserStore = defineStore('user',()  => {
  const user = ref({
    login: '',
    role: null
  });

  const register = async (login:string, password:string) => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(!response.ok) {
        throw new Error('Ошибка регистрации пользователя')
      }

      const data = await response.json()

      return data;
    }
    catch (error) {
      console.error(error)
    }
  }

  return {user, register}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
