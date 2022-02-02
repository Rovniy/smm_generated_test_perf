export default {
	data() {
		return {
			script: {
				name: 'uLogin',
				src: 'https://ulogin.ru/js/ulogin.js',
				routes: [
					'login___ru',
					'login___en',
					'login___es',
					'login___pt',
					'login___tr',
					'signup___ru',
					'signup___en',
					'signup___es',
					'signup___pt',
					'signup___tr',
				],
				onload: () => {
					// console.log(`Script "${this.script.name}" was loaded successfully`);
					// console.log('Additional data: ', e);
					window[`__${this.script.name}__flag__`] = true
				},
				onerror: e => {
					console.error(`An error occurred while loading script from "${this.script.name}": `, e)
				},
			},
		}
	},
	computed: {
		scriptRoute() {
			if (!this.script.routes.length) {
				return true
			}
			return this.script.routes.includes(this.$route.name)
		},
	},
	watch: {
		$route() {
			this.checkScript()
		},
	},
	beforeMount() {
		this.checkScript()
	},
	methods: {
		loadScript() {
			const script = document.createElement('script')
			script.src = this.script.src
			script.onload = this.script.onload
			script.onerror = this.script.onerror
			const head = document.head || document.getElementsByName('head')[0]
			head.appendChild(script)
		},
		checkScript() {
			if (
				process.client
        && this.scriptRoute
        && !window[`__${this.script.name}__flag__`]
			) {
				this.loadScript()
			}
		},
	},
}
