<template>
  <div class="container mx-auto">
    <py-notebook :py="py" namespace="example" :cells="cells" class="w-limited"></py-notebook>
  </div>
</template>

<script setup lang="ts">
import { py } from "@/state";
import PyNotebook from "../../../../src/PyNotebook.vue";

const cells = ['a=1\nb=2\nc=a+b\nc', 'c']
</script>