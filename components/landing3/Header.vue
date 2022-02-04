<template>
	<lazy-hydrate when-idle>
		<header
			class="header2-landing2 header3"
			:class="{
				'is-fixed': isFixed,
				'is-mobile-menu-opened': isMobileMenuOpened,
			}">
			<div class="header2-landing2__container1 header3__container">
				<div class="header2-landing2__left">
					<button
						class="header2-landing2__burger"
						aria-label="burger"
						@click="isMobileMenuOpened = !isMobileMenuOpened">
						<span class="header2-landing2__burger-box">
							<span class="header2-landing2__burger-inner" />
						</span>
					</button>
					<nuxt-link class="header3__logo-link" :to="{ path: localePath('index'),query: $route.query }">
						<img
							v-show="isFixed"
							class="header3__logo"
							width="103"
							height="33"
							src="~/assets/images/logo/logo_blue.svg"
							alt="Logo"
							loading="lazy">
						<img
							v-show="!isFixed"
							class="header3__logo"
							width="103"
							height="33"
							src="~/assets/images/logo/logo_white.svg"
							alt="Logo"
							loading="lazy">
					</nuxt-link>
					<transition name="burger_animation">
						<Nav
							v-if="isMobileMenuOpened || !$device.isMobile"
							class="header2-landing2__nav header3__nav"
							@close-nav="isMobileMenuOpened = false" />
					</transition>
				</div>
				<div class="header2-landing2__right header3__right">
					<NavLang v-if="isLangEnabled" />
					<a
						class="header3__login"
						href="https://smmtouch.com/login"
						rel="noopener"
						target="_blank">{{ $t('nav_login') }}</a>
				</div>
			</div>
			<transition name="burger_backdrop">
				<div
					v-if="isMobileMenuOpened || !$device.isMobile"
					class="header2-landing2__backdrop"
					@click="isMobileMenuOpened = false" />
			</transition>
		</header>
	</lazy-hydrate>
</template>

<script>
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'

import Nav from '@/components/landing3/Nav.vue'
import NavLang from '@/components/landing3/NavLang.vue'

import ScrollTo from '~/mixins/scrollTo.js'

