<template>
	<div class="landing3">
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Footer from '@/components/landing3/Footer.vue'

import setUser from '~/mixins/userRole.js'

import '~/assets/styles/components/_button.scss'
import '~/assets/styles/components/_form.scss'
import '~/assets/styles/components/_order.scss'
import '~/assets/styles/_svg-filters.scss'
import '~/assets/styles/app.scss'

export default {
	components: {
		Footer,
	},
	mixins: [
		setUser,
	],
	head() {
		const seo = {
			title: this.seoTitle,
			meta: [{
				hid: 'description',
				name: 'description',
				content: this.seoDescription,
			}, {
				hid: 'og:locale',
				property: 'og:locale',
				content: this.$i18n.localeProperties.iso,
			}, {
				hid: 'og:title',
				property: 'og:title',
				content: this.seoTitle,
			}, {
				hid: 'og:description',
				property: 'og:description',
				content: this.seoDescription,
			}],
		}
		const notBlog = ![ 'blog', 'blog-slug' ].includes(this.$route.name)
		if (notBlog) {
			const i18nSeo = this.$nuxtI18nSeo()
			seo.htmlAttrs = i18nSeo.htmlAttrs
			seo.link = seo.link || []
			seo.link = [
				...seo.link,
				...i18nSeo.link.filter(
					link => !/^[a-z]{2}-[A-Z]{2}$/.test(link.hreflang),
				),
			]
		}
		return seo
	},
	computed: {
		seoTitle() {
			return this.$t('seo_title')
		},
		seoDescription() {
			return this.$t('seo_description')
		},
	},
	mounted() {
		if (this.$route.query.gclid) {
			this.$cookiz.set(
				'new_gclid',
				this.$route.query.gclid, {
					path: '/',
					maxAge: 60 * 30, // 30 minutes
				},
			)
		}
		if (this.$route.query.ref) {
			this.$cookiz.set('smmtouch_ref_token', this.$route.query.ref)
		}
	},
}
</script>

<style lang="scss">
@import "hooper/dist/hooper.css";
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

@font-face {
	font-family: "Gilroy";
	font-style: normal;
	font-weight: normal;
	font-display: swap;
	src:
		url("/fnt/Gilroy-Regular.eot?#iefix") format("embedded-opentype"),
		url("/fnt/Gilroy-Regular.woff") format("woff"),
		url("/fnt/Gilroy-Regular.ttf") format("truetype");
}

@font-face {
	font-family: "Gilroy";
	font-style: normal;
	font-weight: 500;
	font-display: swap;
	src:
		url("/fnt/Gilroy-Medium.eot?#iefix") format("embedded-opentype"),
		url("/fnt/Gilroy-Medium.woff") format("woff"),
		url("/fnt/Gilroy-Medium.ttf") format("truetype");
}

@font-face {
	font-family: "Gilroy";
	font-style: normal;
	font-weight: 600;
	font-display: swap;
	src:
		url("/fnt/Gilroy-SemiBold.eot?#iefix") format("embedded-opentype"),
		url("/fnt/Gilroy-SemiBold.woff") format("woff"),
		url("/fnt/Gilroy-SemiBold.ttf") format("truetype");
}

@font-face {
	font-family: "Gilroy";
	font-style: normal;
	font-weight: 700;
	font-display: swap;
	src:
		url("/fnt/Gilroy-Bold.eot?#iefix") format("embedded-opentype"),
		url("/fnt/Gilroy-Bold.woff") format("woff"),
		url("/fnt/Gilroy-Bold.ttf") format("truetype");
}

@font-face {
	font-family: "Gilroy";
	font-style: normal;
	font-weight: 800;
	font-display: swap;
	src:
		url("/fnt/Gilroy-ExtraBold.eot?#iefix") format("embedded-opentype"),
		url("/fnt/Gilroy-ExtraBold.woff") format("woff"),
		url("/fnt/Gilroy-ExtraBold.ttf") format("truetype");
}

