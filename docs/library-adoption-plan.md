# ライブラリ導入・初期化計画書

作成日: 2026-06-27

## 1. 前提

このリポジトリは、すでに Astro 7 を中心にした個人ホームページとして初期化済みです。

現在導入済みの主要パッケージ:

| 分類 | 導入状況 | 備考 |
| --- | --- | --- |
| Astro | 導入済み | `astro@7.0.2` |
| Svelte | 導入済み | `svelte@5.56.4`, `@astrojs/svelte@9.0.0` |
| Tailwind CSS v4 | 導入済み | `tailwindcss@4.3.1`, `@tailwindcss/vite@4.3.1` |
| Biome | 導入済み | `@biomejs/biome@2.5.1` |
| MDX | 導入済み | `@astrojs/mdx@7.0.0` |
| Content Collections | 導入済み | `src/content.config.ts` で設定済み |
| 画像最適化 | 一部導入済み | `sharp@0.35.2` 導入済み。Astro 標準の `astro:assets` を使う |
| RSS / Sitemap | 導入済み | `@astrojs/rss`, `@astrojs/sitemap` |

したがって、案1をそのまま全導入するのではなく、既存基盤を維持しながら不足分を段階導入する方針にします。

## 2. 推奨スタック

### 採用する

| 分類 | 推奨パッケージ | 理由 |
| --- | --- | --- |
| UI 基盤 | `bits-ui` | Svelte 5 向けの headless UI primitives。Dialog, Dropdown, Tooltip などのアクセシブルな土台に使う |
| class 結合 | `clsx` | 条件付き class を簡潔に扱う |
| Tailwind 競合解決 | `tailwind-merge` | `px-2 px-4` のようなユーティリティ競合を解決する |
| コンポーネント variant | `class-variance-authority` | Button, Badge, Card などを再利用部品化する段階で使う |
| アイコン | `@lucide/svelte` | Svelte island 内で使う。Astro 静的部分では必要なら SVG 直書きも可 |
| タイポグラフィ | `@tailwindcss/typography` | Markdown / MDX 本文の読みやすさを整える |
| 写真ギャラリー | `photoswipe` | 旅写真・作品画像の lightbox に使う |
| アニメーション | `motion` | Motion One 系ではなく現行の `motion` パッケージを使う。軽い演出は `motion/mini` 優先 |
| Unit test | `vitest` | `src/lib` や UI helper の単体テスト |
| E2E / visual check | `@playwright/test` | ナビゲーション、詳細ページ、レスポンシブ表示の検証 |

### 条件付きで採用する

| 分類 | 推奨判断 | 理由 |
| --- | --- | --- |
| Cloudflare Pages adapter | SSR が必要になったら `@astrojs/cloudflare` を採用 | 現状の静的サイトは `dist/` を Cloudflare Pages に配信するだけで足りる |
| Design Tokens | まず Tailwind v4 の CSS-first token で管理 | 別パッケージは不要。必要になれば Style Dictionary 等を検討 |
| Astro Image | 追加パッケージは不要 | Astro 標準の `astro:assets` と `sharp` を使う。古い `@astrojs/image` 前提にはしない |

### 採用しない / 置き換える

| 候補 | 判断 | 代替 |
| --- | --- | --- |
| Melt UI | 今回は見送り | `bits-ui` |
| Motion One | 現行パッケージ名としては避ける | `motion` |
| Cloudflare adapter の即時導入 | 見送り | 静的 Pages デプロイで開始 |

## 3. 最終候補パッケージ

初期追加候補:

```sh
pnpm add bits-ui clsx tailwind-merge class-variance-authority @lucide/svelte photoswipe motion
pnpm add -D @tailwindcss/typography vitest @playwright/test
```

SSR / Cloudflare runtime が必要になった場合のみ追加:

```sh
pnpm add @astrojs/cloudflare
```

## 4. 初期化手順

### Phase 1: 依存関係の追加

1. 上記の初期追加候補を `pnpm add` で導入する。
2. `pnpm install` 後に lockfile の差分を確認する。
3. `pnpm check` と `pnpm build` を通す。

### Phase 2: Tailwind v4 と Design Tokens

`src/styles/global.css` に CSS-first の token 層を追加する。

方針:

- 既存の `:root` CSS variables を残しつつ、Tailwind v4 の `@theme` に段階移行する。
- 色、spacing、radius、font を token として定義する。
- Markdown / MDX 本文は `@tailwindcss/typography` を使い、`.prose` を Tailwind typography ベースへ寄せる。

