import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			isRub: 'locale/rub',
			region: 'locale/region',
			currency: 'locale/currency',
			client: 'services/client',
		}),
	},
	methods: {
		formedAmount(amount) {
			return this.$options.filters.thousands(amount)
		},
		getCurrencyString(amount) {
			switch (this.currency) {
				case 'RUB':
					return `${amount.toFixed(0)} ${this.$t('CLIENT_LK' === this.client ? 'RUB' : 'rubles')}`
				case 'USD':
					return `$ ${amount.toFixed(2)}`
				case 'EUR':
					return `€ ${amount.toFixed(2)}`
				case 'BRL':
					return `R$ ${amount.toFixed(2)}`
			}
		},
	},
}
