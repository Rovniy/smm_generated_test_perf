<template>
	<div
		class="nav-lang3"
		@mouseover="(!isLandingMobile && landingScreenWidth >= 992) && showNav()"
		@mouseleave="hideNav()"
		@click.stop.prevent="(isLandingMobile || landingScreenWidth < 992) && toggleNav()">
		<div
			:class="{ 'nav-lang3__title--opened': isOpened }"
			class="nav-lang3__title">
			<span class="nav-lang3__indicator">
				{{ $i18n.locale }}
			</span>
		</div>
		<nav v-show="isOpened">
			<ul class="nav-lang3__holder">
				<li
					v-for="(locale, index) in sortedLocales"
					:key="`nav-lang-item-${index}`"
					class="nav-lang3__item">
					<nuxt-link
						:to="switchLocalePath(locale.code)"
						class="nav-lang3__link nav-lang3__flag"
						:class="`nav-lang3__flag--${locale.code}`"
						@click.stop.native="isOpened = false">
						{{ locale.name }}
					</nuxt-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import {
	mapGetters,
} from 'vuex'

export default {
	name: 'LandingNavLang',
	data() {
		return {
			isOpened: false,
		}
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
			landingScreenWidth: 'responsive/landingScreenWidth',
		}),
		sortedLocales() {
			const sortedList = []
			const sortMap = [ 'ru', 'en', 'de', 'es', 'pt', 'it', 'tr' ]

			sortMap.forEach(order => {
				this.$i18n.locales.forEach(lang => {
					if (lang.code === order) {
						sortedList.push(lang)
					}
				})
			})
			return sortedList
		},
	},
	methods: {
		showNav() {
			this.isOpened = true
		},
		hideNav() {
			this.isOpened = false
		},
		toggleNav() {
			this.isOpened = !this.isOpened
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-primary:         var(--color-primary, $primary);

.nav-lang3 {
	$self: &;

	position: relative;
	cursor: pointer;
	user-select: none;

	&__title {
		display: flex;
		align-items: center;
		padding: 15px;

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
			margin: 2px 2px 0 14px;
		}

		@include media-up(lg) {
			&::after {
				margin-left: 9px;
			}

			&:hover {
				opacity: $nav-item-hover-opacity;
			}
		}

		&--opened {
			&::after {
				transform: rotate(315deg);
			}
		}
	}

	&__indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		position: relative;
		font-family: $ff-gilroy;
		text-transform: uppercase;
		font-weight: 700;
		font-size: .75rem;
		line-height: 1;

		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 26px;
			height: 26px;
			border-width: 2px;
			border-style: solid;
			border-radius: 50%;
		}
	}

	&__holder {
		position: absolute;
		right: 0;
		top: 100%;
		z-index: 1000;
		background: $white;
		min-width: 147px;
		padding: 9px 0;
		border-color: #DDD;
		box-shadow: 0 0 25px rgba(0, 0, 0, .15);

		@include media-up(lg) {
			border-radius: 10px;
			right: auto;
			left: 15px;
		}
	}

	&__item {
		display: flex;
		align-items: center;
	}

	&__link {
		flex: 1;
		font-size: calc_rem(14px);
		line-height: 1;
		color: $base-color;
		padding: 15px 25px;
		white-space: nowrap;

		&:hover,
		&.link-exact-active {
			color: $color-primary;

			#{$self}__flag {
				&::before {
					opacity: .7;
				}
			}
		}
	}

	&__flag {
		&::before {
			content: '';
			display: inline-block;
			margin-right: 6px;
			width: 18px;
			height: 12px;
			background-size: contain;
			background-repeat: no-repeat;
			vertical-align: middle;
		}

		$flags: 'ru', 'en', 'es', 'pt', 'tr', 'de', 'it';
		@each $flag in $flags {
			&--#{$flag} {
				&::before {
					background-image: url('/img/flags/#{$flag}.png');
				}
			}
		}
	}
}
</style>
