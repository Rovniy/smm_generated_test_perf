<template>
	<div
		class="carousels-card"
		:class="{
			'carousels-card--center': isCenterCard(index),
			'carousels-card--desktop': !isLandingMobile,
		}">
		<div
			class="carousels-card__header"
			:class="{'carousels-card__header--center': isCenterCard(index)}">
			<h3 class="carousels-card__heading">
				{{ priceKey | separator }}
				{{ $t(serviceTag) | capitalize }}
			</h3>
			<div class="carousels-card__price">
				<Money :amount="cost" />
			</div>
			<div
				v-if="discount"
				class="carousels-card__economy">
				{{ $t('SERVICE_CARD_DISCOUNT_LABEL') }}
				<span>
					<Money
						:amount="discount"
						:has-separator="false" />
				</span>
			</div>
		</div>
		<ul
			class="carousels-card__text carousels-card__body"
			:class="{'carousels-card__body--center': isCenterCard(index)}">
			<template
				v-for="(description, idx) in $t(`${serviceTag.toUpperCase()}_CARD`)">
				<li
					:key="`service-cards-${idx}`"
					aria-hidden="false"
					class="carousels-card__text-item">
					<b v-if="bold(idx)">
						{{ description | capitalize }}
					</b>
					<template v-else>
						{{ description | capitalize }}
					</template>
				</li>
			</template>
		</ul>
		<button
			:class="{'carousels-card__button--inverted': !isCenterCard(index) && !isLandingMobile }"
			class="carousels-card__button"
			@click="$emit('open', service)">
			<svg-icon
				name="icon-cart"
				class="carousels-card__icon-cart" />
			{{ $t('SERVICE_CARD_ORDER_LABEL') | capitalize }}
		</button>
	</div>
</template>

<script>
import {
	mapGetters,
} from 'vuex'

import Money from '~/components/Landing3/Money.vue'

import textFilters from '~/mixins/textFilters.js'

