export default {
	methods: {
		notification(title, message, type, dangerouslyUseHTMLString = false) {
			this.$notify({
				dangerouslyUseHTMLString,
				title,
				message,
				type,
			})
		},
	},
}
