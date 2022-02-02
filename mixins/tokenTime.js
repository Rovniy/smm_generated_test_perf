export default {
	created() {
		if (process.client) {
			const tokenTime = 'undefined' === typeof localStorage
				? this.$cookiz.get('token_time')
				: localStorage.getItem('token_time')
			const getCookieToken = this.$auth.$storage.getCookie('_token.email')
			if ('false' === tokenTime) {
				this.$auth.$storage.setCookie('_token.email', getCookieToken, { expires: 0.5 })
			}
		}
	},
}
