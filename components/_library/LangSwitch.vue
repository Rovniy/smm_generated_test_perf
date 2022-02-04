<template>
	<div
		class="nav__lang"
		@mouseover="!isMobile && $emit('change', true)"
		@mouseleave="!isMobile && $emit('change', false)">
		<a
			class="nav__lang-link"
			:class="{ open }"
			href="#"
			rel="noopener"
			@click="isMobile && $emit('change', !open)">
			<span>
				{{ $i18n.locale }}
			</span>
			<chevron-down class="chevron" />
		</a>
		<transition-expand-height>
			<ul v-show="open">
				<li
					v-for="(locale, index) in sortedLocales"
					:key="`nav-lang-item-${index}`">
					<nuxt-link
						:to="switchLocalePath(locale.code)"
						class="nav-lang__flag"
						:class="`nav-lang__flag--${locale.code}`"
						@click.native="close(locale.code)">
						{{ locale.name }}
					</nuxt-link>
				</li>
			</ul>
		</transition-expand-height>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import TransitionExpandHeight from '@/components/_library/TransitionExpandHeight.vue'

import ChevronDown from '~/assets/symbols/chevron-down.svg?inline'

export default {
	components: {
		TransitionExpandHeight,
		ChevronDown,
	},
	props: {
		open: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		...mapGetters('responsive', [ 'isMobile' ]),
		sortedLocales() {
			const localesOrder = {
				ru: 0,
				en: 1,
				de: 2,
				es: 3,
				pt: 4,
				it: 5,
				tr: 6,
			}
			return Array.from(this.$i18n.locales).sort(
				(langA, langB) => localesOrder[langA.code] - localesOrder[langB.code],
			)
		},
	},
	methods: {
		async close(lang) {
			if (this.$auth.loggedIn) {
				await this.$axios.$post('user', {
					lang,
				})
				this.$auth.setUser({
					...this.$auth.user,
					lang,
				})
			}
			this.$emit('close')
		},
	},
}
</script>

<style lang="scss">
$nav-item-bg:            rgba(82, 82, 82, .32);
$nav-item-bg-fixed:      rgba(175, 175, 175, .32);
$nav-text-color-fixed:   #999;

.nav__lang {
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
	color: inherit;

	.nav & {
		align-items: flex-start;
	}
	// last position in mobile menu
	@media (max-width: 1023.98px) {
		flex-flow: column;
	}
	@media (max-width: 1023.98px) {
		font-size: 1.125rem;
		line-height: 40px;
	}
	@media (min-width: 1024px) {
		.nav & {
			align-items: center;
		}

		align-items: center;
		font-size: 12px;
		padding: 15px;
	}

	 a {
		> span {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		> .chevron {
			fill: currentColor;
			width: 12px;
			height: 12px;
			margin-left: 10px;
		}
	}

	> ul {
		flex-direction: column;
		top: 100%;
		left: auto;
		right: 0;
		padding-right: 0;
		padding-left: 0;
		position: absolute;
		background-color: #1C86EA;
		color: #FFF;
		@media (min-width: 1024px) {
			padding: 0;
			position: absolute;
			top: 100%;
			min-width: 100%;
			white-space: nowrap;
			overflow: hidden;
		}

		a {
			padding-right: 1rem;
			padding-left: 1rem;
			font-family: "Segoe UI", 'sans-serif';
		}

		.nav & {
			//padding-left: 1rem;
			top: auto;
			position: relative;
			width: 100%;
			background-color: transparent;
			@media (min-width: 1024px) {
				padding: 0;
				position: absolute;
				top: 100%;
				min-width: 100%;
				width: auto;
				white-space: nowrap;
				overflow: hidden;
				background: rgba($primary, .7);
			}
		}

		a {
			flex: 1 0 auto;
			display: flex;
			justify-content: flex-end;
			color: inherit;
			cursor: pointer;
			text-transform: uppercase;
			user-select: none;

			&:hover {
				opacity: .6;
			}
			@media (min-width: 1024px) {
				align-items: center;
				font-size: 12px;
				padding: .5rem 1rem;
			}
			@media (max-width: 1023.98px) {
				line-height: 40px;
				font-size: .9rem;
				padding: .25rem .75rem;
				align-items: center;
			}
		}
	}

	.nav__lang-link {
		flex: 1 0 auto;
		display: flex;
		// color: inherit;
		align-items: center;
		cursor: pointer;
		text-transform: uppercase;
		user-select: none;
		font-size: 12px;

		&:hover {
			opacity: .6;
		}
		@media (max-width: 1023.98px) {
			font-size: .9rem !important;
			color: #FFF;

			.nav & {
				margin-top: 1.5rem;
				align-self: flex-start;
			}
		}
		@media (min-width: 1024px) {
			font-weight: 700;
		}

		span {
			position: relative;
			width: 30px;
			height: 30px;
			text-align: center;
			font-family: $ff-gilroy;
			font-size: 12px;
			line-height: 12px;
			display: flex;
			padding: 1px 0 0 0;
			border: 2px solid white;
			border-radius: 50%;

			.nav & {
				padding-top: 2px;
				padding-left: 1px;
			}
		}
	}

	&.auth {
		padding: 0;
	}

	&.auth > .nav__lang-link {
		@media (max-width: 850px) and (orientation: landscape) {
			color: #19233C;

			span {
				border-color: #19233C;
			}
		}
		@media (max-width: 767.98px) {
			color: #19233C;

			span {
				border-color: #19233C;
			}
		}
	}
	// item bg
	ul > li:hover {
		background: $nav-item-bg;
	}

	.fixed & {
		a {
			color: $nav-text-color-fixed;
		}
		@media (max-width: 1023.98px) {
			.nav__lang-link {
				align-self: flex-start;
				color: #FFF;
			}

			ul {
				padding: 0;

				li {
					padding: 0;

					a {
						padding: 0 1rem;
						color: #FFF;
					}
				}
			}
		}

		ul {
			@media (min-width: 1024px) {
				background: #FFF;
				border: 1px solid #EEE;
			}

			> li:hover {
				background: $nav-item-bg-fixed;
			}
		}
		@media (min-width: 1024px) {
			a {
				color: $nav-text-color-fixed;
			}

			ul > li:hover {
				background: $nav-item-bg-fixed;
			}
		}
	}
}

.nav-lang {
	$self: &;

	&__flag {
		&::after {
			content: '';
			display: inline-block;
			margin-left: 16px;
			width: 34px;
			height: 22px;
			background-size: contain;
			background-repeat: no-repeat;
			vertical-align: middle;
		}

		$flags: 'ru', 'en', 'es', 'pt', 'tr', 'de', 'it';
		@each $flag in $flags {
			&--#{$flag} {
				&::after {
					background-image: url('/img/flags/#{$flag}@3x.png');
				}
			}
		}
	}
}
</style>
