<template>
	<button
		class="promo-button3"
		:class="{ 'promo-button3--dark': data.isDark }"
		@click="scrollTo('#services')">
		<component
			:is="IconComponent"
			class="promo-button3__icon" />
		{{ data.text }}
	</button>
</template>

<script>
import ScrollTo from '~/mixins/scrollTo.js'

export default {
	name: 'LandingPromoButton',
	mixins: [
		ScrollTo,
	],
	props: {
		data: {
			type: Object,
			default() {
				return {
					text: '',
					platform: 'instagram',
					isDark: false,
				}
			},
		},
	},
	computed: {
		pagePlatform() {
			return this.data.platform.toLowerCase()
		},
		IconComponent() {
			return () => import(`~/assets/svg/landing3/${this.pagePlatform}/icon-promo-button.svg?inline`)
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-primary:         var(--color-primary, $primary);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom, random-css-property, value);
$button-text: (
	xs: (14px, 17px, 700),
	md: (18px, 22px),
);

// breakpoint-name: (random-css-property, value, ...);
$button-style: (
	xs: (padding, 0 24px, min-height, 36px),
	md: (padding, 0 30px, min-height, 48px),
);

.promo-button3 {
	$self: &;

	display: flex;
	justify-content: center;
	align-items: center;
	background: $white;

	color: #2674bd;
	white-space: nowrap;
	border-radius: 250px;
	box-shadow: 0 7px 10px rgba(0, 0, 0, .1);
	transition: $transition-fast;

	&:hover {
		background: $body-color !important;
		color: $white !important;
	}

	font-family: $ff-gilroy;

	@include media-text($button-text);
	@include media-style($button-style);

	&--dark {
		color: $base-color;
	}

	&__icon {
		@include media-breakpoint-down(sm) {
			width: 21px;
			height: auto;
		}

		margin-right: 11px;
	}
}
</style>
