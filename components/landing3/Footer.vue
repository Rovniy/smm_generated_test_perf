<template>
	<footer class="footer3">
		<div class="footer3__container">
			<div class="row">
				<div class="footer3__column-text footer3__column-offset">
					<nuxt-link
						class="footer3__logo"
						:to="{
							path: localePath('landing3'),
							hash: '#__layout',
						}">
						<img
							src="~assets/images/logo/logo_white.svg"
							width="123"
							height="38"
							alt="logo"
							loading="lazy">
					</nuxt-link>
					<div class="footer3__text">
						{{ $t('HEADER_FOOTER_SEO_TEXT') }}
					</div>
				</div>
				<div class="footer3__column-nav">
					<h3 class="footer3__heading">
						{{ $t('nav') }}:
					</h3>
					<div class="row">
						<ul
							v-for="(col, key) in linksList"
							:key="`link-list-${key}`"
							class="footer3__column-offset footer3__column-nav-child">
							<li
								v-for="(item, key2) in col"
								:key="key2"
								class="footer3__list-item">
								<a
									v-if="item.externalUrl"
									class="footer3__link footer3__nav-item"
									:rel="item.noopener"
									:target="item.target"
									:href="item.externalUrl">
									{{ $t(item.title) }}
								</a>
								<nuxt-link
									v-else
									v-show="showLocalizeLinks(item)"
									class="footer3__link footer3__nav-item"
									:to="item.translatePath ? localePath(item.to) : item.to">
									{{ $t(item.title) }}
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="footer3__column-contacts">
					<h3 class="footer3__heading footer3__heading--mail">
						{{ $t('nav_contact') }}:
					</h3>
					<div class="row">
						<div class="footer3__column-offset footer3__column-contacts-child">
							<a
								:href="`mailto:${email}`"
								target="_blank"
								rel="noopener"
								class="footer3__link footer3__link--mail">
								<icon-mail class="footer3__icon-mail" />
								{{ email }}
							</a>
						</div>
						<div class="footer3__column-offset footer3__column-contacts-child">
							<ul class="footer3__social-media">
								<li
									v-for="(item, key) in socialMediaList"
									:key="`social-media-${key}`"
									class="footer3__social-media-item">
									<a
										:href="item.link"
										target="_blank"
										rel="noopener"
										class="footer3__social-media-link">
										{{ item.icon }}
										<svg-icon
											:name="item.icon"
											class="footer3__social-media-icon" />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer3__copyrights">
			&copy; 2017 - {{ new Date().getFullYear() }} {{ $t('nav_copy') }}
		</div>
	</footer>
</template>

<script>
import ScrollTo from '~/mixins/scrollTo.js'

import IconMail from 'assets/svg/landing3/icon-mail.svg'

