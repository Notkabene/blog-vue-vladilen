<script setup lang="ts">

import LabelBase from "@/components/base/LabelBase.vue";
import InputBase from "@/components/base/InputBase.vue";
import InputErrorBase from "@/components/base/InputErrorBase.vue";
import MessageBoxBase from "@/components/base/MessageBoxBase.vue";
import ButtonBase from "@/components/base/ButtonBase.vue";

import * as yup from 'yup';
import {Form} from "vee-validate";
import {useUserStore} from "@/stores/user.ts";
import {ref} from "vue";
import {useRouter} from "vue-router";

const userStore = useUserStore();

const schema = yup.object({
  login: yup.string().required('Логин обязателен').min(3, 'Логин должен быть не меньше 3 символов'),
  password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен быть не меньше 6 символов'),
})

const errorMessage = ref('');
const router = useRouter();
const handleSubmit = async (formData) => {

  try {
    const data = await userStore.login(formData.login, formData.password);

    if (data?.error) {
      throw new Error(data.error);
    }
    userStore.user = data.user;
    await router.push('/');

  } catch (error) {
    errorMessage.value = error.message;
  }
}

</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold text-center my-4">Авторизация</h1>
    <Form @submit="handleSubmit" class="bg-white f-full max-w-sm mx-auto p-6 rounded-md shadow-md"
          :validation-schema="schema">
      <div class="mb-4">
        <LabelBase for="login">Логин</LabelBase>
        <InputBase type="text" name="login" id="login"/>
        <InputErrorBase name="login">Ошибка</InputErrorBase>
      </div>
      <div class="mb-4">
        <LabelBase for="password">Пароль</LabelBase>
        <InputBase type="password" name="password" id="password"/>
        <InputErrorBase name="password">Ошибка</InputErrorBase>
      </div>

      <ButtonBase class="w-full" type="submit">Войти</ButtonBase>
      <MessageBoxBase v-if="errorMessage" type="error">Ошибка: {{ errorMessage }}</MessageBoxBase>
      <p class="mt-2 text-center text-gray-500">Нет логина? <RouterLink class="text-center underline :hover:text-blue-500 cursor-pointer" to="/register">Зарегистрироваться</RouterLink></p>
    </Form>



  </div>
</template>

<style scoped>

</style>
