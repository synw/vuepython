<template>
  <div class="container mx-auto">
    <div class="w-full p-3">
      <div class="flex justify-end">
        <button class="btn" @click="addCell()">Add cell</button>
      </div>
      <div class="flex flex-col w-full notebook">
        <div :id="child.cellId" v-for="(child, i) in children" :key="child.id" class="flex flex-row w-full cell"
          :class="cellNums ? '' : ''">
          <div v-if="cellNums" class="mr-5 cell-num">
            [{{ i + 1 }}] :
          </div>
          <div class="flex-grow">
            <py-code-block :id="child.id" :py="py" :code="child.code" :controls="false" :namespace="namespace">
            </py-code-block>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { usePython } from "usepython";
import PyCodeBlock from "@/../../src/PyCodeBlock.vue";
import "highlight.js/styles/stackoverflow-light.css"

const props = defineProps({
  namespace: {
    type: String,
    required: true
  },
  py: {
    type: Object as typeof usePython,
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

const children = reactive<Array<Record<string, string>>>([])

function addCell(cellCode = "", cellId?: string) {
  const cid = cellId ?? (+ new Date());
  const id = `${props.namespace}-cell-` + cid;
  children.push({ id: id, code: cellCode })
}

onBeforeMount(() => {
  if (props.cells) {
    props.cells.forEach((cell, i) => {
      addCell(cell, `${i}`)
    })
  }
})
</script>
