import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from "vue";
import type {Role} from "@/types/role.ts";

export const useRolesStore = defineStore('roles', () => {

  const roles = ref<Role[]>([])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/users/roles');

      if (!response.ok) {
        throw new Error("Ошибка получения ролей");
      } else {
        return await response.json();;
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {roles, fetchRoles}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}