export default {
	name: 'LandingCarouselsCard',
	components: {
		Money,
	},
	mixins: [
		textFilters,
	],
	props: {
		service: {
			type: Object,
			required: true,
			default: () => null,
		},
		priceKey: {
			type: Number,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
			loyaltyCost: 'services/loyaltyCost',
		}),
		currentloyaltyCost() {
			if (!this.servicePlatform || !this.serviceTag || !this.priceKey) {
				return {}
			}

			return this.loyaltyCost(this.serviceTag, this.priceKey, this.servicePlatform.toUpperCase())
		},
		servicePlatform() {
			return this.service?.platform || ''
		},
		cost() {
			return this.currentloyaltyCost?.cost
		},
		discount() {
			return this.currentloyaltyCost?.discount
		},
		serviceTag() {
			return this.service?.tag || ''
		},
	},
	methods: {
		bold(index) {
			return 1 === index && [
				'INSTAGRAM_SUBS_MAIN',
				'YOUTUBE_VIEWS_MAIN',
			].includes(this.serviceTag)
		},
		isCenterCard(index) {
			return 0 === (index + 1) % 2
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-primary:         var(--color-primary, $primary);
$color-secondary:       var(--color-secondary, $secondary);
$bg-image-carousels:    var(--bg-image-carousels);

// breakpoint-name: (padding-top padding-bottom);
$card-vpadding: (
	xs: (42px, 38px),
	sm: (37px, 24px),
	md: (37px, 24px),
	lg: (45px, 42px),
	xl: (44px, 37px),
);

// breakpoint-name: (padding-top padding-bottom);
$card-vpadding-center: (
	md: (33px, 24px),
	lg: (40px, 42px),
	xl: (44px, 44px),
);

// breakpoint-name: (css-property, value);
$card-header-style: (
	xs: (min-height, 138px),
	sm: (min-height, 138px),
	md: (min-height, 138px),
	lg: (min-height, 170px),
	xl: (min-height, 182px),
);

// breakpoint-name: (css-property, value);
$card-header-center-style: (
	lg: (min-height, 170px),
	xl: (min-height, 195px),
);

// breakpoint-name: (css-property, value);
$card-body-style: (
	xs: (min-height, auto, width, 178px),
	sm: (min-height, 176px, width, 167px),
	md: (min-height, 176px, width, 167px),
	lg: (min-height, 194px, width, 181px),
	xl: (min-height, 214px, width, 204px),
);

// breakpoint-name: (css-property, value);
$card-body-center-style: (
	sm: (min-height, 190px),
	md: (min-height, 190px),
	lg: (min-height, 226px, width, 203px),
	xl: (min-height, 235px, width, 225px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$card-heading-text: (
	xs: (16px, 16px, 700, null, min-height, 42px),
	sm: (null, null, null, null, min-height, 42px),
	md: (null, null, null, null, min-height, 42px),
	lg: (18px, 20px, null, null, min-height, 53px),
	xl: (20px, 22px, null, 0, min-height, 52px),
);

// breakpoint-name: (width, ...height, ...css-property, ...value);
$header-width: (
	xs: (170px),
	sm: (170px),
	md: (170px),
	lg: (230px),
	xl: (260px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$price-text: (
	xs: (45px, 45px, 800),
	lg: (60px, 60px, null, 5px),
	xl: (70px, 70px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$economy-text: (
	xs: (14px, 22px, 500),
	lg: (18px),
	xl: (20px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$button-text: (
	xs: (12px, 14px, 700),
	lg: (14px, 17px),
	xl: (16px, 20px),
);

// breakpoint-name: (css-property, value);
$button-style: (
	xs: (min-width, 156px, height, 35px),
	lg: (min-width, 178px, height, 40px),
	xl: (min-width, 203px, height, 46px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$card-text: (
	xs: (14px, 25px),
	md: (13px),
	lg: (16px, 28px),
	xl: (18px),
);

// breakpoint-name: (width, ...height, ...css-property, ...value);
$icon-check-size: (
	xs: (12px, 9px),
	md: (11px, 8px),
	lg: (12px, 10px),
	xl: (13px, 10px),
);

// breakpoint-name: (width, ...height, ...css-property, ...value);
$icon-cart-size: (
	xs: (14px, 14px),
	lg: (16px, 16px),
	xl: (19px, 19px),
);

.carousels-card {
	$self: &;

	color: $base-color;
	background: #FFF;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 0 $carousels-card-shadow-offset rgba(0, 0, 0, .1);
	margin: $carousels-card-shadow-offset;
	padding-left: 24px;
	padding-right: 24px;

	@include media-size($carousels-card-width);
	@include media-vpadding($card-vpadding);

	// mobile
	@include media-breakpoint-up(md) {}

	// desktop
	&#{$self}--desktop {

		// do not break on lower resolutions if device type determiantion went wrong
		@include media-down(xs) {
			&:not(#{$self}--center) {
				display: none;
			}
		}
		@include media-down(sm) {
			width: $g-carousels-desktop-min-width;
		}

		@include media-breakpoint-up(sm) {
			margin-top: 48px;
			margin-bottom: 47px;

			&:first-child {
				&:not(:only-child) {
					margin-left: $carousels-card-shadow-offset;
					margin-right: $carousels-card-side-offset;
				}
			}

			&:last-child {
				&:not(:only-child) {
					margin-left: $carousels-card-side-offset;
					margin-right: $carousels-card-shadow-offset;
				}
			}
		}
		@include media-breakpoint-up(xl) {
			margin-top: 58px;
			margin-bottom: 58px;
		}

		&#{$self}--center {
			z-index: 2;
			@include media-size($carousels-card-width-center);
			@include media-vpadding($card-vpadding-center);

			@include media-breakpoint-up(sm) {
				margin: 35px 0;
			}
		}
	}

	&__header {
		position: relative;
		text-align: center;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			border-bottom: 1px solid #D1DCE8;

			@include media-size($header-width);
		}

		@include media-style($card-header-style);

		&--center {
			@include media-style($card-header-center-style);
		}
	}

	&__heading {
		@include media-text($card-heading-text);

		text-transform: capitalize;
	}

	&__price {
		color: $color-primary;
		white-space: nowrap;

		@include media-text($price-text);
	}

	&__economy {
		text-transform: lowercase;
		color: #000;

		@include media-text($economy-text);
	}

	&__body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 20px;
		margin-bottom: 20px;
		@include media-style($card-body-style);

		&--center {
			@include media-style($card-body-center-style);
		}
	}

	&__button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #2674bd;
		color: $white;
		border: 2px solid transparent;
		border-radius: 250px;
		box-shadow: 0 7px 10px rgba(0, 0, 0, .25);
		transition: $transition-fast;

		&:hover {
			border-color: $body-color !important;
			background: $body-color !important;
			color: $white !important;
		}

		font-family: $ff-gilroy;

		@include media-text($button-text);
		@include media-style($button-style);
	}

	&__button--inverted {
		background: $white;
		color: #2674bd;
		border-color: #2674bd;
		box-shadow: none;
	}

	&__icon-cart {
		margin-right: 14px;
		@include media-size($icon-cart-size);
	}

	&__text {
		@include media-text($card-text);
	}

	&__text-item {
		position: relative;
		padding-left: 20px;

		&::before {
			position: absolute;
			top: 10px;
			left: 0;
			content: '';
			display: inline-block;
			height: 5px;
			width: 9px;
			border-style: solid;
			border-width: 3px 3px 0 0;
			border-radius: 2px;
			transform: rotate(135deg) translateY(40%);
			margin-right: 3px;
		}
	}
}
</style>