@font-face {
	font-family: "GothamPro";
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: url("/fnt/GothamProRegular.eot");
	src:
		url("/fnt/GothamProRegular.eot?#iefix") format("embedded-opentype"),
		url("/fnt/GothamProRegular.woff") format("woff"),
		url("/fnt/GothamProRegular.ttf") format("truetype");
}

@font-face {
	font-family: "GothamPro";
	font-style: normal;
	font-weight: 700;
	font-display: swap;
	src: url("/fnt/GothamProBold.eot");
	src:
		url("/fnt/GothamProBold.eot?#iefix") format("embedded-opentype"),
		url("/fnt/GothamProBold.woff") format("woff"),
		url("/fnt/GothamProBold.ttf") format("truetype");
}

html {
	-webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom */
}

body {
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.286;
	font-family: $ff-gilroy;
	color: $body-color;
}

$color-primary:         var(--color-primary, $primary);
$color-secondary:       var(--color-secondary, $secondary);
$bg-image-carousels:    var(--bg-image-carousels);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$heading-text: (
	xs: (22, 27, 700, 36px),
	md: (26, 26, null, 54px),
	lg: (30, 37, null, 60px),
	xl: (35, 43),
);

.landing3 {
	@import "~assets/styles/_bootstrap-grid-custom.scss";

	font-size: 1rem;
	font-weight: 400;
	line-height: 1.286;
	font-family: $ff-gilroy;
	color: $body-color;
	overflow: hidden;

	&__wrapper {
		display: flex;
		flex-direction: column;

		&--odd {
			.landing3__accordion {
				order: 2;
			}
		}
	}

	&__banner {
		box-sizing: border-box;

		@include media-breakpoint-up(md) {
			box-sizing: content-box;
		}

		@include media-breakpoint-up(lg) {
			box-sizing: border-box;
		}
	}

	.hooper {
		$self: &;

		position: static;
		height: auto;

		&-slide {
			min-width: 100%;
		}

		&-pagination {
			position: static;
			transform: none;
			justify-content: center;
		}

		&-indicator {
			height: 8px;
			width: 8px;
			border-radius: 50%;
			margin-left: 4px;
			margin-right: 4px;
			background: #D1DCE8;
			opacity: .5;
			@include media-breakpoint-up(lg) {
				height: 10px;
				width: 10px;
				margin-left: 7px;
				margin-right: 7px;
			}

			&:hover,
			&.is-active {
				background: $primary;
				opacity: 1;
			}
		}

		&-indicators {
			> li {
				line-height: 0;
			}
		}

		&-indicator {
			background: #D1DCE8;

			&:hover,
			&.is-active {
				background: $primary;
			}
		}

		.hooper-prev,
		.hooper-next {
			color: $base-color;
		}

		&--inverted {
			.hooper-indicator {
				&:hover,
				&.is-active {
					background: $white;
				}
			}

			.hooper-prev,
			.hooper-next {
				color: $white;
			}
		}
	}

	&__heading {
		@include media-text($heading-text);

		text-align: center;
	}

	&__heading4 {
		font-size: calc_rem(16px);
		line-height: 1.67;
		font-weight: 700;
		margin-bottom: 22px;
		@include media-breakpoint-up(md) {
			font-size: calc_rem(18px);
		}
	}
}

</style>

<i18n
  locale="ru"
  lang="yaml"
  src="~/app/locale/layouts/landing/ru-RU.yml"
/>
<i18n
  locale="en"
  lang="yaml"
  src="~/app/locale/layouts/landing/en-US.yml"
/>
<i18n
  locale="es"
  lang="yaml"
  src="~/app/locale/layouts/landing/es-ES.yml"
/>
<i18n
  locale="pt"
  lang="yaml"
  src="~/app/locale/layouts/landing/pt-PT.yml"
/>
<i18n
  locale="tr"
  lang="yaml"
  src="~/app/locale/layouts/landing/tr-TR.yml"
/>
<i18n
  locale="de"
  lang="yaml"
  src="~/app/locale/layouts/landing/de-DE.yml"
/>
<i18n
  locale="it"
  lang="yaml"
  src="~/app/locale/layouts/landing/it-IT.yml"
/>
