---
title: Astro Content Collections
description: Astro の content collections を使った記事管理のメモ。
pubDate: 2026-06-25
topic: Astro
tags:
  - Astro
  - Markdown
---

`src/content.config.ts` に collection と schema を定義すると、Markdown / MDX の frontmatter を型付きで扱えます。

このサイトでは `blog`、`projects`、`notes`、`books` の 4 種類を用意しています。