export default {
	name: 'LandingFooter',
	components: {
		IconMail,
	},
	mixins: [
		ScrollTo,
	],
	data() {
		return {
			socialMediaList: [
				{ icon: 'instagram', link: 'https://www.instagram.com/smmtouch_blog/' },
				{ icon: 'vk', link: 'https://vk.com/smmtouch' },
				{ icon: 'telegram', link: 'https://t.me/SmmTouchNews' },
			],
			email: 'info@smmtouch.com',
		}
	},
	computed: {
		sourceLinkList1() {
			return [{
				title: 'nav_faq',
				to: {
					hash: '#faq',
					query: { fromCp: 'true' },
				},
			}, {
				title: 'nav_blog',
				externalUrl: 'https://smmtouch.com/blog?page=1',
				noopener: 'noopener',
				target: '_blank',
			}, {
				title: 'nav_reviews',
				externalUrl: 'https://otzyvmarketing.ru/smmtouch/',
				noopener: 'noopener',
				target: '_blank',
			}]
		},
		sourceLinkList2() {
			return [{
				title: 'nav_login',
				externalUrl: 'https://smmtouch.com/login',
				noopener: 'noopener',
				target: '_blank',
			}, {
				title: 'nav_oferta',
				externalUrl: 'it' === this.$i18n.locale
					? '/docs/oferta-en.pdf'
					: `/docs/oferta-${this.$i18n.locale}.pdf`,
				target: '_blank',
			}, {
				title: 'nav_policy',
				to: '/policy',
				translatePath: true,
			}]
		},
		linksList() {
			return '/blog' === this.$route.path
				? [ this.sourceLinkList1.filter(item => item.title !== 'nav_faq'), this.sourceLinkList2 ]
				: [ this.sourceLinkList1, this.sourceLinkList2 ]
		},
	},
	methods: {
		showLocalizeLinks(link) {
			return link.available_lang ? link.available_lang.includes(this.$i18n.locale) : true
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-hover: $white;
$color-bg: #222;
$color-text: #afb2ba;

// breakpoint-name: (css-property, value);
$column-nav-child-style: (
	xs: (flex-basis, 42%),
	sm: (flex-basis, 50%),
	md: (flex-basis, 32%),
	lg: (flex-basis, 34%),
);

.footer3 {
	background-color: $color-bg;
	color: $color-text;
	font-family: $ff-gotham;
	font-size: calc_rem(14px);
	line-height: calc_rem(23px);

	&__text {
		color: $color-text;
		margin-top: 10px;
		@include media-breakpoint-up(md) {
			margin-top: 13px;
		}
		@include media-breakpoint-up(xl) {
			margin-top: 7px;
		}
	}

	&__container {
		@include make-container();
		@include make-container-max-widths();

		padding-top: 48px;
		padding-bottom: 11px;

		@include media-breakpoint-up(md) {
			padding-top: 70px;
		}
		@include media-breakpoint-up(lg) {
			padding-top: 48px;
			padding-bottom: 0;
		}
	}

	&__column-offset {
		margin-bottom: 35px;
		@include media-breakpoint-up(md) {
			margin-bottom: 40px;
		}
		@include media-breakpoint-up(lg) {
			margin-bottom: 35px;
		}
		@include media-breakpoint-up(w1440) {
			margin-left: 0;
		}
	}

	&__column-text {
		@include media-up(lg) {
			flex-basis: (100%/3);
		}
	}

	&__column-nav {
		@include media-up(md) {
			flex-basis: 66.66667%;
		}
		@include media-up(lg) {
			flex-basis: 41.66667%;
		}
	}

	&__column-nav-child {
		@include media-style($column-nav-child-style);

		&:last-child {
			flex: 1;
		}
	}

	&__column-contacts {
		color: $color-text;
		@include media-up(md) {
			flex-basis: (100%/3);
		}
		@include media-breakpoint-up(lg) {
			margin-left: auto;
			max-width: none;
			flex-basis: (100%/12);
		}
	}

	&__column-contacts-child {
		flex-basis: 54%;
		display: flex;
		align-items: center;
		margin-bottom: 16px;

		@include media-breakpoint-up(sm) {
			flex-basis: 50%;
		}

		&:last-child {
			flex: 1;
		}
	}

	&__list-item {
		color: $color-text;
		text-transform: uppercase;
		margin-bottom: 3px;
		@include media-breakpoint-up(lg) {
			margin-bottom: 0;
		}
	}

	&__heading {
		color: $white;
		font-size: calc_rem(16px);
		font-weight: 700;
		text-transform: uppercase;
		margin-bottom: 18px;
		@include media-breakpoint-up(md) {
			margin-bottom: 20px;
		}
		@include media-breakpoint-up(lg) {
			margin-bottom: 38px;
		}
		@include media-breakpoint-up(xl) {
			margin-bottom: 28px;
		}

		&--mail {
			@include media-breakpoint-down(sm) {
				margin-bottom: 15px;
			}
		}
	}

	&__nav-item {
		font-size: calc_rem(13px);
		display: inline-block;

		&::before {
			content: '';
			display: inline-block;
			border-style: solid;
			border-width: 1px 1px 0 0;
			height: 8px;
			width: 8px;
			transform: rotate(45deg);
			margin-right: 6px;
		}
	}

	&__social-media {
		@include list-unstyled();

		display: flex;
		align-items: center;

		@include media-breakpoint-down(sm) {
			margin-left: 18px;
			margin-right: 18px;
		}

		&-item {
			display: inline-block;
			line-height: 1px;

			&:not(:last-child) {
				margin-right: 16px;
			}
		}
	}

	&__social-media-link {
		transition: $transition-fast;
		padding: 6px;
		border-radius: 50%;
		background: $color-text;
		color: $color-bg;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 0; // l-h и f-z равны 0 для того, чтобы текст внутри тега a не было видно (аудит Lighthouse)
		font-size: 0;

		&:hover {
			background: $color-hover;
			color: $color-bg;
		}
	}

	&__social-media-icon {
		width: 18px;
		height: 18px;
	}

	&__icon-mail {
		margin-right: 4px;
	}

	&__link {
		transition: $transition-fast;
		width: 100%;

		&:hover {
			color: $color-hover;
		}

		&--mail {
			display: flex;
			align-items: center;
			font-size: calc_rem(14px);
			white-space: nowrap;
		}
	}

	&__copyrights {
		border-top: 1px solid #353A40;
		color: $white;
		text-align: center;
		padding: 33px 15px;
		font-size: calc_rem(14px);
	}
}
</style>
