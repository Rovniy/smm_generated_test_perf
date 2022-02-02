import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'

const QUANTITY_FORMULA_DEBOUNCE = 750

export default {
	data: () => ({
		serviceUnwatch: null,
		quantityUnwatch: null,
	}),
	beforeMount() {
		this.serviceUnwatch = this.$store.watch(
			(_, getters) => getters['services/service'],
			() => this.getPrice(),
		)
		this.quantityUnwatch = this.$store.watch(
			(_, getters) => getters['services/quantityForCost'](this.postQuantity, this.quantity, this.quantityMin, this.quantityMax),
			() => this.getPrice(),
		)
	},
	beforeDestroy() {
		this.serviceUnwatch()
		this.quantityUnwatch()
		this.unsetOrderCost()
	},
	methods: {
		...mapActions({
			netOrderCost: 'services/netOrderCost',
			unsetOrderCost: 'services/unsetOrderCost',
		}),
		getPrice: debounce(
			async function() {
				await this.netOrderCost({
					postQuantity: this.postQuantity,
					quantity: this.quantity,
					quantityMin: this.quantityMin,
					quantityMax: this.quantityMax,
				})
			},
			QUANTITY_FORMULA_DEBOUNCE,
		),
	},
}
