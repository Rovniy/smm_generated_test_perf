export default {
	mounted() {
		const { gclid } = this.$route.query
		const oldGclid = this.$cookiz.get('gclid')
		if (oldGclid) {
			this.$cookiz.set(
				'new_gclid',
				gclid, {
					path: '/',
					maxAge: 60 * 30, // 30 minutes
				},
			)
			this.$cookiz.remove('gclid')
		}
		const newGclid = this.$cookiz.get('new_gclid')
		if (gclid && gclid !== newGclid) {
			this.$cookiz.set(
				'new_gclid',
				gclid, {
					path: '/',
					maxAge: 60 * 30, // 30 minutes
				},
			)
		}
	},
}
