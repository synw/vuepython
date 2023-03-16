<template>
</template>

<style lang="sass">
.cursor-pointer
  cursor: pointer
.cursor-wait
  cursor: wait
.w-limited
  @apply max-w-[52rem] xl:min-w-[52rem]
.app-icon
  @apply inline-block text-xl
  &.icon-success
    @apply text-green-600
  &.icon-danger
    @apply text-red-500 dark:text-red-400
  &.icon-light
    @apply text-gray-500 dark:text-gray-300
  &.icon-lighter
    @apply text-slate-200 dark:text-neutral-600
.code-editor
  @apply overflow-x-auto overflow-y-hidden
.pycode-block:not(.raw)
  .code-editor
    @apply p-2 bg-gray-100 dark:bg-black dark:text-neutral-200 rounded-md border border-gray-200 dark:border-neutral-800
.code-exec-btn
  @apply mt-2 focus:ring-0 border
.code-output
  @apply pl-8 pt-2 flex flex-col
  &.filled
    @apply px-2
.btn.neuro
  @apply rounded-lg block-background shadow-[-2px_-2px_10px_rgba(255,255,255,1),3px_3px_10px_rgba(0,0,0,0.2)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_3px_3px_5px_rgba(0,0,0,0.1)]
  @apply dark:shadow-[-2px_-2px_10px_rgba(155,155,155,0.3),3px_3px_10px_rgba(10,10,10,1)]
.notebook:not(:first-child)
  @apply space-y-2
.notebook
  & .cell-num
    @apply text-slate-400 mr-5
  & .buttonbar
    @apply flex justify-end ml-8 w-max
    & .add-cell-btn
      @apply flex flex-row items-center space-x-2 btn text-slate-200 dark:text-neutral-700
  & .cell
    @apply flex flex-col w-full
    & .cell-block
      @apply flex flex-row w-full
      & .cell-main
        @apply flex-grow
.pystatus
  & .ficon
    @apply ml-2 mr-5 text-2xl
    &.icon-exec
      @apply txt-danger
  & .frow
    @apply flex flex-row
</style>