想定変更:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-bg: #f8f7f2;
  --color-surface: #ffffff;
  --color-text: #202124;
  --color-muted: #62615c;
  --color-line: #dedbd2;
  --color-accent: #0f766e;
  --radius-card: 8px;
}
```

### Phase 3: UI utility の追加

`src/lib/cn.ts` を追加する。

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`class-variance-authority` は、Button / Badge / LinkButton のような再利用コンポーネントを作るタイミングで使う。初期導入直後に過剰抽象化しない。

### Phase 4: Svelte island と Bits UI

最初に作る候補:

- `src/components/ui/Dialog.svelte`
- `src/components/ui/DropdownMenu.svelte`
- `src/components/ui/Tooltip.svelte`

使いどころ:

- モバイルナビゲーション
- 外部リンク / SNS リンクの補足 Tooltip
- 作品詳細の画像・補足情報モーダル

Astro ページからは必要な場所だけ `client:load` / `client:visible` / `client:idle` を選ぶ。

### Phase 5: アイコン

Svelte island 内では `@lucide/svelte` を使う。

Astro の静的コンポーネントでは、頻出アイコンだけ inline SVG 化するか、Svelte island に寄せる。全ページに不要な JavaScript を増やさない。

### Phase 6: 写真ギャラリー

`photoswipe` は、旅写真・作品スクリーンショットが増えてから導入する。

初期設計:

- `src/components/Gallery.astro`
- `src/components/GalleryIsland.svelte`
- 画像メタデータは Content Collections の frontmatter か colocated data で管理
- サムネイルは Astro の `Image` / `Picture` を使う
- lightbox 起動だけ Svelte island に任せる

### Phase 7: アニメーション

`motion` は、サイト全体の常時依存にしない。

方針:

- 基本の hover / focus / reduced-motion 対応は CSS で実装する。
- スクロール出現や lightbox 補助など、JavaScript が自然な箇所だけ `motion/mini` を使う。
- `prefers-reduced-motion` を必ず尊重する。

### Phase 8: テスト

追加 scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

初期テスト対象:

- `src/lib/content.ts` の並び順・draft 除外
- Content Collections の schema validation
- トップページ、一覧ページ、詳細ページが 200 で表示されること
- モバイル幅で header / nav / card の表示が崩れないこと

### Phase 9: Cloudflare Pages

静的サイトとして開始する場合:

- Build command: `pnpm build`
- Output directory: `dist`
- Node.js version: プロジェクトで固定する場合は `.nvmrc` または Pages の環境変数で管理

SSR / middleware / runtime binding が必要になった場合:

1. `pnpm add @astrojs/cloudflare`
2. `astro.config.mjs` に adapter を追加する。
3. Cloudflare bindings が必要な場合は adapter options を追加する。
4. `pnpm build` と Cloudflare preview で検証する。

## 5. 優先順位

1. `@tailwindcss/typography`, `clsx`, `tailwind-merge`
2. `vitest`, `@playwright/test`
3. `bits-ui`, `@lucide/svelte`
4. `class-variance-authority`
5. `photoswipe`
6. `motion`
7. `@astrojs/cloudflare`

理由:

- Markdown / MDX の本文品質と class 管理はすぐ効果が出る。
- テスト基盤は早い段階で入れるほど後続変更が安全になる。
- Headless UI、ギャラリー、モーションは、実際の UI 要件が出てから使う方が依存を増やしすぎない。
- Cloudflare adapter は静的配信では不要なので、SSR 要件が出るまで待つ。

## 6. 検証コマンド

導入後は以下を最低ラインにする。

```sh
pnpm check
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

Cloudflare Pages 前提の確認:

```sh
pnpm build
pnpm preview
```

## 7. 参照した一次情報

- Astro docs: https://docs.astro.build/
- Astro Svelte integration: https://docs.astro.build/en/guides/integrations-guide/svelte/
- Astro MDX integration: https://docs.astro.build/en/guides/integrations-guide/mdx/
- Astro Content Collections: https://docs.astro.build/en/guides/content-collections/
- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Tailwind CSS v4 docs: https://tailwindcss.com/docs
- Tailwind Typography: https://github.com/tailwindlabs/tailwindcss-typography
- Bits UI docs: https://www.bits-ui.com/docs
- Motion docs: https://motion.dev/docs
