<template>
  <div class="prosed">
    <h1>Code block example</h1>
    <p class="not-prose">
      <py-code-block id="1" :code="code" :py="py" namespace="codeblock" class="w-limited"></py-code-block>
    </p>
  </div>
</template>

<script setup lang="ts">
import { py } from "@/state";
import PyCodeBlock from "../../../../src/PyCodeBlock.vue";

const code = `first_name = "Bob"
last_name = "Miller"
name = f"{first_name} {last_name}"
print("The name is", name)
name`
</script>