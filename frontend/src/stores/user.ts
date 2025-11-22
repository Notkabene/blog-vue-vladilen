import {acceptHMRUpdate, defineStore} from 'pinia'
import {computed, ref} from "vue";

const initUser = {
  id: '',
  login: '',
  role: null,
  roleId: null,
  registeredAt: '',
}

export const useUserStore = defineStore('user', () => {
  const user = ref(initUser);

  const isAuthorized = computed(() => !!user.value.id)

  const register = async (login: string, password: string) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Ошибка регистрации пользователя')
      }

      return await response.json();
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (login: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Ошибка авторизации пользователя')
      }

      return await response.json();
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Ошибка логаута пользователя')
      }

      const data = await response.json()

      if (!data.error) {
        user.value = initUser
      }

      return data;
    } catch (error) {
      console.error(error)
    }
  }


  return {user, register, login, isAuthorized, logout}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
