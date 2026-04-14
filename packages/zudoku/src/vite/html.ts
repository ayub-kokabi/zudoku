import { getDirection } from "../lib/util/i18n.js";

export function getDevHtml({
  jsEntry,
  lang,
}: {
  jsEntry: string;
  lang?: string;
}) {
  const dir = getDirection(lang);
  return `
<!doctype html>
<html lang="${lang || "en"}" dir="${dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <!--app-helmet-->
    <link rel="preconnect" href="https://cdn.zudoku.dev/">
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="${jsEntry}"></script>
  </body>
</html>
`.trim();
}

export function getBuildHtml({
  jsEntry,
  cssEntries,
  lang,
}: {
  jsEntry: string;
  cssEntries: string[];
  lang?: string;
}) {
  const dir = getDirection(lang);
  const cssLinks = cssEntries
    .map((css) => `    <link rel="stylesheet" crossorigin href="${css}">`)
    .join("\n");
  return `
<!doctype html>
<html lang="${lang || "en"}" dir="${dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <script type="module" crossorigin src="${jsEntry}"></script>
${cssLinks}
    <!--app-helmet-->
    <link rel="preconnect" href="https://cdn.zudoku.dev/">
  </head>
  <body>
    <div id="root"><!--app-html--></div>
  </body>
</html>
`.trim();
}
