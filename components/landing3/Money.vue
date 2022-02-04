<template>
	<span class="money3">
		<template v-if="currency === 'USD'">$</template>
		<template v-if="currency === 'EUR'">€</template>
		<template v-if="currency === 'BRL'">R$</template>
		<span>{{ getResult(amount) }}</span>
		<svg-icon
			v-if="currency === 'RUB'"
			name="ruble"
			class="money3__icon" />
	</span>
</template>

<script>
import Currency from '~/mixins/currency.js'
import textFilters from '~/mixins/textFilters.js'

export default {
	name: 'LandingMoney',
	mixins: [
		Currency,
		textFilters,
	],
	props: {
		amount: {
			type: Number,
			default() {
				return 0
			},
		},
		hasSeparator: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		getResult(amount) {
			const value = this.formedAmount(parseFloat(amount.toFixed(2)))

			return this.hasSeparator
				? this.$options.filters.separator(value)
				: value
		},
	},
}
</script>

<style lang="scss">
.money3 {
	white-space: nowrap;

	&__icon {
		width: .6em;
		height: .7em;
	}
}
</style>
