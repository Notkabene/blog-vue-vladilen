<script setup lang="ts">
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
  faBackward,
  faCode,
  faFile,
  faUsers,
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {RouterLink, useRouter, useRoute} from "vue-router";
import {useUserStore} from "@/stores/user.ts";


const userStore = useUserStore()
const router = useRouter();
const route = useRoute();

const handleLogout = async () => {
  const response = await userStore.logout();
  if (!response.error && route.meta.requireAuth) {
    await router.push("/");
  }
}
</script>

<template>
  <LayoutContainer>
    <div class="flex justify-between items-center py-4">
      <RouterLink to="/" class="hover:text-blue-500">
        <FontAwesomeIcon :icon="faCode" class="mr-2"/>
        Блог веб-разработчика
      </RouterLink>
      <div>
        <p>Веб-технологии</p>
        <p>Написание кода</p>
        <p>Разбор ошибок</p>
      </div>
      <div>
        <div class="mb-2">
          <RouterLink
            v-if="!userStore.isAuthorized"
            to="/login"
            class="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 rounded-md"
          >
            Войти
          </RouterLink>
          <div v-else>
            <span class="text-right">{{ userStore.user.login }}</span> |
            <button class="hover:text-blue-500 cursor-pointer" @click="handleLogout">
              <FontAwesomeIcon :icon="faArrowRightFromBracket"/>
            </button>
          </div>
        </div>
        <p>
          <a @click="$router.go(-1)" class="hover:text-blue-500" aria-label="Назад">
            <FontAwesomeIcon :icon="faBackward"/>
          </a> &nbsp;&nbsp;
          <RouterLink v-if="userStore.isAuthorized" to="/post" class="hover:text-blue-500"
                      aria-label="Новая статья">
            <FontAwesomeIcon :icon="faFile"/>
          </RouterLink>&nbsp;&nbsp;

          <RouterLink v-if="userStore.isAuthorized" to="/users" class="hover:text-blue-500"
                      aria-label="Пользователи">
            <FontAwesomeIcon :icon="faUsers"/>
          </RouterLink>&nbsp;&nbsp;
        </p>
      </div>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>
