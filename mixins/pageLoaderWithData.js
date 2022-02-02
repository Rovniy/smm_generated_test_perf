import pageLoader from '@/mixins/pageLoader.js'

export default {
	mixins: [
		pageLoader,
	],
	beforeRouteLeave(to, from, next) {
		if (to.name.startsWith('cp')) {
			this.setPending(true)
		}
		next()
	},
}
