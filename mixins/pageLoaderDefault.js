import pageLoader from '@/mixins/pageLoaderWithData.js'

export default {
	mixins: [
		pageLoader,
	],
	mounted() {
		this.setPending(false)
	},
}
