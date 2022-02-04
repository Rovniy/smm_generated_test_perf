<template>
	<article v-if="dataFlag">
		<div
			v-for="(slider, index_1) in carousels"
			:key="`service-${currentDevice}-${index_1}`"
			class="carousels3"
			:class="{
				'carousels3--bg': isEven(index_1),
				'carousels3--desktop': !isLandingMobile,
				'animated': isDesktopAnimate,
			}">
			<div class="container">
				<h2 class="landing3__heading carousels3__heading">
					{{ slider.h2 }}
				</h2>
			</div>
			<client-only>
				<div class="carousels3__hooper-container">
					<hooper
						:key="`slider-${currentDevice}-${index_1}`"
						:settings="hooperSettings"
						:class="{'hooper--inverted': isEven(index_1)}"
						class="carousels3__hooper">
						<slide
							v-for="(priceKeyGroup, index_2) in priceKeyGroups[slider.keyGroupIndex || 'mobile']"
							:key="`slide-${currentDevice}-${index_2}`"
							class="carousels3__hooper-slide"
							aria-hidden="false"
							:index="index_2">
							<template v-for="(priceKey, priceKeyCounter) in priceKeyGroup">
								<!--eslint-disable-next-line -->
								<ClientOnly>
									<CarouselsCard
										v-for="(service, index_3) in slider.services"
										:key="`card-${currentDevice}-${priceKey}-${index_3}`"
										:service="service"
										:price-key="priceKey"
										:index="slider.services.length > 1 ? index_3 : priceKeyCounter"
										@open="open" />
								</ClientOnly>
							</template>
						</slide>
						<navigation slot="hooper-addons" class="carousels3__hooper-navigation">
							<span slot="hooper-prev" class="carousels3__chevron-left" />
							<span slot="hooper-next" class="carousels3__chevron-right" />
						</navigation>
						<pagination
							v-if="!isPhone"
							slot="hooper-addons"
							class="carousels3__hooper-pagination" />
					</hooper>
				</div>
			</client-only>
		</div>
		<Order v-if="service && 'CLIENT_MAIN' === client" />
	</article>
</template>

<script>
import {
	mapGetters,
	mapActions,
} from 'vuex'

import {
	Hooper,
	Pagination,
	Navigation,
	Slide,
} from 'hooper'

import CarouselsCard from '@/components/landing3/CarouselsCard.vue'
import Order from '@/components/landing3/Order.vue'

import notification from '~/mixins/notification.js'

