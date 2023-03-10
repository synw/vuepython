# Vue Python

[![package](https://img.shields.io/npm/v/vuepython)](https://www.npmjs.com/package/vuepython)

Edit and run Python code in Vuejs 3

Based on [usepython](https://github.com/synw/usepython): the Python code runs in 
a [Pyodide](https://github.com/pyodide/pyodide) service worker, leaving the main ui thread alone

[Documentation](https://synw.github.io/vuepython/)

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

Import the necessary css

```ts
import "vuepython/style.css"
```

## Example

Example code:

```vue
<template>
  <div class="flex flex-row w-full p-3 primary">
    <div class="text-2xl">Vue Python</div>
    <div class="flex justify-end flex-grow">
      <py-status :py="py"></py-status>
    </div>
  </div>
  <div class="container mx-auto">
    <div class="p-8">
      <py-code-block id="script" :py="py" :code="code"></py-code-block>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { usePython } from "usepython";
import { PyStatus, PyCodeBlock } from "vuepython";
import "vuepython/style.css";
import "highlight.js/styles/stackoverflow-light.css"

const py = usePython()

const code = `print('starting python script')
a = 1
b = 2
print('finished python script')
c = a + b
# return value
c`;

async function init() {
  await py.load();
}

onBeforeMount(() => init())
</script>
```