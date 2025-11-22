<script setup lang="ts">

import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faFloppyDisk, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useUsersStore} from "@/stores/users.ts";
import {onBeforeMount, ref} from "vue";
import MessageBoxBase from "@/components/base/MessageBoxBase.vue";
import {formatDate} from "../utils/dateFormaters.ts";
import {useRolesStore} from "@/stores/roles.ts";
import type {User} from "@/types/user.ts";

const users = ref<User[]>([])

const usersStore = useUsersStore();
const rolesStore = useRolesStore();
const errorMessage = ref("");
const userMessage = ref("");
const userMessageType = ref("");

onBeforeMount(async () => {
  Promise.all([
    rolesStore.fetchRoles(),
    usersStore.fetchUsers()
  ]).then(([rolesResponse, usersResponse]) => {

    if (usersResponse.error || rolesResponse.error) {
      errorMessage.value = usersResponse.error;
      console.error(usersResponse.error || rolesResponse.error);
      errorMessage.value = "Ошибка загрузки данных"
      return;
    } else {
      rolesStore.roles = rolesResponse.data;
      usersStore.users = JSON.parse(JSON.stringify(usersResponse.data));
      users.value = JSON.parse(JSON.stringify(usersResponse.data));
    }
  })

})

const handleUserDelete = (id: string) => {
  const response = usersStore.deleteUser(id);
  if(response.error) {
    console.error(response.error);
    errorMessage.value = response.error;

  } else {
    usersStore.users = usersStore.users.filter(user => user.id !== id);
    users.value = users.value.filter(user => user.id !== id);
  }
}

const handleUserRole = (user:User) => {

  const storedUser:User|undefined = usersStore.users.find(u => u.id === user.id);

  if(storedUser?.roleId === user.roleId) {
    return
  }

  const response = usersStore.changeUserRole(user.id, user.roleId);
  if(response.error || !storedUser) {
    console.error(response.error);
    errorMessage.value = response.error;
    user.roleId = storedUser?.roleId ?? 2;
  } else {
    storedUser.roleId = user.roleId;
    userMessage.value[user.id] = "Обновлено";
    userMessageType.value[user.id] = 'success';

    setTimeout(()=> {
      userMessage.value[user.id] = "";
      userMessageType.value[user.id] = '';
    },3000)
  }
}
</script>

<template>
  <LayoutContainer>
    <h1 class="text-3xl text-center my-10 font-bold">Пользователи</h1>
    <div class="bg-white rounded-md shadow-md overflow-hidden p-8 mb-10">
      <MessageBoxBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageBoxBase>
      <table v-if="users" class="min-w-full table-fixed">
        <thead>
        <tr>
          <th class="p-2">Логин</th>
          <th class="p-2">Дата регистрации</th>
          <th class="p-2">Роль</th>
          <th class="p-2"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="text-center p-2">{{ user.login }}</td>
          <td class="text-center p-2">
            {{
              formatDate(user.registeredAt, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })
            }}
          </td>
          <td class="p-2">
            <form @submit.prevent="handleUserRole(user)" class="flex gap-2 relative">
              <select v-model="user.roleId" :name="`user-${user.id}-role`"
                      class="w-full border border-gray-300 rounded-md py-1">
                <option v-for="role in rolesStore.roles" :key="`${role.id}-${user.id}`"
                        :value="role.id">{{ role.name }}
                </option>
              </select>
              <button type="submit"
                      class="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white py-1 px-3 rounded-md">
                <FontAwesomeIcon :icon="faFloppyDisk"/>

              </button>
                <MessageBoxBase class="absolute left-full ml-2" v-if="userMessage[user.id]" :type="userMessageType[user.id]">{{ userMessage[user.id] }}</MessageBoxBase>
            </form>
          </td>
          <td class="p-2">
            <button type="button"
                    @click="handleUserDelete(user.id)"
                    class="text-red-500 hover:text-red-700 cursor-pointer text-right w-full">
              <FontAwesomeIcon :icon="faTrash"/>
              &nbsp;
              Удалить
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>
