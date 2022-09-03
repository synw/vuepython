<template>
  <div>
    <div :style="`height:${codeBlock.height}px`">
      <code-editor :code="parsedCode" @keyup.ctrl.enter="runTheCode()" @code="updateCode($event)"></code-editor>
    </div>
    <div>
      <button class="mt-3 border btn" :class="canRun ? 'cursor-pointer' : 'cursor-wait'" @click="runTheCode()">
        <app-icon name="play" class="inline-block text-xl" :class="!canRun ? 'txt-lighter' : 'txt-success'"></app-icon>
        &nbsp;Execute
      </button>
    </div>
    <div class="pt-5 pl-8" v-if="output == true">
      <div class="pt-3">
        <pre v-for="row in log.stdOut" v-html="row"></pre>
      </div>
      <div class="pt-3" v-if="log.exception">
        <div v-html="log.exception"></div>
      </div>
      <div class="pt-3" v-if="outputHtml">
        <div v-html="outputHtml"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "highlight.js";
import { computed, reactive, ref } from "vue";
import { usePython } from "usepython";
import { useStore } from '@nanostores/vue';
import CodeEditor from "./CodeEditor.vue";
import AppIcon from "./AppIcon.vue"

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  py: {
    type: Object as typeof usePython,
    required: true
  },
  code: {
    type: String,
    default: ""
  },
  output: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(["result"]);

const parsedCode = ref(props.code);
const outputHtml = ref<string | null>(null);
const isExecuting = useStore(props.py.isExecuting);
const isReady = useStore(props.py.isReady);
const codeBlock = reactive({
  width: 0,
  height: 0,
})
const log = reactive({
  id: "",
  stdOut: new Array<string>(),
  stdErr: new Array<string>(),
  exception: ""
});

props.py.log.listen((val) => {
  if (val.id == props.id) {
    log.id = val.id;
    log.stdOut = val.stdOut;
    log.stdErr = val.stdErr;
    log.exception = val.exception;
  }
})

function updateCode(el: { code: string, width: number, height: number }) {
  //console.log("New code", el);
  parsedCode.value = el.code;
  codeBlock.width = el.width;
  codeBlock.height = el.height;
}

async function runTheCode() {
  outputHtml.value = "";
  if (!canRun) {
    return
  }
  const { results, error } = await props.py.run(parsedCode.value, props.id);
  if (results) {
    //console.log("RES TYPE", typeof results, results);
    if (results instanceof Map) {
      outputHtml.value = JSON.stringify(Object.fromEntries(results.entries()), null, "  ")
    } else {
      outputHtml.value = `${results}`
    }
    emit("result", outputHtml.value)
  }
};

const canRun = computed<Boolean>(() => {
  return isReady.value == true && isExecuting.value == false
});
</script>