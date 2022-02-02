export default {
	methods: {
		notification(title, message, type) {
			this.$notify({
				title,
				message,
				type,
			})
		},
		showError(error) {
			this.notification(
				'Произошла ошибка',
				'Подробности см. в консоли',
				'error',
			)
			console.error(error)
		},
	},
}
