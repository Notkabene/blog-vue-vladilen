import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from "vue";
import type {User} from "@/types/user.ts";

export const useUsersStore = defineStore('users', () => {

  const users = ref<User[]>([])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');

      if (!response.ok) {
        throw new Error("Ошибка получения пользователей");
      } else {
        return await response.json();;
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteUser = async (userId:string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {method: 'DELETE'});

      if (!response.ok) {
        throw new Error("Ошибка удаления пользователя");
      } else {
        return await response.json();;
      }
    } catch (error) {
      console.error(error)
    }
  }

  const changeUserRole = async (userId:string, userRole: number | null) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userRole: userRole,
          roleId: userRole
        })
      });

      if (!response.ok) {
        throw new Error("Ошибка обновления роли пользователя");
      } else {
        return await response.json();;
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {users, fetchUsers, deleteUser, changeUserRole}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
