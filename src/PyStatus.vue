<template>
  <div v-if="pyInstallLog.stage == 0">
    <app-icon name="python" class="ml-2 mr-5 text-2xl txt-light"></app-icon>
  </div>
  <div v-else-if="[1, 2].includes(pyInstallLog.stage)" class="flex flex-row">
    <div>{{ pyInstallLog.msg }}</div>
    <div>
      <app-icon name="pyconf" class="ml-2 mr-5 text-2xl"></app-icon>
    </div>
  </div>
  <div v-else-if="[3, 4].includes(pyInstallLog.stage)" class="flex flex-row">
    <div>{{ pyInstallLog.msg }}</div>
    <div>
      <app-icon name="pytest" class="ml-2 mr-5 text-2xl"></app-icon>
    </div>
  </div>
  <div v-else-if="pyInstallLog.stage == 5">
    <app-icon name="python" class="text-2xl" :class="isPyExecuting == false ? '' : 'txt-danger'">
    </app-icon>
  </div>
</template>

<script setup lang="ts">
import { usePython } from "usepython";
import { useStore } from '@nanostores/vue';
import AppIcon from "./AppIcon.vue"

const props = defineProps({
  py: {
    type: Object as typeof usePython,
    required: true
  },
});

const pyInstallLog = useStore(props.py.installLog);
const isPyExecuting = useStore(props.py.isExecuting);
</script>