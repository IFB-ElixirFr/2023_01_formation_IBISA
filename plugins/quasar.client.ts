import * as components from 'quasar'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	const quasarUserOptions = {
		components,
		plugins: {},
		extras: [
			'mdi-v7'
		  ]
	}

	nuxtApp.vueApp.use(components.Quasar, quasarUserOptions)
})