export default {
	name: 'LandingHeader',
	components: {
		LazyHydrate,
		Nav,
		NavLang,
	},
	mixins: [
		ScrollTo,
	],
	props: {
		scrollTopOffset: {
			type: Number,
			default: 50,
		},
		isLangEnabled: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isFixed: false,
			isMobileMenuOpened: false,
			asd: false,
		}
	},
	computed: {
		...mapGetters({
			isPhone: 'responsive/isPhone',
			isTablet: 'responsive/isTablet',
		}),
	},
	updated() {
		console.log('this.$device', this.$device)
	},
	beforeMount() {
		window.addEventListener('scroll', this.onScroll, { passive: true })
		this.onScroll()
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll() {
			const el = document.scrollingElement || document.documentElement
			this.isFixed = !this.isPhone && !this.isTablet && el.scrollTop >= this.scrollTopOffset
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

:root {
	--video-ratio: 3;
	--video-container-max-width: 640px;
	--video-container-x-padding-sum: 2rem; /* eg, padding: 0 1rem */

	@media only screen and (max-width: 1024px) {
		--video-ratio: 2;
	}
}

.ql-video {
	--video-container-width: calc(100vw - var(--video-container-x-padding-sum));
	width: 100%;
	height: calc(var(--video-container-width) / var(--video-ratio));
}

@media only screen and (min-width: 672px) {
	.youtube-embed {
		--video-container-width: var(--video-container-max-width);
	}
}

$bg-image-banner:   var(--bg-image-banner);

.header3 {
	$self: &;

	display: flex;
	justify-content: flex-end;
	min-height: $header-height;
	font-family: $ff-gotham;
	font-size: calc_rem(17px);
	line-height: calc_rem(19px);
	color: $white;

	@include media-down(md) {
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
		position: fixed;
		top: 0;
		background: linear-gradient(45.94deg, #407BFF -3.82%, #A383FF 95.71%) center top / cover no-repeat;
		background-image: $bg-image-banner;
	}

	&::before {
		@include media-up(lg) {
			content: '';
			@include absolute();

			z-index: -1;
			transition: $transition;
			background-color: #FFF;
			opacity: 0;
		}
	}

	&__container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;

		@include make-container();
	}

	&__logo {
		width: 103px;
		height: auto;

		&--white {
			> * {
				fill: #FFF;
			}
		}
	}

	&__logo-link {
		line-height: 1px;
	}

	&__nav {
		@include media-down(md) {
			color: #323E41;
		}
		@include media-up(lg) {
			margin-left: 25px;
		}
	}

	&__login {
		display: none;
		@include media-up(lg) {
			display: block;
			padding: 20px 0;

			&:hover {
				opacity: $nav-item-hover-opacity;
			}
		}
	}
}

.header2-landing2 {

	$self: &;

	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 100;
	background-position: center top;
	background-repeat: no-repeat;
	background-size: cover;

	@include media-breakpoint-up(lg) {
		position: absolute;
	}

	&__container {
		@include make-container();

		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: $header-height;
		@include media-breakpoint-down(lg) {
			flex-wrap: wrap;
		}
	}

	&__left,
	&__right {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		@include media-breakpoint-up(lg) {
			position: static;
		}
	}

	&__right {
		left: auto;
		right: 0;
	}

	&__burger {
		position: relative;
		width: 60px;
		height: 60px;
		padding: 0;
		margin-right: 15px;

		&-box {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 26px;
			height: 20px;
		}

		&-inner,
		#{$self}__burger-inner:after,
		#{$self}__burger-inner:before {
			position: absolute;
			width: 100%;
			height: 4px;
			left: 0;
			transition-timing-function: ease;
			transition-duration: .15s;
			transition-property: transform;
			transition-delay: .15s;
			border-radius: 4px;
			background-color: $white;
		}

		&-inner {
			top: 50%;
			display: block;
			margin-top: -2px;

			&::before {
				content: '';
				top: -8px;
			}

			&::after {
				content: '';
				bottom: -8px;
			}
		}

		@include media-breakpoint-up(lg) {
			display: none;
		}
	}

	&__nav {
		transition: transform .25s;

		&.burger_animation {
			&-enter,
			&-leave-to{
				transform: translateX(-100%);
			}
			&-enter-to,
			&-leave{
				transform: translateX(0);
			}
		}

		@include media-breakpoint-down(md) {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			width: 300px;
			background: $white;
			overflow-y: scroll;
			display: block;
			padding: 5px 25px 10%;
			flex: 1 0 100%;
		}
		@include media-breakpoint-up(lg) {
			display: flex;
			order: 10;
		}
	}

	&.is-fixed {
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
		font-size: calc_rem(15px);

		@include media-breakpoint-up(lg) {
			position: fixed;
			top: 0;
			color: $base-color;

			&::before {
				opacity: .95;
			}

			.header3__logo {
				width: 93px;
			}
		}

		@include media-breakpoint-up(lg) {
			#{$self}__logo {
				transform: scale(1);
			}
		}
	}

	&.is-mobile-menu-opened {
		@include media-breakpoint-down(lg) {
			// #{$self}__burger {
			//   span  {
			//     display: block;
			//   }
			// }
			// #{$self}__burger-inner {
			//   &:after {
			//     transform: translate3d(-6px,0,0) rotate(45deg) scaleX(1);
			//   }
			//   &:before {
			//     transform: translate3d(-6px,0,0) rotate(-45deg) scaleX(1);
			//   }
			// }

			#{$self}__nav {
				z-index: 10;
			}

			#{$self}__backdrop {
				transition: opacity .25s;

				&.burger_backdrop {
					&-enter,
					&-leave-to {
						opacity: 0;
					}
					&-enter-to,
					&-leave{
						opacity: 1;
					}
				}

				@include media-down(md) {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, .5);
				}
			}
		}
	}
}
</style>