export default {
	name: 'LandingCarousels',
	components: {
		Hooper,
		Slide,
		Pagination,
		Navigation,
		CarouselsCard,
		Order,
	},
	mixins: [
		notification,
	],
	props: {
		carousels: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
	data() {
		return {
			isDesktopAnimate: false,
			hooperSettings: {
				wheelControl: false,
				infiniteScroll: true,
			},
		}
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
			isPhone: 'responsive/isPhone',
			service: 'services/service',
			client: 'services/client',
		}),
		currentDevice() {
			return this.isLandingMobile ? 'mobile' : 'desktop'
		},
		dataFlag() {
			return Object.keys(this.carousels).length
		},
		/**
		 * top level arrays describes slides, bottom -- quantity for cards on each slide
		 * @returns {{desktop: number[][], mobile: number[][]}}
		 */
		priceKeyGroups() {
			return {
				mobile: [[ 100 ], [ 1000 ], [ 5000 ], [ 10000 ], [ 25000 ], [ 50000 ], [ 100000 ]],
				desktop: [[ 100, 1000, 5000 ], [ 10000, 25000, 50000 ], [ 100000 ]],
			}
		},
	},
	updated() {
		setTimeout(() => (this.isDesktopAnimate = true), 300)
	},
	methods: {
		...mapActions({
			setService: 'services/setService',
		}),
		isEven(index) {
			return 0 === (index + 1) % 2
		},
		open(service) {
			if (!service.labels.includes('ENABLED')) {
				this.notification(
					this.$t('SERVICE_UNAVAILABLE'),
					'',
					'error',
				)
				return
			}
			this.setService(service)
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

// breakpoint-name: (...padding-top ...padding-right ...padding-bottom ...padding-left);
$section-padding: (
	xs: (63px 53px),
	sm: (75px 71px),
	md: (75px 67px),
	lg: (55px 75px),
	xl: (55px 93px),
);

// breakpoint-name: (css-property, value);
$section-bg-top-style: (
	sm: (padding-top, 40px),
	md: (padding-top, 39px),
	lg: (padding-top, 73px),
	xl: (padding-top, 75px),
);

// breakpoint-name: (css-property, value);
$heading-style: (
	xs: (margin-bottom, -2px),
	md: (margin-bottom, 13px),
	lg: (margin-bottom, 59px - $carousels-card-shadow-offset),
	xl: (margin-bottom, 54px - $carousels-card-shadow-offset),
);

// breakpoint-name: (css-property, value);
$hooper-track-style: (
	xs: (margin-bottom -5px),
	md: (margin-bottom -2px),
	lg: (margin-bottom 19px),
	xl: (margin-bottom 16px),
);

// breakpoint-name: (css-property, value);
$chevron-style: (
	xs: (width, 12px, height, 12px, border-width, 3px 3px 0 0),
	lg: (width, 16px, height, 16px, border-width, 3px 3px 0 0),
	xl: (width, 23px, height, 23px, border-width, 4px 4px 0 0),
);

.carousels3 {
	$self: &;
	@include media-vpadding($section-padding);
	@include media-breakpoint-up(xl) {
		min-height: 880px;
		overflow: hidden;
	}

	&--bg {
		color: $white;
		background: linear-gradient(52.18deg, #407BFF 15.43%, #A383FF 98.17%);
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-image: $bg-image-carousels;

		@include media-style($section-bg-top-style);

		@include media-breakpoint-up(sm) {
			#{$self}__heading {
				display: none;
			}
		}
	}

	&.animated {
		.container {
			@include media-breakpoint-up(xl) {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.carousels3__hooper {
			&-container {
				@include media-breakpoint-up(xl) {
					transform: translateY(0);
					opacity: 1;
				}
			}
		}
	}

	& &__heading { // & нужно для переопределения стиля landing3__header
		@include media-style($heading-style);
	}

	.container {
		@include media-breakpoint-up(xl) {
			transition: transform .65s ease-in-out, opacity .65s ease-in-out;
			transform: translateY(100%);
			opacity: 0;
		}
	}

	&__hooper {
		margin: auto;
		@include media-breakpoint-up(md) {
			@each $breakpoint, $container-max-width in $container-max-widths {
				@include media-breakpoint-up($breakpoint) {
					max-width: $container-max-width - $grid-gutter-width + $carousels-card-shadow-offset * 2;
				}
			}
		}

		&-container {
			position: relative;

			@include media-breakpoint-up(xl) {
				transition: transform .5s ease-in-out, opacity .5s ease-in-out;
				transform: translateY(100%);
				opacity: 0;
			}
		}

		.hooper-track {
			@include media-style($hooper-track-style);
		}

		&-slide {
			display: flex;
			justify-content: center;
			min-width: 100%;
		}

		&-navigation {
			.hooper-prev,
			.hooper-next {
				transform: none;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				transition: $transition-fast;
				z-index: 10;
				padding: 0;

				// mobile first
				@each $breakpoint, $width in $grid-breakpoints {
					@include media-breakpoint-up($breakpoint) {
						$card-width: nth(map-get($carousels-card-width, $breakpoint), 1);

						width: calc(50% - #{$card-width} / 2);
					}
				}

				// desktop
				#{$self}--desktop & {
					// make button width
					@each $breakpoint, $width in $grid-breakpoints {
						@include media-breakpoint-up($breakpoint) {

							$card-width: nth(map-get($carousels-card-width, $breakpoint), 1);

							// @if str-index("xs", $breakpoint) {
							//   width: calc(50% - #{$card-width} / 2);
							// } @else if str-index("sm", $breakpoint) {
							// width: calc(50% - (#{$card-width} * 1.5 + #{$carousels-card-side-offset}));
							@if str-index("sm", $breakpoint) {
								width: calc(50% - (#{$g-carousels-desktop-min-width} * 1.5 + #{$carousels-card-side-offset}));
							}
							@else if str-index("md", $breakpoint) {
								$card-width-center: nth(map-get($carousels-card-width-center, $breakpoint), 1);

								width: calc(50% - (#{$card-width} + #{$card-width-center} * .5 + #{$carousels-card-side-offset}));
							}
							@else {
								$container-width: map-get($container-max-widths, $breakpoint);
								@if ($container-width) {
									width: calc(50% - (#{$container-width} - #{$grid-gutter-width}) / 2);
								}
							}
						}
					}
				}

				&:hover {
					opacity: .5;
				}
			}

			.hooper-prev {
				@include media-up(w1920) {
					text-align: right;
					padding-right: 95px;
					justify-content: flex-end;
				}
			}

			.hooper-next {
				@include media-up(w1920) {
					text-align: left;
					padding-left: 95px;
					justify-content: flex-start;
				}
			}
		}

		.hooper-next {
			left: auto;
			right: 0;
		}
	}

	&__chevron-left,
	&__chevron-right {
		margin: auto;
		display: inline-block;
		border-style: solid;
		border-radius: 2px;
		transform: rotate(45deg);
		@include media-style($chevron-style);
	}

	&__chevron-left {
		transform: rotate(-135deg);
	}
}
</style>
