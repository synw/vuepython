# Vue Python

[![package](https://img.shields.io/npm/v/vuepython)](https://www.npmjs.com/package/vuepython)

Edit and run Python code in Vuejs 3

Based on [usepython](https://github.com/synw/usepython): the Python code runs in 
a [Pyodide](https://github.com/pyodide/pyodide) service worker, leaving the main ui thread alone

[Demo](https://synw.github.io/vuepython/) - [Example](example/README.md)

## Install

```
npm install vuepython
# or
yarn add vuepython
```

## Usage

### Load the Python runtime:

```ts
import { onBeforeMount } from 'vue';
import { usePython } from "usepython";

const py = usePython()

async function init() {
  await py.load();
}

onBeforeMount(() => init())
```

A `PyStatus` widget is available to display the installation status:

```vue
<template>
  <py-status :py="py"></py-status>
</template>

<script setup lang="ts">
import { PyStatus } from "vuepython"
</script>
```

### Code blocks

Once the runtime is loaded it is possible to use the `PyCodeBlock` code editor widget:

```vue
<template>
  <py-code-block id="1" :code="code" :py="py"></py-code-block>
</template>

<script setup lang="ts">
import "vuepython/style.css";
import "highlight.js/styles/stackoverflow-light.css" // or any highlightjs theme
import { PyCodeBlock } from "vuepython";

const code = `print('running a python script')`;
</script>
```

Use any [highlight.js theme](https://github.com/highlightjs/highlight.js/tree/main/src/styles) for
the code block. [Themes preview](https://highlightjs.org/static/demo/)

## Css

The styling of the widgets is made with Tailwind css classes. If you don't have
Tailwind installed import the necessary css manualy:

```ts
import "vuepython/twstyle.css"
```

## Example

An [example](example/README.md) is available