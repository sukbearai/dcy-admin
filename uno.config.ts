import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

import remToPxPreset from '@unocss/preset-rem-to-px'

export default defineConfig({
  // 添加系统样式
  rules: [
    // 主题色
    ['primary-6', { 'background-color': '#3076FF' }],
    ['text-primary', { color: '#1A1A1A' }],
    ['text-title', { 'font-size': '24px' }],
  ],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        'dcy': FileSystemIconLoader(
          './src/assets/icon',
          svg => svg.replace(/#FFF/, 'currentColor'),
        ),
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
        'material-symbols': () => import('@iconify-json/material-symbols').then(i => i.default as any),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    remToPxPreset(),
  ],
  transformers: [
    transformerDirectives({ enforce: 'pre' }),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
})
