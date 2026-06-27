# homepage

Astro で作る個人ホームページです。ブログ、作ったもの、勉強メモ、書籍メモを Markdown / MDX で管理できます。

## Commands

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

## Content

- `src/content/blog`: ブログ
- `src/content/projects`: 作ったもの
- `src/content/notes`: 勉強メモ
- `src/content/books`: 書籍メモ

Frontmatter の型は `src/content.config.ts` で管理しています。

## Site URL

公開 URL が決まったら、`astro.config.mjs` と `src/site.config.ts` の `http://localhost:4321` を実際の URL に変更してください。RSS と sitemap の URL 生成に使います。
