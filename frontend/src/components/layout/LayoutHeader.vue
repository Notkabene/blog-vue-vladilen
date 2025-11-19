<script setup lang="ts">
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faBackward, faCode, faFile, faUsers} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "vue-router";
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
        <p class="mb-2">
          <RouterLink
            to="/login"
            class="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 rounded-md"
          >
            Войти
          </RouterLink>
        </p>
        <p>
          <a @click="$router.go(-1)" class="hover:text-blue-500" aria-label="Назад">
            <FontAwesomeIcon :icon="faBackward"/>
          </a> &nbsp;&nbsp;
          <RouterLink to="/post" class="hover:text-blue-500" aria-label="Новая статья">
            <FontAwesomeIcon :icon="faFile"/>
          </RouterLink>&nbsp;&nbsp;
          <RouterLink to="/users" class="hover:text-blue-500" aria-label="Пользователи">
            <FontAwesomeIcon :icon="faUsers"/>
          </RouterLink>&nbsp;&nbsp;
        </p>
      </div>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>
