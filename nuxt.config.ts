// https://nuxt.com/docs/api/configuration/nuxt-config

import { quasar } from '@quasar/vite-plugin'

export default defineNuxtConfig({
    ssr: false,
    app: {
        baseURL: '/2023_01_formation_IBISA/',
    },
    css: [
        '@quasar/extras/material-icons/material-icons.css',
        '@quasar/extras/mdi-v7/mdi-v7.css',
        '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
        '~/assets/styles/quasar.sass',
        '~/assets/styles/myStyle.css',
    ],
    build: {
        transpile: ['quasar', '@pinia/nuxt'],
    },
    modules: [
        '@vueuse/nuxt',
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            },
        ],
    ],
    imports: {
        dirs: ['stores'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        plugins: [
            quasar({
                sassVariables: 'assets/styles/quasar.variables.sass',
            }),
        ],
    },

})
