export default {
	computed: {
		baseUrl() {
			return process.client ? window.location.origin : this.$config.urls.front
		},
		currentOrigin() {
			return this.baseUrl + this.$route.path
		},
	},
}
