<template>
  <div class="prosed">
    <h1>Vue Python</h1>
    <p>Edit and run Python code in Vuejs </p>
    <auto-nav v-if="isNavReady" :nodes="nav.tree?.children ?? []" class="space-y-1" :on-open="$router.push"></auto-nav>
  </div>
</template>

<script setup lang="ts">
import { nav, isNavReady } from "@/state";
import { AutoNav } from "@docdundee/vue";
</script>