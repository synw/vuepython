<template>
  <div class="relative" ref="preview">
    <textarea
      class="absolute top-0 left-0 z-30 w-full px-2 py-3 leading-6 text-transparent bg-transparent resize-none code-block"
      ref="textarea" v-model="input">
      </textarea>
    <code class="absolute top-0 left-0 z-20 code-preview " v-html="parsedCode"></code>
  </div>
</template>

<script lang="js">
import { defineComponent, toRefs, onBeforeMount, onMounted, computed, nextTick } from "vue";
import { useTextareaAutosize } from '@vueuse/core';
import { useElementSize } from '@vueuse/core';
//import "highlight.js/styles/stackoverflow-light.css";
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  emits: ["code"],
  setup(props, { emit }) {
    const { code } = toRefs(props);
    const { textarea, input } = useTextareaAutosize();
    const { width, height } = useElementSize(textarea);

    const parsedCode = computed(() => {
      //console.log("Parsed code change", width.value, height.value);
      emit("code", { code: input.value, width: width.value, height: height.value });
      return hljs.highlight(input.value, { language: "python" }).value;
    })

    onBeforeMount(() => {
      input.value = code.value;
    });

    onMounted(() => {
      //console.log("Mounted", width.value, height.value);
      nextTick(() => {
        emit("code", { code: input.value, width: width.value, height: height.value + 35 });
      })
    })

    return {
      parsedCode,
      textarea,
      input,
    };
  },
});
</script>

<style lang="sass" scoped>
.code-block, .code-preview
  padding: 0px 20px 20px 0px
  font-family: Consolas, Monaco, monospace
  line-height: 1.5
  font-size: 16px
  white-space: pre
  word-wrap: normal
.code-block
  overflow-y: hidden
  caret-color: rgba(127, 127, 127)
  @apply border-transparent focus:border-transparent focus:ring-0
</style>
