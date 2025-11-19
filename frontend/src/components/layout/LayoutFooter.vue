<script setup lang="ts">
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import {onBeforeMount, type Ref, ref} from "vue";

const year = new Date().toLocaleString('ru-RU', {
  year: 'numeric',
});

const city: Ref<string> = ref('');
const temp: Ref<number> = ref(0);
const condition: Ref<string> = ref('');

const fetchWeatherData = (lat: number, long: number, headers: {
  'X-Yandex-Weather-Key': string
}) => {
  fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${long}`, {headers})
    .then(response => response.json())
    .then(json => {
      city.value = json.info.tzinfo.name;
      temp.value = json.fact.temp;
      condition.value = json.fact.condition;
    });
}

onBeforeMount(() => {
  const accessKey = import.meta.env.VITE_APP_YADEX_WEATHER_KEY;

  const headers: { 'X-Yandex-Weather-Key': string } = {
    'X-Yandex-Weather-Key': accessKey
  };

  navigator.geolocation.getCurrentPosition((position) => {
    fetchWeatherData(position.coords.latitude, position.coords.longitude, headers)
  }, () => {
    fetchWeatherData(59.9386, 59.9386, headers)
  })
})

</script>

<template>
  <LayoutContainer>
    <div class="flex justify-between py-8 items-center">
      <div>
        <p>Блог веб-разработчика</p>
        <a class="hover:text-blue-500" href="mailto:web@developer.ru">web@developer.ru</a>
      </div>
      <div class="text-right">
        <p>{{ city }}
          <time>{{ year }}</time>
        </p>
        <p>Погода: {{ condition }}, {{ temp }}°C</p>
      </div>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>
