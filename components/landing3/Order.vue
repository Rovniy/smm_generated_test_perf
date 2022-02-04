<template>
	<popup @close="unsetService">
		<form
			class="order"
			novalidate
			autocomplete="off"
			@submit.prevent="submit">
			<fieldset :disabled="pending">
				<h3
					class="order__heading"
					:class="{ 'order__heading--offset': !subTitle }">
					{{ title }}
				</h3>
				<div
					v-if="subTitle"
					class="order__sub-heading">
					{{ $t(subTitle) }}
				</div>
				<div class="order__holder">
					<div
						v-if="'INSTAGRAM_LIKES_MAIN' === service.tag"
						class="order__row">
						<OrderSelect
							:value="numerosity"
							:list="numerosities"
							@input="setOrderSelect" />
					</div>
					<div
						class="order__row"
						:class="{
							'is-error': fieldError('urlLogin'),
							'is-valid': fieldValid('urlLogin')
						}">
						<div
							class="order__field"
							:class="{ 'order__field--postfix': urlLogin !== '' }">
							<div class="order__prefix">
								<svg-icon
									:name="`order-${platformLow}`"
									:class="`svg-sprite--order-${platformLow}`" />
							</div>
							<input
								ref="urlLogin"
								v-model.trim="urlLogin"
								class="order__input-text"
								:placeholder="`${$t(labelUrlLogin)}*`"
								@paste="onPaste('urlLogin'); switchService($event)"
								@input="replaceSpace('urlLogin'); onInput('urlLogin')"
								@blur="validateNotEmptyField('urlLogin'); switchService()">
							<div
								class="order__postfix"
								@click="clearField('urlLogin')">
								<img
									src="~assets/svg/order/cancel.svg"
									width="18"
									height="18"
									alt="cancel">
							</div>
						</div>
						<div class="order__error">
							{{ fieldErrorHint('urlLogin') }}
						</div>
					</div>

					<div
						v-if="isAuto || isMultiple"
						class="order__row"
						:class="{
							'is-error': fieldError('postQuantity'),
							'is-valid': fieldValid('postQuantity')
						}">
						<div class="order__field">
							<div class="order__prefix">
								<svg-icon
									name="order-posts"
									class="svg-sprite--order-posts" />
							</div>
							<input
								ref="postQuantity"
								v-model.number="postQuantity"
								v-mask="'########'"
								class="order__input-text"
								:placeholder="`${$t(labelPostQuantity)}*`"
								@input="onInput('postQuantity')"
								@blur="validateNotEmptyField('postQuantity')">
						</div>
						<div class="order__error">
							{{ fieldErrorHint('postQuantity') }}
						</div>
					</div>

					<div
						class="order__row"
						:class="{
							'is-error': fieldError('quantity'),
							'is-valid': fieldValid('quantity')
						}">
						<div class="order__field">
							<div class="order__prefix">
								<svg-icon
									:name="`order-${serviceType}`"
									:class="`svg-sprite--order-${serviceType}`" />
							</div>
							<input
								ref="quantity"
								v-model.number="quantity"
								v-mask="'########'"
								class="order__input-text"
								:placeholder="`${$t(labelQuantity)}*`"
								@input="onInput('quantity')"
								@blur="validateNotEmptyField('quantity')">
						</div>
						<div class="order__error">
							{{ fieldErrorHint('quantity') }}
						</div>
					</div>
				</div>
				<div class="order__total">
					<div class="order__total-holder">
						{{ $t('price_1') }}:
						<div class="order__total-cost">
							<money :amount="orderCost[0]" />
						</div>
					</div>
					{{ $t('third_party_short') }}
				</div>
				<button
					tabindex="10"
					class="order__button"
					:class="{ 'is-loading': pending }">
					{{ $t('go') }}
				</button>
			</fieldset>
		</form>
	</popup>
</template>

<script>
import {
	mapGetters,
	mapActions,
} from 'vuex'
import { validationMixin } from 'vuelidate'
import { mask } from 'vue-the-mask'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import Money from '~/components/_library/Money.vue'
import Popup from '~/components/_library/Popup.vue'
import OrderSelect from '~/components/Landing3/OrderSelect.vue'

import {
	MAIN_VALIDATION,
} from '~/app/serviceConfig.js'

import CurrentUrl from '~/mixins/currentUrl.js'
import Currency from '~/mixins/currency.js'
import notification from '~/mixins/notification.js'
import OrderValidation from '~/mixins/orderValidation.js'
import gclid from '~/mixins/gclid.js'
import gtmEvent from '~/mixins/gtmEvent.js'
import orderCostWatchers from '~/mixins/orderCostWatchers.js'
import switchService from '~/mixins/switchService.js'

