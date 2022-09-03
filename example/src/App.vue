<template>
  <div class="flex flex-row w-full p-3 primary">
    <div class="text-2xl">Vue Python</div>
    <div class="flex justify-end flex-grow">
      <py-status :py="py"></py-status>
    </div>
  </div>
  <div class="container mx-auto">
    <div class="p-8">
      <py-code-block id="script" :py="py" :code="code"></py-code-block>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { PyStatus, PyCodeBlock } from "vuepython";
//import { PyStatus, PyCodeBlock } from "./vuepydist/vuepython.es";
import "vuepython/style.css";
//import "./vuepydist/style.css";
import "highlight.js/styles/stackoverflow-light.css"
import { py } from './state';

const code = `print('starting python script')
a = 1
b = 2
print('finished python script')
c = a + b
# return value
c`;

async function init() {
  await py.load();
}

onBeforeMount(() => init())
</script>