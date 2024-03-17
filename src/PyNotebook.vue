<template>
  <div class="notebook" @keyup.esc="toggleCmdMode()" @keyup.a="pressA()">
    <div class="buttonbar">
      <button class="add-cell-btn" @click="addCell()">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z" />
          </svg>
        </div>
        <div>Add a cell</div>
      </button>
    </div>
    <div class="cell">
      <div :id="child.cellId" v-for="(child, i) in children" :key="child.id" class="cell-block"
        :class="cellNums ? '' : ''">
        <div v-if="cellNums" class="cell-num">
          [{{ i + 1 }}]&nbsp;:
        </div>
        <div class="cell-main">
          <py-code-block :id="child.id" :py="py" :code="child.code" :controls="false" :namespace="namespace">
          </py-code-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { PyRunner } from "usepython";
import PyCodeBlock from "./PyCodeBlock.vue";
//import "highlight.js/styles/stackoverflow-light.css"

const props = defineProps({
  namespace: {
    type: String,
    required: true
  },
  py: {
    type: Object as () => PyRunner,
    required: true
  },
  cells: {
    type: Object as () => Array<string>
  },
  cellNums: {
    type: Boolean,
    default: true
  }
});

const children = reactive<Array<Record<string, string>>>([]);
const isCmdMode = ref(false);

function addCell(cellCode = "", cellId?: string) {
  const cid = cellId ?? (+ new Date());
  const id = `${props.namespace}-cell-` + cid;
  children.push({ id: id, code: cellCode })
}

function toggleCmdMode() {
  isCmdMode.value = !isCmdMode.value;
  console.log("Toggle cmd mode to", isCmdMode.value)
}

function pressA() {
  if (isCmdMode.value === true) {
    console.log("A add cell");
    addCell()
  } else {
    console.log("A -")
  }
}

onBeforeMount(() => {
  if (props.cells) {
    props.cells.forEach((cell, i) => {
      addCell(cell, `${i}`)
    })
  }
})
</script>
