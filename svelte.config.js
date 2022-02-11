/**
 * Docs:
 * https://kit.svelte.dev/docs/configuration#package
 * https://svelte.dev/
 * https://vitejs.dev/config/#css-preprocessoroptions
 * https://www.npmjs.com/package/@sveltejs/adapter-static/v/next
 */
import adapter from '@sveltejs/adapter-static'
import SveltePreprocess from 'svelte-preprocess'

const preprocess = SveltePreprocess()

const config = {
	kit: {
		adapter: adapter({
			precompress: true
		}),
		browser: {
			router: false
		},
		files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			template: 'src/app.html'
		}
	},
	preprocess,
}

export default config;
