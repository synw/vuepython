<template>
  <div>
    <div class="code-editor">
      <code-editor :code="parsedCode" @keyup.ctrl.enter="runTheCode()" lang="python" @edit="updateCode($event)"
        :hljs="hljs"></code-editor>
    </div>
    <div v-if="controls == true">
      <button class="border code-exec-btn btn neuro" :class="(canRun && !isExecuting) ? 'cursor-pointer' : 'cursor-wait'"
        @click="runTheCode()">
        <template v-if="!canRun">
          <app-icon name="play" class="inline-block text-xl txt-lighter"></app-icon>
        </template>
        <template v-else>
          <template v-if="!isExecuting">
            <app-icon name="play" class="inline-block text-xl txt-success"></app-icon>
          </template>
          <template v-else>
            <app-icon name="python" class="inline-block text-xl txt-danger"></app-icon>
          </template>
        </template>
        &nbsp;Execute
      </button>
    </div>
    <div class="flex flex-col code-output">
      <div v-if="stdout == true && outputHtml">
        <pre v-for="row in log.stdOut" v-html="row"></pre>
      </div>
      <div v-if="stderr == true">
        <pre v-for="row in log.stdErr" v-html="row"></pre>
      </div>
      <div v-if="exception == true && log.exception" v-html="log.exception"></div>
      <div v-if="output == true && outputHtml" v-html="outputHtml"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "highlight.js";
import { computed, onBeforeUnmount, reactive, ref, Ref, watchEffect } from "vue";
import { usePython } from "usepython";
import { useStore } from '@nanostores/vue';
import { CodeEditor } from "vuecodit";
import AppIcon from "./AppIcon.vue"
import "vuecodit/style.css";
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);

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
    required: true,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  output: {
    type: Boolean,
    default: true,
  },
  exception: {
    type: Boolean,
    default: true,
  },
  stdout: {
    type: Boolean,
    default: true,
  },
  stderr: {
    type: Boolean,
    default: true,
  },
  dispatch: {
    type: Function
  },
});

const emit = defineEmits(["result"]);

const parsedCode = ref("");
const outputHtml = ref<string | null>(null);
const isReady = useStore(props.py.isReady);
const log = reactive({
  id: "",
  stdOut: new Array<string>(),
  stdErr: new Array<string>(),
  exception: ""
});
const isExecuting: Readonly<Ref<boolean>> = useStore(props.py.isExecuting);

function updateCode(code: string) {
  parsedCode.value = code;
}

async function runTheCode() {
  outputHtml.value = "";
  if (!canRun) {
    return
  }
  const { results, error } = await props.py.run(parsedCode.value, props.id);
  if (results) {
    //console.log("RES TYPE", typeof results, results);
    let res = "";
    if (results instanceof Map) {
      res = JSON.stringify(Object.fromEntries(results.entries()), null, "  ")
    } else {
      res = `${results}`
    }
    if (props.dispatch) {
      const _res = await props.dispatch(res);
      if (_res != null) {
        res = _res
      } else {
        res = ""
      }
    }
    outputHtml.value = res
    emit("result", outputHtml.value)
  }
};

const canRun = computed<Boolean>(() => {
  //return isReady.value == true && isExecuting.value == false
  return isReady.value == true
});

const unbindLog = props.py.log.listen((val) => {
  if (val.id == props.id) {
    log.id = val.id;
    log.stdOut = val.stdOut;
    log.stdErr = val.stdErr;
    log.exception = val.exception;
  }
});

onBeforeUnmount(() => unbindLog())
watchEffect(() => {
  parsedCode.value = props.code
  outputHtml.value = "";
})
</script>

<style lang="sass" scoped>
.code-exec-btn
  @apply mt-2
.code-output
  @apply pl-8 space-y-2
.btn.neuro
  @apply rounded-lg block-background shadow-[-2px_-2px_10px_rgba(255,255,255,1),3px_3px_10px_rgba(0,0,0,0.2)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_3px_3px_5px_rgba(0,0,0,0.1)]
  @apply dark:shadow-[-2px_-2px_10px_rgba(155,155,155,0.3),3px_3px_10px_rgba(10,10,10,1)]
</style>