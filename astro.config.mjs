// @ts-check
import { defineConfig } from "astro/config";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/ remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    // カスタムドメインを持ってないのでコメントアウト
    // site: "http://localhost:4321",
    integrations: [solidJs(), UnoCSS({ injectReset: true }), icon(), svelte()],
    markdown: {
        remarkPlugins: [remarkReadingTime],
    },
    output: "server",
    adapter: cloudflare(),
    vite: {
        assetsInclude: "**/*.riv",
    },
});