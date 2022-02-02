<template>
	<nav>
		<ul class="nav3">
			<li class="nav3__item--mobile-only">
				<span class="nav3__link" @click.stop.prevent="$emit('close-nav');">
					<icon-menu-arrow class="nav3__icon" />
					{{ $t('nav_menu') }}
				</span>
			</li>
			<li
				v-for="(item, index) in linksList"
				:key="index"
				class="nav3__item"
				@mouseover="(!isLandingMobile && landingScreenWidth >= 992)&& showNav(index)"
				@mouseleave="(!isLandingMobile && landingScreenWidth >= 992) && hideNav()"
				@click.stop.prevent="(isLandingMobile || landingScreenWidth < 992) && toggleNav(index)">
				<a
					v-if="isLandingMobile || landingScreenWidth < 992"
					:class="{'nav3__link--opened': activeLink === index }"
					href="#"
					rel="noopener"
					class="nav3__link">
					<svg-icon
						:name="index"
						class="nav3__icon"
						:class="`svg-sprite--${index}`" />
					{{ $t(`nav_${index}`) }}
				</a>
				<nuxt-link
					v-else
					:class="{'nav3__link--opened': activeLink === index }"
					:to="localePath(getNetworkMainPath(index))"
					class="nav3__link">
					<svg-icon
						:name="index"
						class="nav3__icon"
						:class="`svg-sprite--${index}`" />
					{{ $t(`nav_${index}`) }}
				</nuxt-link>
				<ul
					v-show="activeLink === index"
					class="nav3__panel">
					<li
						v-for="(item2, index2) in item.links"
						:key="`links-${index}-${index2}`"
						class="nav3__item">
						<nuxt-link
							class="nav3__link nav3__link--level2"
							:to="localePath(item2)"
							@click.stop.prevent.native="closeNav(index)">
							{{ $t(`nav_${index2}`) }}
						</nuxt-link>
					</li>
				</ul>
			</li>
			<li class="nav3__item--mobile-only">
				<nuxt-link
					:to="localePath('/login')"
					class="nav3__link">
					<icon-menu-login class="nav3__icon" />
					{{ $t('nav_login') }}
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import {
	mapGetters,
} from 'vuex'

import IconMenuArrow from '~/assets/svg/landing3/icon-menu-arrow.svg?inline'
import IconMenuLogin from '~/assets/svg/landing3/icon-menu-login.svg?inline'

export default {
	name: 'LandingNav',
	components: {
		IconMenuArrow,
		IconMenuLogin,
	},
	data() {
		return {
			activeLink: null,
			linksList: {
				instagram: {
					opened: false,
					links: {
						main: '/?fromCp=true',
						likes: '/uslugi/lajki-v-instagram',
						followers: '/uslugi/podpischiki-v-instagram',
						views: '/uslugi/prosmotry-v-instagram',
						autolikes: '/uslugi/avtolajki-v-instagram',
						autoviews: '/uslugi/avtoprosmotry-v-instagram',
						stories: '/uslugi/istorii-v-instagram',
					},
				},
				vk: {
					opened: false,
					links: {
						main: '/vk',
						likes: '/uslugi/lajki-v-vkontakte',
						followers: '/uslugi/podpischiki-v-vkontakte',
						friends: '/uslugi/druzya-v-vkontakte',
						comments: '/uslugi/kommentarii-v-vkontakte',
						autolikes: '/uslugi/avtolajki-v-vkontakte',
						reposts: '/uslugi/reposty-v-vkontakte',
					},
				},
				tiktok: {
					opened: false,
					links: {
						main: '/tiktok',
						likes: '/uslugi/lajki-v-tiktok',
						followers: '/uslugi/podpischiki-v-tiktok',
						views: '/uslugi/prosmotry-v-tiktok',
						autoviews: '/uslugi/avtoprosmotry-v-tiktok',
						autolikes: '/uslugi/avtolajki-v-tiktok',
						reposts: '/uslugi/reposty-v-tiktok',
					},
				},
				youtube: {
					opened: false,
					links: {
						main: '/youtube',
						likes: '/uslugi/lajki-v-youtube',
						// dislikes: '/uslugi/dislajki-v-youtube', // решено убрать дизлайки с главной
						followers: '/uslugi/podpischiki-v-youtube',
						views: '/uslugi/prosmotry-v-youtube',
					},
				},
			},
		}
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
			landingScreenWidth: 'responsive/landingScreenWidth',
		}),
	},
	methods: {
		showNav(index) {
			this.activeLink = index
		},
		hideNav() {
			this.activeLink = null
		},
		toggleNav(index) {
			if (this.activeLink === index) {
				this.hideNav()
			}
			else {
				this.showNav(index)
			}
		},
		closeNav() {
			this.hideNav()
			this.$emit('close-nav')
		},
		getNetworkMainPath(network) {
			return this.linksList[network].links.main
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-primary:         var(--color-primary, $primary);

$nav-link-padding-x: 21px;

.nav3 {
	$self: &;
	@include media-breakpoint-up(lg) {
		display: flex;
	}

	&__item {
		position: relative;
	}

	&__item--mobile-only {
		@include media-breakpoint-up(lg) {
			display: none;
		}
	}

	&__link {
		display: flex;
		align-items: center;
		padding: 20px 0;
		font-size: calc_rem(15px);
		user-select: none;

		&:not(:only-child) {
			&::after {
				transition: $transition-rotate;
				transform-origin: 60% 30%;
				content: '';
				display: inline-block;
				height: 7px;
				width: 7px;
				border-style: solid;
				border-width: 2px 2px 0 0;
				border-radius: 1px;
				transform: rotate(135deg);
				margin: 4px 0 0 auto;
				@include media-up(lg) {
					margin: 2px 0 0 10px;
				}
			}
		}

		@include media-down(md) {
			&--opened,
			&.link-exact-active {
				color: $primary;

				.nav3__icon {
					color: $primary;
				}
			}
		}

		&--opened {
			&::after {
				transform: rotate(315deg) !important;
			}
		}

		&:hover {
			opacity: $nav-item-hover-opacity;
		}

		@include media-up(lg) {
			padding-left: $nav-link-padding-x;
			padding-right: $nav-link-padding-x;
			font-size: calc_rem(17px);

			.is-fixed & {
				font-size: calc_rem(15px);
			}
		}
	}

	& #{$self}__link--level2 {
		padding: 16px 0 17px;
		@include media-up(lg) {
			color: $base-color;
			font-size: calc_rem(13px);
			padding: 9px 16px;

			&.link-exact-active,
			&:hover {
				color: $primary;
				opacity: 1;
			}
		}
	}

	&__icon {
		color: #898989;
		margin-right: 18px;
		@include media-up(lg) {
			display: none;
		}
	}

	&__text {
		flex: 1;
	}

	&__panel {
		flex-direction: column;
		@include media-breakpoint-up(lg) {
			background: $white;
			border-radius: 10px;
			position: absolute;
			top: 100%;
			left: #{$nav-link-padding-x};
			min-width: calc(100% - #{$nav-link-padding-x} * 2);
			white-space: nowrap;
			padding: 10px 0;

			.is-fixed & {
				// подменю, как продлжение основного меню
				// border-radius: 0 0 10px 10px;
				// box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.15);
				// opacity: .95;
				box-shadow: 0 0 25px rgba(0, 0, 0, .15);
			}
		}
	}
}
</style>
