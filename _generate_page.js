#!/usr/bin/env node
const fs = require('fs');

const dat = fs.readFileSync("./_glyphs.txt", { encoding: "utf-8" }).split("\n");

const codepoints = dat.flatMap(line => {
    const match = line.match(/^uni([0-9A-Fa-f]{4,6})/);
    return match ? [match[1]] : [];
});

const text = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fonts</title>
    <style>
        @font-face {
            font-family: 'LinZi';
            src: url('LinZi-1.woff') format('woff');
        }
        :lang(x-linzklar) {
            font-family: 'LinZi';
            font-size: 250%;
            border: 1px solid rgb(249, 213, 213)
        }
    </style>
</head>
<body>
${codepoints.filter(str => str.toLowerCase() !== "ffff").length} glyphs.
<ul>
${codepoints.filter(str => str.toLowerCase() !== "ffff")
        .map(hex_str => `<li>&#x${hex_str}; <span lang="x-linzklar">&#x${hex_str};</span></li>`).join("\n")
    }</ul></body>`;

fs.writeFileSync("glyphs.html", text, { encoding: "utf-8" });
