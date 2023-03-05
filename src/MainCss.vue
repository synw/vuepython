<template>
</template>

<style lang="sass">
.code-editor
  @apply overflow-x-auto overflow-y-hidden
.pycode-block:not(.raw)
  .code-editor
    @apply p-2 bg-gray-100 dark:bg-black dark:text-neutral-200 rounded-md max-w-[100ch] xl:min-w-[100ch] border border-gray-200 dark:border-neutral-800
.code-exec-btn
  @apply mt-2
.code-output
  @apply pl-8 pt-2
  &.filled
    @apply px-2
.btn.neuro
  @apply rounded-lg block-background shadow-[-2px_-2px_10px_rgba(255,255,255,1),3px_3px_10px_rgba(0,0,0,0.2)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_3px_3px_5px_rgba(0,0,0,0.1)]
  @apply dark:shadow-[-2px_-2px_10px_rgba(155,155,155,0.3),3px_3px_10px_rgba(10,10,10,1)]
.notebook:not(:first-child)
  @apply space-y-2
.notebook
  & .cell-num
    @apply text-slate-400
</style>