<template>
	<span class="money">
		<template v-if="trueCurrency === 'USD'">$</template>
		<template v-if="trueCurrency === 'EUR'">€</template>
		<template v-if="trueCurrency === 'BRL'">R$</template>
		<span
			class="amount"
			:class="{'amount-card': isCard}"
			@click="$emit('cost', amount)">{{ mainFormedAmount }}</span>
		<ruble
			v-if="trueCurrency === 'RUB'"
			class="money-icon" />
	</span>
</template>

<script>
import Ruble from '~/assets/symbols/ruble-bold.svg?inline'

import Currency from '@/mixins/currency.js'

export default {
	components: {
		Ruble,
	},
	mixins: [
		Currency,
	],
	props: {
		amount: {
			type: [ Number, String ],
			default: 0,
		},
		currencyOverride: {
			type: String,
			default: '',
		},
		isCard: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		mainFormedAmount() {
			return this.formedAmount(this.amount)
		},
		trueCurrency() {
			return this.currencyOverride || this.currency
		},
	},
}
</script>

<style lang="scss" scoped>
// TODO pull styles from admin
.money {
	&-icon {
		vertical-align: -.121em;
		overflow: visible;
		width: .55em;
		height: .905em;
	}
}

.amount {
	&-card {
		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}
}
</style>
