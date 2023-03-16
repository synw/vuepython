<template>
  <div class="pystatus">
    <div v-if="pyInstallLog.stage == 0">
      <app-icon name="python" class="ficon"></app-icon>
    </div>
    <div v-else-if="[1, 2].includes(pyInstallLog.stage)" class="frow">
      <div>{{ pyInstallLog.msg }}</div>
      <div>
        <app-icon name="pyconf" class="ficon"></app-icon>
      </div>
    </div>
    <div v-else-if="[3, 4].includes(pyInstallLog.stage)" class="frow">
      <div>{{ pyInstallLog.msg }}</div>
      <div>
        <app-icon name="pytest" class="ficon"></app-icon>
      </div>
    </div>
    <div v-else-if="pyInstallLog.stage == 5">
      <app-icon name="python" class="ficon" :class="isPyExecuting == false ? '' : 'icon-exec'">
      </app-icon>
    </div>
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