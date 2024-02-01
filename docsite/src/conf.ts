const libName = "vuepython";
const libTitle = "Vue Python";
const repoUrl = "https://github.com/synw/vuepython";

const links: Array<{ href: string; name: string }> = [
  // { href: "/python", name: "Python api" },
];

// python runtime
const pipPackages = [];
const pyodidePackages = [];
const examplesExtension = "py";

async function loadHljsTheme(isDark: boolean) {
  if (isDark) {
    await import("highlight.js/styles/base16/material-darker.css")
  } else {
    await import("highlight.js/styles/stackoverflow-light.css")
  }
}

/** Import the languages you need for highlighting */
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('html', xml);

export { libName, libTitle, repoUrl, pipPackages, examplesExtension, pyodidePackages, links, hljs, loadHljsTheme }