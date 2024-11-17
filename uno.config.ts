import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    colors: {
      light: {
        primary: {
          DEFAULT: '#8B593E',
          cream: '#E8D0B8',
          foam: '#F4E6D8',
        },
        accent: {
          caramel: '#C68B59',
          mocha: '#6F4E37',
          hover: '#D4A982',      // ホバー時のボーダー色
        },
        background: {
          DEFAULT: '#F7EFE4',
          subtle: '#EFE0CC',
          muted: '#E2CDB0',
        },
        text: {
          DEFAULT: '#4A3728',
          muted: '#7C5E4C',
          subtle: '#9B7B66',
          white: '#FFFAF5',
        },
        border: {
          DEFAULT: '#D4B88F',
          subtle: '#E2CDB0',
          hover: '#C68B59',      // ホバー時のボーダー色
        }
      },
      dark: {
        primary: {
          DEFAULT: '#B98B6F',
          cream: '#D4B88F',
          foam: '#E2CDB0',
        },
        accent: {
          caramel: '#DCA77D',
          mocha: '#9B7B66',
          hover: '#E8C4A3',      // ホバー時のボーダー色
        },
        background: {
          DEFAULT: '#362F2D',
          subtle: '#423A38',
          muted: '#4E4644',
        },
        text: {
          DEFAULT: '#F4E6D8',
          muted: '#E8D0B8',
          subtle: '#D4B88F',
          white: '#FFFAF5',
        },
        border: {
          DEFAULT: '#4E4644',
          subtle: '#423A38',
          hover: '#B98B6F',      // ホバー時のボーダー色
        }
      }
    }
  },
  shortcuts: {
    // ベース背景
    'bg-latte': 'bg-light-background dark:bg-dark-background',
    
    // ボタン
    'btn-latte': 'bg-light-primary text-light-text-white hover:bg-light-accent-caramel dark:bg-dark-primary dark:text-dark-text-white dark:hover:bg-dark-accent-caramel transition-colors duration-200 rounded-lg px-4 py-2',
    'btn-latte-outline': 'border-2 border-light-primary text-light-primary hover:bg-light-primary hover:text-light-text-white dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-primary dark:hover:text-dark-text-white transition-colors duration-200 rounded-lg px-4 py-2',
    
    // ホバーエフェクト付きカード
    'card-latte': `
      bg-light-background-subtle dark:bg-dark-background-subtle
      border border-light-border dark:border-dark-border
      hover:border-light-border-hover dark:hover:border-dark-border-hover
      rounded-xl p-6 shadow-sm
      hover:shadow-md
      transform hover:-translate-y-0.5
      transition-all duration-200 ease-in-out
    `,
    'card-latte-foam': `
      bg-light-primary-foam dark:bg-dark-primary-foam
      border border-light-border dark:border-dark-border
      hover:border-light-accent-hover dark:hover:border-dark-accent-hover
      rounded-xl p-6 shadow-sm
      hover:shadow-md
      transform hover:-translate-y-0.5
      transition-all duration-200 ease-in-out
    `,
    
    // インタラクティブカード（より強調されたホバーエフェクト）
    'card-latte-interactive': `
      bg-light-background-subtle dark:bg-dark-background-subtle
      border-2 border-light-border dark:border-dark-border
      hover:border-light-accent-hover dark:hover:border-dark-accent-hover
      rounded-xl p-6
      shadow-sm hover:shadow-lg
      transform hover:-translate-y-1
      transition-all duration-300 ease-in-out
      cursor-pointer
    `,
    
    // テキストスタイル
    'text-latte': 'text-light-text dark:text-dark-text',
    'text-latte-muted': 'text-light-text-muted dark:text-dark-text-muted',
    'text-foam': 'text-light-primary-foam dark:text-dark-primary-foam',
  }
})