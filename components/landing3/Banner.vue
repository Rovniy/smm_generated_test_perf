<template>
	<article class="banner3">
		<div class="banner3__container">
			<div class="banner3__text-container">
				<h1 class="banner3__heading">
					{{ data.heading1 }}
					<br>
					{{ data.heading2 }}
				</h1>
				<div class="banner3__paragraph">
					{{ data.text1 }}
				</div>
				<PromoButton
					v-show="!isLandingMobile"
					:data="promoButton"
					class="banner3__promo-button" />
			</div>
			<slot />
		</div>
	</article>
</template>

<script>
import {
	mapGetters,
} from 'vuex'

import PromoButton from '~/components/Landing3/PromoButton.vue'

import ScrollTo from '~/mixins/scrollTo.js'

export default {
	name: 'LandingBanner',
	components: {
		PromoButton,
	},
	mixins: [
		ScrollTo,
	],
	props: {
		data: {
			type: Object,
			required: true,
			default() {
				return {
					heading1: '',
					heading2: '',
					text1: '',
				}
			},
		},
		promoButton: {
			type: Object,
			required: true,
			default() {
				return {
					text: '',
					platform: 'instagram',
					icon: null,
				}
			},
		},
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
		}),
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$bg-image-banner:   var(--bg-image-banner);

// breakpoint-name: (width, ...height, ...css-property, ...value);
$banner-size: (
	xs: (null, 688px, padding-top, 125px),
	md: (null, 784px, padding-top, 150px),
	lg: (null, 866px, padding-top, 235px),
	xl: (null, 925px, padding-top, 219px),
);

// breakpoint-name: (css-property, value);
$text-container-style: (
	md: (flex-basis, 391px),
	lg: (flex-basis, 520px),
	xl: (flex-basis, 670px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom, random-css-property, value);
$heading-text: (
	xs: (25px, 32px, 800, 18px),
	md: (32px, 38px, null, 24px),
	lg: (42px, 50px, null, 40px),
	xl: (50px, 55px, null, 30px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom, random-css-property, value);
$paragraph-text: (
	xs: (14, 20, null, null, width, 72%),
	md: (null, null, null, 42px, width, 70%),
	lg: (18px, 28px, null, 39px, width, 90%),
	xl: (20px, 28px, null, 39px, width, 80%),
);

.banner3 {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: linear-gradient(45.94deg, #407BFF -3.82%, #A383FF 95.71%) center top / cover no-repeat;
	background-image: $bg-image-banner;
	color: $white;
	text-align: center;
	min-height: 100vh;
	@include media-breakpoint-up(xl) {
		min-height: auto;
	}

	@include media-size($banner-size);

	&__container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		@include make-container();

		@include media-breakpoint-up(md) {
			@include make-container-max-widths();

			flex-direction: row;
			align-items: flex-start;
			text-align: left;
		}
	}

	&__text-container {
		@include media-style($text-container-style);
	}

	&__heading {
		@include media-text($heading-text);
	}

	&__paragraph {
		display: inline-block;
		font-family: $ff-gotham;
		@include media-text($paragraph-text);
	}

	&__promo-button {
		@include media-down(sm) {
			margin: 30px auto 0;
			display: none;
		}
	}
}
</style>
