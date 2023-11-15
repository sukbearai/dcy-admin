import path, { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Shiki from 'markdown-it-shiki'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'

// @ts-expect-error failed to resolve types
import VueMacros from 'unplugin-vue-macros/vite'
import WebfontDownload from 'vite-plugin-webfont-dl'

// import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode }) => {
  let proxy = {}

  const env = loadEnv(mode, process.cwd())

  // https://cn.vitejs.dev/config/#conditional-config
  if (command === 'serve') {
    proxy = {
      '/api': {
        target: env.VITE_SERVER_PROXY_URL,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    }
  }

  return {
    server: {
      proxy,
    },

    resolve: {
      alias: [
        {
          find: '~/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
        {
          find: 'vue',
          replacement: 'vue/dist/vue.esm-bundler.js',
          // compile template
        },
      ],
      extensions: ['.ts', '.js'],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-6': '#3076FF',
            'font-size-body-3': '14px',
            'font-size-body-2': '14px',
            'font-size-body-1': '14px',
            'font-size-caption': '14px',
            'font-size-title-1': '24px',
            'font-size-title-2': '24px',
            'font-size-title-3': '24px',
            'font-size-display-1': '24px',
            'font-size-display-2': '24px',
            'font-size-display-3': '24px',
            // 配置arco design的媒体查询断点
            'hack': `true; @import (reference) "${resolve(
              'src/styles/breakpoint.less',
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      // createStyleImportPlugin({
      //   libs: [
      //     {
      //       libraryName: '@arco-design/web-vue',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         // css
      //         // return `@arco-design/web-vue/es/${name}/style/css.js`
      //         // less
      //         return `@arco-design/web-vue/es/${name}/style/index.js`
      //       },
      //     },
      //   ],
      // })
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ['**/components/**/*.vue'],
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        defaultExportByFilename: true,
        // resolvers: [ArcoResolver()],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          {
            axios: [
              // default imports
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
            dayjs: [
              ['default', 'dayjs'],
            ],
          },
        ],
        resolvers: [VueHooksPlusResolver()],
        dts: 'src/auto-imports.d.ts',
        // 需要被自动导入的模块
        dirs: [
          'src/composables',
          'src/stores',
          'src/api/**',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['src/components/**', 'src/pages/**/components/**', 'src/layouts/**'],
        // dirs: [], // Avoid parsing src/components.  避免解析到src/components
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
        resolvers: [
          // ArcoResolver({
          //   sideEffect: true,
          // }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),

      // https://github.com/antfu/vite-plugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Shiki, {
            theme: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Vitesse',
          short_name: 'Vitesse',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),

      vueJsx(),

      svgLoader({ svgoConfig: {} }),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      // includeAllRoutes: false, // 这将禁止所有路由的静态生成
      includedRoutes(paths) {
        // exclude all the route paths that contains 'foo'
        // 只对首页进行静态生成
        return paths.filter(i => i === '/')
      },
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap()
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/, 'echarts', 'vue-echarts', 'resize-detector', 'zrender', 'file-saver'],
    },
  }
})
