export default {
	methods: {
		sendGTMEvent(event, platform, value = null, currency = null) {
			this.$gtm.push({
				event,
				platform,
				locale: this.$i18n.locale,
				...value && { value },
				...currency && { currency },
			})
		},
	},
}
