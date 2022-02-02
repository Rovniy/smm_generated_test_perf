import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			levels: 'discounts/levels',
		}),
		activeDiscount() {
			return ((this.$auth.user.premium_status_id || 1) - 1) % this.levels.length
		},
		nextDiscount() {
			return this.activeDiscount + ([ 4, 9, 14, 19 ].includes(this.activeDiscount)
				? 0
				: 1)
		},
		discounts() {
			return this.levels[this.activeDiscount].discounts
		},
	},
}
