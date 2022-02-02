export default {
	filters: {
		capitalize(value) {
			if (!value) {
				return ''
			}
			return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
		},
		separator(value) {
			if (!value) {
				return ''
			}
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		},
	},
}
