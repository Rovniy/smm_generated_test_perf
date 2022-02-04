<template>
	<div
		v-if="open"
		class="popup-wrap"
		@mousedown.self="toMain">
		<div class="popup">
			<img
				class="tyimg"
				src="/img/123.png"
				alt="background image">
			<button
				class="close"
				type="button"
				aria-label="Закрыть"
				@click="toMain">
				<img
					alt="logout"
					src="~/assets/symbols/exit.svg">
			</button>
			<h3 class="modaltitle1 uppercase">
				{{ $t('thanks_header') }}
			</h3>
			<p class="uppercase black-color thanksp">
				{{ $t('thanks_p_1') }}
			</p>
			<form class="signup-form merged-form-elements">
				<div class="column width-8 color-theme left pricetop">
					<span class="amount left blue-color uppercase">
						{{ $t('thanks_span_1') }}:
					</span>
				</div>
				<div class="column width-4 color-theme right">
					<span class="amount right gilroy blue-color uppercase">
						{{ $t('thanks_span_2') }}
					</span>
				</div>
				<hr class="modalhr">
				<div class="column width-8 color-theme left pricetop">
					<span class="amount left gotham-bold black-color">
						{{ products.quantity }}
						{{ products.name }}
					</span>
				</div>
				<div class="column width-4 color-theme right">
					<span class="amount right gotham-bold black-color underlabel">
						<money :amount="products.price * products.quantity" />
					</span>
				</div>
				<div class="column width-6 left">
					<button
						class="blue-button uppercase"
						@click="toMain">
						<home class="home-icon" /><!--
					 -->{{ $t('thanks_link_1') }}
					</button>
				</div>
				<div class="column width-6-right right">
					<button
						class="blue-button uppercase"
						@click="toCP">
						<sign-in class="sign-in-icon" /><!--
					 -->{{ $t('thanks_link_2') }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>

import SignIn from 'assets/symbols/signin.svg'
import Home from 'assets/symbols/home.svg'
import Money from '@/components/_library/Money.vue'

import notification from '~/mixins/notification.js'
import Currency from '~/mixins/currency.js'
import gtmEvent from '~/mixins/gtmEvent.js'

const PAYMENT_SUCCEEDED = 'payment.succeeded'

export default {
	components: {
		Money,
		SignIn,
		Home,
	},
	mixins: [
		notification,
		Currency,
		gtmEvent,
	],
	data() {
		return {
			open: false,
			products: {
				name: '',
				quantity: 0,
				price: 0,
			},
		}
	},
	computed: {
		accepted() {
			return !!this.$route.query.accepted
		},
	},
	beforeMount() {
		this.openModal()
	},
	methods: {
		hide() {
			this.open = false
			document.body.style.overflow = 'auto'
		},
		toMain() {
			this.hide()
			this.$router.replace({
				query: null,
			})
		},
		toCP() {
			this.hide()
			this.$router.push(this.localePath('/login'))
		},
		getPaymentId() {
			if ('undefined' === typeof localStorage) {
				return this.$cookiz.get('payment_id')
			}
			return localStorage.getItem('payment_id')
		},
		clearPaymentData(paymentId) {
			if ('undefined' === typeof localStorage) {
				this.$cookiz.remove(paymentId)
				this.$cookiz.remove('payment_id')
			}
			else {
				localStorage.removeItem(paymentId)
				localStorage.removeItem('payment_id')
			}
		},
		async isPaid(paymentId) {
			if (this.accepted) {
				return 'PaymentSuccess' === this.$route.query.action
			}
			const response = await this.$http.payment.status(paymentId)
			return response.data.terminal && PAYMENT_SUCCEEDED === response.data.status
		},
		async openModal() {
			const paymentId = this.getPaymentId()
			if (!paymentId) {
				return
			}
			this.products = JSON.parse('undefined' === typeof localStorage
				? this.$cookiz.get(paymentId)
				: localStorage.getItem(paymentId))
			if (await this.isPaid(paymentId)) {
				this.open = true
				this.sendGTMEvent(
					'order_paid',
					this.products.platform,
					this.products.price * this.products.quantity,
					this.currency,
				)
			}
			else {
				this.sendGTMEvent('order_unpaid', this.products.platform)
			}
			this.clearPaymentData(paymentId)
		},
	},
}
</script>

<style lang="scss" scoped>
.color-theme,
.color-hover-theme:hover {
	color: #33363A;
}

.left {
	float: left;
}

.merged-form-elements .column:first-child {
	padding-right: 0;
}

form {
	position: relative;
	margin: 0 10% 5%;
}

.thanksp {
	position: relative;
	font-size: 11px;
	margin-bottom: 3rem;
}

.icon {
	margin-right: 3%;
}

.amount {
	font-weight: bold;
}

.underlabel {
	display: inline-block;
	height: 18px;

	img {
		width: 14px;
		height: 14px;
	}
}

.width-4 {
	width: 33.33333%;
}

.width-8 {
	width: 66.66666%;
}

.width-6,
.width-6-right {
	width: 90%;
	margin-left: 5%;
	margin-right: 5%;
	margin-top: 5%;
}

.right {
	float: right;
}

.modalhr {
	margin-bottom: .5rem;
	margin-top: 1.3rem;
	border-color: #009DFF;
}

hr {
	border-top: 1px solid #EEE;
	border-right: 0;
	border-bottom: 0;
	border-left: 0;
	height: 0;
	clear: both;
}

.button {
	min-width: 0;
}

.blue-button {
	display: flex;
	font-weight: bold;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	background-color: #009DFF;
	color: #FFF;
	text-transform: uppercase;
	font-size: .7rem;
	border-radius: 10rem;
	border: 2px solid #009DFF;
	height: 33px;
	box-shadow: 0 0 40px rgba(0, 156, 255, .7);
	width: 100%;
}

.blue-button:hover {
	background-color: #FFF;
	color: #009DFF;
	-webkit-transition-duration: .5s;
	transition-duration: .5s;
	border: 2px solid #009DFF;
	box-shadow: 0 0 40px rgba(255, 255, 255, .7);

	svg.singin-icon {
		fill: #009DFF;
	}
}

.tyimg {
	visibility: visible;
	display: block;
	position: absolute;
	width: 18%;
	opacity: .5;
	bottom: 81%;
	left: 1%;
	transform: rotate(330deg);

	@media (max-width: 1199px) {
		display: none;
	}
}

.black-color {
	color: #33363A !important;
}

.blue-color {
	color: #009DFF !important;
}

div.popup-wrap {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-flow: column;
	align-items: center;
	background: rgba(0, 0, 0, .8);
	overflow-x: hidden;
	overflow-y: auto;
}

.uppercase {
	text-transform: uppercase;
}

.modaltitle1 {
	font-size: 22px;
	margin-top: 30px;
}

div.popup {
	text-align: center;
	display: flex;
	position: relative;
	flex-flow: column;
	justify-content: center;
	background: #FFF;
	padding: 15px;
	border-radius: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.close {
	display: inline-flex;
	width: 44px;
	height: 44px;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 15px;
	right: 15px;
	//@media (max-width: 320px) {
	//  top: 20px;
	//  right: 30px;
	//}
	//@media (max-width: 1199px) {
	//  top: 20%;
	//}
	img {
		width: 20px;
		height: 20px;
	}
}
@media (min-width: 576px) {
	div.popup-wrap {
		justify-content: center;
	}

	div.popup {
		border-radius: 8px;
		width: 450px;
		height: auto;
		overflow: hidden;
	}
}
@media (min-width: 1024px) {
	div.popup {
		border-radius: 8px;
		width: 450px;
		height: auto;
	}

	a.close {
		top: 15px;
	}
}

#order {
	width: 100%;
	padding: 20px 16px 5px;
}

#order .form_item_wrap {
	margin-top: 0;
	margin-bottom: 20px;

	&:first-child {
		display: none;
	}

	&.select_wrap {
		position: relative;

		&::after {
			content: "";
			position: absolute;
			right: 15px;
			bottom: 25px;
			margin-bottom: -2.5px;
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 5px solid #969AA1;
		}
	}

	label {
		display: none;
		color: #696F7D;
		font-size: 13px;
		line-height: 1.4;
		padding-bottom: 5px;
	}

	input,
	select {
		font-family: 'Helvetica', 'Arial', sans-serif;
		outline: none;
		border: 1px solid #D2D7DC;
		border-radius: 0;
		height: 46px;
		width: 100%;
		padding-left: 30px;
		padding-right: 30px;
		font-size: 14px;
		color: #009DFF;
		letter-spacing: 1px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		&:focus {
			border-color: #3FB58B;
		}
		@media (min-width: 1024px) {
			font-size: 14px;
		}
	}

	select {
		color: #666;
	}
}

h3 {
	font-size: 22px;
	margin-top: 15px;
	margin-bottom: 20px;
	line-height: 1;
	font-weight: 800;
	text-align: center;
	@media (max-width: 320px) {
		font-size: 18px;
	}
}

#confidential {
	text-align: center;
	color: #999;
	font-size: 9.6px;
	line-height: 16px;
}

.icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	stroke-width: 0;
	stroke: currentColor;
	fill: currentColor;
}

.sign-in-icon,
.home-icon {
	width: 12px;
	height: 12px;
	fill: currentColor;
	margin-right: 3%;
	-webkit-transition-duration: .5s;
	transition-duration: .5s;
}

.icon-home {
	margin-bottom: 1%;
}
</style>