export default {
	name: 'LandingOrder',
	components: {
		Money,
		Popup,
		OrderSelect,
	},
	directives: {
		mask,
	},
	mixins: [
		validationMixin,
		CurrentUrl,
		Currency,
		notification,
		OrderValidation,
		gclid,
		gtmEvent,
		orderCostWatchers,
		switchService,
	],
	data() {
		return {
			pending: false,
			urlLogin: '',
			quantity: '',
			postQuantity: '',
		}
	},
	computed: {
		...mapGetters({
			isAuto: 'services/isAuto',
			isMultiple: 'services/isMultiple',
			numerositiedService: 'services/numerositiedService',
			numerositiedTag: 'services/numerositiedTag',
			numerosities: 'services/numerosities',
			numerosity: 'services/numerosity',
			orderCost: 'services/orderCost',
			platformLow: 'services/platformLow',
			region: 'locale/region',
			service: 'services/service',
			tag: 'services/tag',
			typedServices: 'services/typedServices',
			validationMin: 'services/validationMin',
			validationMax: 'services/validationMax',
		}),
		serviceType() {
			return this.labelQuantity.split('_').pop()
		},
		labelUrlLogin() {
			switch (this.numerositiedTag) {
				case 'INSTAGRAM_LIKES_MAIN':
				case 'VK_LIKES_MAIN':
				case 'VK_COMMENTS_MAIN':
				case 'VK_REPOSTS_MAIN':
					return 'labelUrlLogin_post' // Ссылка на публикацию
				case 'INSTAGRAM_VIEWS_VIDEO_MAIN':
				case 'TIKTOK_LIKES_MAIN':
				case 'TIKTOK_VIEWS_MAIN':
				case 'TIKTOK_REPOSTS_MAIN':
				case 'YOUTUBE_LIKES_MAIN':
				case 'YOUTUBE_VIEWS_MAIN':
					return 'labelUrlLogin_video' // Ссылка на видео
				case 'VK_SUBS_MAIN':
					return 'labelUrlLogin_login_or_group_vk' // Логин или ссылка на группу
				case 'INSTAGRAM_VIEWS_STORY_MAIN':
					return 'labelUrlLogin_login_or_account_or_story' // Логин или ссылка на аккаунт/историю
					// case 'INSTAGRAM_SUBS_MAIN':
					// case 'INSTAGRAM_AUTO_VIEWS_MAIN':
					// case 'INSTAGRAM_AUTO_LIKES_MAIN':
					// case 'INSTAGRAM_MULTI_LIKES_MAIN':
					// case 'TIKTOK_SUBS_MAIN':
					// case 'TIKTOK_AUTO_VIEWS_MAIN':
					// case 'TIKTOK_AUTO_LIKES_MAIN':
					// case 'YOUTUBE_SUBS_MAIN':
					// case 'VK_FRIENDS_MAIN':
					// case 'VK_AUTO_LIKES_MAIN':
				default:
					return 'labelUrlLogin_login_or_account' // Логин или ссылка на аккаунт
			}
		},
		labelQuantity() {
			switch (this.numerositiedTag) {
				case 'INSTAGRAM_LIKES_MAIN':
				case 'INSTAGRAM_MULTI_LIKES_MAIN':
				case 'INSTAGRAM_AUTO_LIKES_MAIN':
				case 'VK_LIKES_MAIN':
				case 'VK_AUTO_LIKES_MAIN':
					return 'labelQuantity_auto_likes' // Сколько хотите лайков на пост?
				case 'YOUTUBE_LIKES_MAIN':
				case 'TIKTOK_LIKES_MAIN':
				case 'TIKTOK_AUTO_LIKES_MAIN':
					return 'labelQuantity_video_likes' // Сколько хотите лайков на видео?
				case 'INSTAGRAM_VIEWS_VIDEO_MAIN':
				case 'TIKTOK_VIEWS_MAIN':
				case 'YOUTUBE_VIEWS_MAIN':
				case 'INSTAGRAM_AUTO_VIEWS_MAIN':
				case 'TIKTOK_AUTO_VIEWS_MAIN':
					return 'labelQuantity_video_views' // Сколько хотите просмотров на видео?
				case 'INSTAGRAM_SUBS_MAIN':
				case 'TIKTOK_SUBS_MAIN':
				case 'VK_SUBS_MAIN':
				case 'YOUTUBE_SUBS_MAIN':
					return 'label_quantity_subs' // Сколько хотите подписчиков?
				case 'TIKTOK_REPOSTS_MAIN':
				case 'VK_REPOSTS_MAIN':
					return 'label_quantity_reposts' // Сколько хотите репостов?
				case 'INSTAGRAM_VIEWS_STORY_MAIN':
					return 'label_quantity_story_views' // Сколько хотите просмотров историй?
				case 'VK_FRIENDS_MAIN':
					return 'labelQuantity_subs_or_friends' // Сколько хотите друзей/ подписчиков?
				case 'VK_COMMENTS_MAIN':
					return 'label_quantity_comments' // Сколько хотите комментариев?
				default:
					return 'label_quantity_default' // Количество
			}
		},
		labelPostQuantity() {
			switch (this.tag) {
				case 'TIKTOK_AUTO_VIEWS_MAIN':
				case 'TIKTOK_AUTO_LIKES_MAIN':
					return 'labelPostQuantity_future_videos' // Количество будущих видео?
				default:
					return this.isAuto
						? 'label_quantity_future_posts'
						: 'label_quantity_posts'
			}
		},
		title() {
			switch (this.tag) {
				case 'INSTAGRAM_SUBS_MAIN':
				case 'INSTAGRAM_LIKES_MAIN':
				case 'INSTAGRAM_VIEWS_VIDEO_MAIN':
				case 'INSTAGRAM_AUTO_VIEWS_MAIN':
				case 'INSTAGRAM_AUTO_LIKES_MAIN':
				case 'INSTAGRAM_VIEWS_STORY_MAIN':
				case 'TIKTOK_VIEWS_MAIN':
				case 'TIKTOK_LIKES_MAIN':
				case 'TIKTOK_SUBS_MAIN':
				case 'TIKTOK_AUTO_LIKES_MAIN':
				case 'TIKTOK_AUTO_VIEWS_MAIN':
				case 'TIKTOK_REPOSTS_MAIN':
				case 'VK_LIKES_MAIN':
				case 'VK_SUBS_MAIN':
				case 'VK_FRIENDS_MAIN':
				case 'VK_COMMENTS_MAIN':
				case 'VK_AUTO_LIKES_MAIN':
				case 'VK_REPOSTS_MAIN':
				case 'YOUTUBE_SUBS_MAIN':
				case 'YOUTUBE_LIKES_MAIN':
				case 'YOUTUBE_VIEWS_MAIN':
					return this.$t(`${this.tag}_HEAD`)
				default:
					return this.$t('MAIN_HEAD')
			}
		},
		subTitle() {
			switch (this.tag) {
				case 'INSTAGRAM_AUTO_LIKES_MAIN':
					return 'SUB_TITLE_INSTAGRAM_AUTO_LIKES'
				case 'INSTAGRAM_AUTO_VIEWS_MAIN':
					return 'SUB_TITLE_INSTAGRAM_AUTO_VIEWS'
				case 'VK_AUTO_LIKES_MAIN':
					return 'SUB_TITLE_VK_AUTO_LIKES_MAIN'
				case 'TIKTOK_AUTO_VIEWS_MAIN':
					return 'SUB_TITLE_TIKTOK_AUTO_VIEWS_MAIN'
				case 'TIKTOK_AUTO_LIKES_MAIN':
					return 'SUB_TITLE_TIKTOK_AUTO_LIKES_MAIN'
				case 'VK_SUBS_MAIN':
					return 'SUB_TITLE_VK_SUBS_MAIN'
				case 'VK_FRIENDS_MAIN':
					return 'SUB_TITLE_VK_FRIENDS_MAIN'
				default:
					return ''
			}
		},
		requestDefaults() {
			const sbjsCurrent = this.$sbjs.get.current
			const utm = {
				utm_source: sbjsCurrent.src || null,
				utm_medium: sbjsCurrent.mdm || null,
				utm_campaign: sbjsCurrent.cmp || null,
				utm_content: sbjsCurrent.cnt || null,
				utm_term: sbjsCurrent.trm || null,
				gclid: this.$cookiz.get('new_gclid') || null,
			}
			let refCode = this.$cookiz.get('smmtouch_ref_token') || null
			const { ref } = this.$route.query
			if (!refCode && ref) {
				refCode = ref
				this.$cookiz.set('smmtouch_ref_token', refCode)
			}
			const successUrl = new URL(this.currentOrigin)
			successUrl.searchParams.append('action', 'PaymentSuccess')
			const cancelUrl = new URL(this.currentOrigin)
			cancelUrl.searchParams.append('action', 'PaymentCancel')
			const token = this.$auth.getToken(this.$auth.strategy.name)
			const autoToken = this.$cookiz.get('auto_token')
			return {
				auto_token: (token && token.replace('Bearer ', '')) || autoToken || null,
				cancel_url: cancelUrl.toString(),
				description: this.$t(`${this.numerositiedTag}_HEAD`),
				locale: this.$i18n.locale,
				origin: window.location.href,
				ref_code: refCode,
				region_value: this.region,
				session_id: this.$cookiz.get('__ga') || null,
				success_url: successUrl.toString(),
				utm,
			}
		},
		urlLoginKey() {
			switch (this.numerositiedTag) {
				case 'INSTAGRAM_SUBS_MAIN':
				case 'INSTAGRAM_MULTI_LIKES_MAIN':
				case 'INSTAGRAM_AUTO_LIKES_MAIN':
				case 'INSTAGRAM_AUTO_VIEWS_MAIN':
				case 'INSTAGRAM_VIEWS_STORY_MAIN':
				case 'TIKTOK_SUBS_MAIN':
				case 'TIKTOK_AUTO_LIKES_MAIN':
				case 'TIKTOK_AUTO_VIEWS_MAIN':
				case 'VK_SUBS_MAIN':
				case 'VK_FRIENDS_MAIN':
				case 'VK_AUTO_LIKES_MAIN':
					return 'login'
				default:
					return 'link'
			}
		},
		requestTagged() {
			const request = {
				[this.urlLoginKey]: this.urlLogin.replace(/^@/, ''),
			}
			if (this.isMultiple || this.isAuto) {
				request.posts = this.postQuantity
			}
			if (this.isAuto && this.isInstagram) {
				request.min = this.quantity
				request.max = this.quantity
			}
			else {
				request.count = this.quantity
			}
			return request
		},
		tabOrder() {
			return {
				urlLogin: 0,
				postQuantity: 1,
				quantity: 2,
			}
		},
	},
	validations() {
		return MAIN_VALIDATION(
			this.numerositiedTag,
			this.validationMin,
			this.validationMax,
		)
	},
	beforeMount() {
		window.addEventListener(
			'keydown',
			this.onKeydown,
		)
	},
	mounted() {
		if (document.body.clientWidth >= 768) {
			this.focusPokus(/* first element */)
		}
		this.sendGTMEvent('order_form_open', this.service.platform)
	},
	beforeDestroy() {
		window.removeEventListener(
			'keydown',
			this.onKeydown,
		)
	},
	methods: {
		...mapActions({
			netOrderCost: 'services/netOrderCost',
			netServices: 'services/netServices',
			setNumerosity: 'services/setNumerosity',
			setService: 'services/setService',
			unsetService: 'services/unsetService',
		}),
		storeOrder(paymentId) {
			const quantity = this.quantity * (this.postQuantity || 1)
			const products = {
				platform: this.service.platform,
				name: this.title,
				quantity,
				price: this.orderCost[0] / quantity,
			}
			if ('undefined' === typeof localStorage) {
				this.$cookiz.set('payment_id', paymentId)
				this.$cookiz.set(paymentId, JSON.stringify(products))
			}
			else {
				localStorage.setItem('payment_id', paymentId)
				localStorage.setItem(paymentId, JSON.stringify(products))
			}
		},
		async submit() {
			this.$v.$touch()
			try {
				if (this.$v.$invalid) {
					this.focusPokus(null /* first error focus */)
					// send sentry validation message with extra data
					this.$sentry.captureMessage(`Payform validation error ${Date.now()}`, {
						extra: {
							tag: this.numerositiedTag,
							urlLogin: this.urlLogin,
							quantity: this.quantity,
							postQuantity: this.postQuantity,
						},
					})
					return
				}
			}
			finally {
				this.sendGTMEvent('order_form_invalid', this.service.platform)
			}
			if (this.pending) {
				return
			}
			this.pending = true
			try {
				const response = await this.$http.order({
					...this.requestDefaults,
					...this.requestTagged,
					tag: this.numerositiedTag,
				})
				if (response.status !== 'success') {
					throw response
				}
				const paymentId = get(response, 'data.payment_session.id', undefined)
				this.storeOrder(paymentId)
				this.$cookiz.set(
					'auto_token',
					response.data.auto_token,
				)
				this.sendGTMEvent('order_form_submit', this.service.platform)
				window.location.assign(response.data.payment_session.url)
			}
			catch (e) {
				this.sendGTMEvent('order_form_invalid', this.service.platform)
				const message = e.message.toLowerCase()
				if (message.includes('login invalid or private')) {
					this.notification(
						this.$t('ERROR_ALERT'),
						this.$t('login_error'),
						'error',
					)
				}
				else if (message.includes('invalid instagram link')) {
					this.notification(
						this.$t('ERROR_ALERT'),
						this.$t('post_error'),
						'error',
					)
				}
				else if (message.includes('not enough posts')) {
					const postNum = message.match(/: (\d)+ </)
					this.notification(
						this.$t('ERROR_ALERT'),
						this.$t('post_quantity_error')
							.replace('{POST_NUM}', postNum[1]),
						'error',
					)
				}
				else if (message.startsWith('service temporary unavailable')) {
					this.notification(
						this.$t('SERVICE_UNAVAILABLE'),
						'',
						'error',
					)
				}
				else {
					this.notification(
						this.$t('ERROR_ALERT'),
						this.$t('server_error'),
						'error',
					)
				}
				console.error(e)
			}
			finally {
				this.pending = false
			}
		},
		validateField(field) {
			this.$v[field]?.$touch()
		},
		validateNotEmptyField(field) {
			this[field] && this.validateField(field)
		},
		replaceSpace(field) {
			if ('string' === typeof this[field]) {
				this[field] = this[field].replace(/\s/g, '') // replace spaces
			}
		},
		onPaste: debounce(function(field) {
			this.validateField(field)
			if (this.fieldValid(field)) {
				this.focusPokus(true)
			}
		}, 50),
		onInput: debounce(function(field) {
			this.validateNotEmptyField(field)
		}, 500),
		onKeydown(event) {
			if (9 === event.keyCode) { // tab
				event.preventDefault()
				this.focusPokus(!event.shiftKey)
				return
			}
			if (27 === event.keyCode) { // esc
				this.unsetService()
			}
		},
		focusPokus(x) {
			const keys = Object.keys(this.serviceConfig).sort((a, b) => this.tabOrder[a] - this.tabOrder[b])
			if ('object' === typeof x) { // null or any other object argument focuses first error
				this.$refs[keys.find(key => this.$v[key]?.$error)]?.focus()
			}
			else {
				let index = 0
				if ('boolean' === typeof x) { // boolean argument moves focus: true -> next, false -> prev
					index = keys.findIndex(key => this.$refs[key] === document.activeElement)
					index = (index !== -1) && ((index + (x ? 1 : -1) + keys.length) % keys.length)
				}
				this.$refs[keys[+index]]?.focus() // no argument sets focus on first field
			}
		},
		clearField(field) {
			this[field] = ''
			this.$refs[field]?.focus()
			this.$v[field]?.$reset()
		},
		setOrderSelect(event) {
			this.setNumerosity(event)
			this.focusPokus(true)
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-base: #213242;
$color-primary: var(--color-primary, $primary);

.order {
	$self: &;

	color: $color-base;
	text-align: center;
	font-size: rem(14px);
	line-height: rem(16px);

	&__holder {
		font-size: rem(13px);
		@include up(xs2) {
			font-size: rem(14px);
		}
	}

	&__heading {
		font-weight: 700;
		font-size: rem(22px);
		line-height: rem(27px);
		text-align: center;
		margin-bottom: 12px;

		&--offset {
			margin-bottom: 54px;
			@include media-up(md) {
				margin-bottom: 42px;
			}
		}
	}

	&__sub-heading {
		line-height: rem(19px);
		padding-bottom: 32px;
	}

	& &__button {
		font-family: $ff-gilroy;
		font-weight: 500;
		background: $color-primary;
		color: $white;
		height: 44px;
		width: 100%;
		border-radius: 500px;

		font-size: rem(12px);

		display: flex;
		align-items: center;
		justify-content: center;

		position: relative;

		transition: $transition-fast;

		&:focus,
		&:hover {
			box-shadow: 0 0 10px 18px rgba(63, 157, 248, 0.08);
		}

		&:before {
			content: '';
			display: inline-block;
			background: url('~assets/svg/order/card.svg');
			width: 15px;
			height: 12px;
			margin-right: 6px;
		}

		&.is-loading {
			&::before {
				width: 20px;
				height: 20px;
				animation: rotate 1s linear infinite;
				background: url('~assets/svg/loading.svg');
			}
		}

		&-icon {
			margin-right: 4px;
			animation: rotate 1s linear infinite;

			@keyframes rotate {
				from {
					transform: rotate(-180deg);
				}
			}
		}
	}

	&__hr {
		font-weight: 600;
		font-size: rem(11px);
		margin-bottom: 16px;
		text-transform: uppercase;
		position: relative;
		padding: 0 14px;

		&:before,
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			right: calc(50% + 20px);
			height: 1px;

			background: $color-gray;
		}

		&:after {
			left: calc(50% + 20px);
			right: 0;
		}
	}

	&__total {
		text-transform: uppercase;
		margin-top: 38px;
		margin-bottom: 36px;
		font-size: rem(11px);
		line-height: rem(14px);
		color: #797979;

		&-holder {
			font-weight: 700;
			font-size: rem(14px);
			line-height: rem(18px);
			border-bottom: 1px solid $color-primary;
			margin-bottom: 6px;
			padding-bottom: 6px;
			color: $color-base;

			display: flex;
			justify-content: space-between;
		}

		&-cost {
			color: $color-primary;
			font-size: rem(15px);
		}
	}

	&__bottom {
		display: flex;
		justify-content: space-between;

		&-button {
			flex: 1;

			border: 1px solid $color-gray;
			border-radius: 4px;

			height: 40px;

			display: flex;
			align-items: center;
			justify-content: center;

			transition: $transition-fast;

			&:hover {
				border-color: $color-primary;
			}

			&:not(:last-child) {
				margin-right: 18px;
			}
		}
	}

	&__field {
		height: 45px;
		width: 100%;
		position: relative;

		&--postfix {
			#{$self}__postfix {
				display: flex;
			}

			#{$self}__input-text {
				padding-right: 40px;
			}
		}
	}

	&__input-text {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: transparent;

		appearance: none; // remove device specific styles

		font: inherit;
		color: $color-base;
		padding: 0 10px 0 48px;
		border: 1px solid $color-gray;
		border-radius: 5px;

		transition: $transition-fast;

		&::placeholder {
			color: #797979;
		}

		&:hover {
			border-color: #c0c4cc;
		}

		&:focus {
			border-color: $color-primary;
			box-shadow: 0 0 15px rgba(38, 145, 244, 0.15);
		}
	}

	&__prefix {
		position: absolute;
		top: 0;
		left: 0;
		width: 48px;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;

		color: $color-primary;
	}

	&__postfix {
		display: none;

		cursor: pointer;
		position: absolute;
		width: 38px;
		height: 100%;
		right: 0;
		top: 0;
		transition: $transition-fast;

		align-items: center;
		justify-content: center;

		color: $color-gray;

		&:hover {
			opacity: .6;
		}
	}

	&__row {
		margin-bottom: 20px;
		@include media-up(md) {
			margin-bottom: 17px;
		}

		&.is-error {
			#{$self}__error {
				display: block;
			}

			#{$self}__prefix {
				color: $color-red !important;
			}

			#{$self}__input-text {
				border-color: $color-red;
			}
		}

		&.is-valid {
			#{$self}__input-text {
				border-color: $color-green;
			}

			#{$self}__prefix {
				color: $color-green;
			}
		}
	}

	&__error {
		display: none;
		margin-top: 8px;
		margin-bottom: 3px;
		text-align: left;
		color: $color-red;
		padding-left: 18px;

		&-link {
			border-bottom: 1px solid $color-red;

			&:hover {
				border-color: transparent;
			}
		}
	}
}
</style>

<i18n
	locale="ru"
	lang="yaml"
	src="~/app/locale/components/cp/order/ru-RU.yml"
/>
<i18n
	locale="en"
	lang="yaml"
	src="~/app/locale/components/cp/order/en-US.yml"
/>
<i18n
	locale="es"
	lang="yaml"
	src="~/app/locale/components/cp/order/es-ES.yml"
/>
<i18n
	locale="pt"
	lang="yaml"
	src="~/app/locale/components/cp/order/pt-PT.yml"
/>
<i18n
	locale="tr"
	lang="yaml"
	src="~/app/locale/components/cp/order/tr-TR.yml"
/>
<i18n
	locale="de"
	lang="yaml"
	src="~/app/locale/components/cp/order/de-DE.yml"
/>
<i18n
	locale="it"
	lang="yaml"
	src="~/app/locale/components/cp/order/it-IT.yml"
/>
