import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from "vue";
import type {Role} from "@/types/role.ts";

export const useModalStore = defineStore('modal', () => {

  const message = ref<string>('Вы уверены?');
  const isVisible = ref<boolean>(false);
  const callback = ref(null);

  const open = (newMessage:string, newCallback) => {
    callback.value = newCallback;
    message.value = newMessage;
    isVisible.value = true;
  }
  const close = () => {
    isVisible.value = false;
  }

  const confirm = () => {
    callback.value();
    close();
  }

  return { message,isVisible, open, close, confirm }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
