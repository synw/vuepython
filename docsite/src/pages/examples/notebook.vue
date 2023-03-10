<template>
  <div class="container mx-auto">
    <py-notebook :py="py" namespace="example" :cells="cells"></py-notebook>
  </div>
</template>

<script setup lang="ts">
import { py } from "@/state";
import { PyNotebook } from "vuepython";

const cells = ['a=1\nb=2\nc=a+b\nc', 'c']
</script>