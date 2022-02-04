<template>
	<div
		class="features3-item"
		:class="{ 'features3-item--desktop': !isLandingMobile }">
		<div class="features3-item__holder-icon">
			<!-- <nuxt-img
        class="features3-item__icon"
        :src="`svg/landing3/${iconName}`"
        :width="item.iconW"
        :height="item.iconH"
        loading="lazy"
      /> -->
			<div
				class="features3-item__icon"
				:class="`features3-item__icon--${item.icon}`" />
		</div>
		<div class="features3-item__holder-text">
			<h3 class="features3-item__heading">
				{{ item.title | capitalize }}
			</h3>
			<p>{{ item.text }}</p>
		</div>
	</div>
</template>

<script>
import {
	mapGetters,
} from 'vuex'

import textFilters from '~/mixins/textFilters.js'

export default {
	mixins: [
		textFilters,
	],
	props: {
		item: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	computed: {
		...mapGetters('responsive', [
			'isLandingMobile',
		]),
		iconName() {
			return this.isLandingMobile
				? `${this.item.icon}-xs.svg`
				: `${this.item.icon}-sm.svg`
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom, random-css-property, value);
$heading-text: (
	xs: (16px, 19px, 600, 7px),
	lg: (18px, 22px, null, 13px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom, random-css-property, value);
$paragraph-text: (
	xs: (14px, 18px),
	lg: (15px),
);

// breakpoint-name: (padding-top padding-right padding-bottom padding-left);
$item-padding: (
	xs: (16px 20px 16px 20px),
	md: (25px 25px 25px 25px),
	lg: (27px 32px 28px 32px),
	xl: (27px 19px 27px 19px),
);

// breakpoint-name: (css-property, value);
$holder-text-style: (
	xs: (margin-left, 17px),
	md: (margin-left, 24px),
	xl: (margin-left, 17px),
);

// breakpoint-name: (css-property, value);
$holder-icon-style: (
	xs: (flex-basis, 20%),
	lg: (flex-basis, 16%),
	xl: (flex-basis, 20%),
);

.features3-item {
	$self: &;

	display: flex;
	border-radius: 10px;
	overflow-wrap: anywhere;

	@include media-padding($item-padding);

	&#{$self}--desktop {
		background: $white;
	}

	&__holder-icon {
		text-align: right;
		@include media-style($holder-icon-style);
	}

	&__icon {
		transform: scale(.858);

		@include media-breakpoint-up(md) {
			transform: scale(1);
		}

		$feature-icons: (
			feature1 : (56px, 57px),
			feature2 : (56px, 46px),
			feature3 : (59px, 57px),
			feature4 : (47px, 50px),
			feature5 : (59px, 47px),
			feature6 : (53px, 47px),
		);

		background-repeat: no-repeat;

		@each $icon, $size in $feature-icons {
			&--#{$icon} {
				background-image: url('~assets/svg/landing3/#{$icon}-img-xs.svg');

				#{$self}--desktop & {
					background-image: url('~assets/svg/landing3/#{$icon}-img-sm.svg');
				}

				width: nth($size, 1);
				height: nth($size, 2);
			}
		}
	}

	&__holder-text {
		flex: 1;
		@include media-style($holder-text-style);

		color: $white;
		#{$self}--desktop & {
			color: $body-color;
		}

		p {
			@include media-text($paragraph-text);
		}
	}

	&__heading {
		@include media-text($heading-text);
	}
}
</style>
