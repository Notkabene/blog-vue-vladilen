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
  confirmedPassword: yup.string().required('Повторите пароль').oneOf([yup.ref('password'), null], 'пароли должны совподать'),
})

const errorMessage = ref('');
const router = useRouter();
const handleSubmit = async (formData) => {

  try {
    const data = await userStore.register(formData.login, formData.password);

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
    <h1 class="text-2xl font-bold text-center my-4">Регистрация</h1>
    <Form @submit="handleSubmit" class="bg-white f-full max-w-sm mx-auto p-6 rounded-md shadow-md"
          :validation-schema="schema">
      <div class="mb-4">
        <LabelBase for="login">Логин</LabelBase>
        <InputBase type="text" name="login" id="login" autocomplete="on"/>
        <InputErrorBase name="login">Ошибка</InputErrorBase>
      </div>
      <div class="mb-4">
        <LabelBase for="password">Пароль</LabelBase>
        <InputBase type="password" name="password" id="password" autocomplete="on"/>
        <InputErrorBase name="password">Ошибка</InputErrorBase>
      </div>
      <div class="mb-4">
        <LabelBase for="confirmedPassword">Повтор пароля</LabelBase>
        <InputBase type="password" name="confirmedPassword" id="confirmedPassword" autocomplete="on"/>
        <InputErrorBase name="confirmedPassword">Ошибка</InputErrorBase>
      </div>

      <ButtonBase class="w-full" type="submit">Зарегистрироваться</ButtonBase>
      <MessageBoxBase v-if="errorMessage" type="error">Ошибка: {{ errorMessage }}</MessageBoxBase>
    </Form>
  </div>
</template>

<style scoped>

</style>
