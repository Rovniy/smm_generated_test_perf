<template>
	<LandingSection
		:heading="$t('features_header')"
		class="features3">
		<hooper
			v-if="isLandingMobile"
			class="hooper--inverted"
			:settings="hooperSettings">
			<slide
				v-for="(slide, index) in features"
				:key="`fetures-slide-${index}`"
				aria-hidden="false">
				<FeaturesItem
					v-for="(item, index2) in features[index]"
					:key="`features-item-${index2}`"
					:item="item" />
				<PromoButton
					:data="promoButton"
					class="features3__promo-btn" />
			</slide>
			<pagination slot="hooper-addons" />
		</hooper>
		<div v-else>
			<div class="row">
				<template v-for="(slide, index) in features">
					<div
						v-for="(item, index2) in features[index]"
						:key="`fetures-item-desktop-${index}-${index2}`"
						class="features3__column">
						<FeaturesItem
							:item="item"
							class="features3__item" />
					</div>
				</template>
			</div>
			<Seo
				class="features3__seo"
				:seo="seo" />
			<PromoButton
				:data="promoButton"
				class="features3__promo-btn" />
		</div>
	</LandingSection>
</template>

<script>
import { mapGetters } from 'vuex'

import { Hooper, Slide, Pagination } from 'hooper'

import LandingSection from '@/components/Landing3/LandingSection.vue'
import PromoButton from '@/components/Landing3/PromoButton.vue'
import Seo from '@/components/Landing3/Seo.vue'
import FeaturesItem from '@/components/Landing3/FeaturesItem.vue'

export default {
	name: 'LandingFeatures',
	components: {
		Hooper,
		Slide,
		Pagination,
		LandingSection,
		PromoButton,
		Seo,
		FeaturesItem,
	},
	props: {
		features: {
			type: Array,
			default() {
				return []
			},
		},
		seo: {
			type: Object,
			default() {
				return {}
			},
		},
		promoButton: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	data() {
		return {
			hooperSettings: {
				wheelControl: false,
			},
		}
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

$color-primary:                 var(--color-primary, $primary);
$bg-features:                   var(--bg-features, linear-gradient(72.45deg, #407BFF 15.97%, #A383FF 128.76%));
$color-features-seo-bg:         var(--color-features-seo-bg, $secondary);

// breakpoint-name: (random-css-property, value, ...);
$button-style: (
	xs: (margin-top, 26px),
	md: (margin-top, 60px),
	lg: (margin-top, 50px),
	xl: (margin-top, 62px),
);

// breakpoint-name: (random-css-property, value, ...);
$column-style: (
	sm: (flex-basis, 50%),
	xl: (flex-basis, 100%/3),
);

.features3 {
	position: relative;
	color: $white;
	overflow: hidden;
	@include media-breakpoint-down(sm) {
		background: $bg-features;
	}

	&::after {
		@include media-breakpoint-up(md) {
			position: absolute;
			top: 0;
			left: 50%;
			width: 4097px;
			height: 2500px;
			background: $bg-features;
			transform: translateX(-50%);
			content: '';
			z-index: -1;
		}
	}

	&__promo-btn {
		margin: auto;
		@include media-style($button-style);
	}

	&__column {
		display: flex;
		flex-direction: column;
		margin-bottom: 25px;

		@include media-style($column-style);
	}

	&__item {
		flex: 1;
	}

	&__seo {
		border: none;
		@include media-breakpoint-up(md) {
			margin-top: 7px;
		}

		&.is-opened {
			background: $color-features-seo-bg;
		}
	}

	.hooper-track {
		margin-bottom: 34px;
	}
}
</style>
