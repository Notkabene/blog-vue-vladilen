<script setup lang="ts">

import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import {Form} from "vee-validate";
import InputErrorBase from "@/components/base/InputErrorBase.vue";
import LabelBase from "@/components/base/LabelBase.vue";
import InputBase from "@/components/base/InputBase.vue";
import ButtonBase from "@/components/base/ButtonBase.vue";
import MessageBoxBase from "@/components/base/MessageBoxBase.vue";
import {ref} from "vue";
import * as yup from "yup";
import type {NewPost} from "@/types/posts.ts";
import {useArticleStore} from "@/stores/article.ts";
import {useRouter} from "vue-router";

const errorMessage = ref<string>("");
const articleStore = useArticleStore();
const router = useRouter();

const schema = yup.object({
  imageUrl: yup.string().required('Поле обязательно').url('Введите корректны URL'),
  title: yup.string().required('Поле обязательно'),
  text: yup.string().required('Поле обязательно'),
})

const handleAddArticle = async (formData: NewPost) => {
  errorMessage.value = "";
  console.log(formData);

    const response = await articleStore.addArticle(formData);

    if(response.error) {
    errorMessage.value = response.error;
    } else {
      await router.push(`/post/${response.data.id}`);
    }

}

</script>

<template>
  <LayoutContainer class="py-8">
    <h1 class="text-2xl font-bold text-center my-4">Новая статья</h1>
    <Form class="bg-white f-full p-6 rounded-md shadow-md" :validation-schema="schema"
          @submit="handleAddArticle">
      <div class="mb-4">
        <LabelBase for="imageUrl">URL картинки</LabelBase>
        <InputBase type="url" name="imageUrl" id="imageUrl" autocomplete="on"/>
        <InputErrorBase name="imageUrl">Ошибка</InputErrorBase>
      </div>
      <div class="mb-4">
        <LabelBase for="title">Название</LabelBase>
        <InputBase type="text" name="title" id="title" autocomplete="on"/>
        <InputErrorBase name="title">Ошибка</InputErrorBase>
      </div>

      <div class="mb-4">
        <LabelBase for="content">Содержимое</LabelBase>
        <InputBase as="textarea" name="content" id="content" autocomplete="on" rows="10"/>
        <InputErrorBase name="content">Ошибка</InputErrorBase>
      </div>
      <div class="flex justify-between align-items-center">
        <MessageBoxBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageBoxBase>
        <ButtonBase class="ml-auto" type="submit">Создать</ButtonBase>
      </div>
    </Form>
  </LayoutContainer>
</template>
