<template src="~/app/templates/landing3.html" />

<script>
import Landing3 from '~/mixins/landing3.js'
import fetchServices from '~/middleware/fetchServices.js'

const PLATFORM = 'TIKTOK'

export default {
	mixins: [
		Landing3,
	],
	middleware: [ fetchServices(PLATFORM) ],
	computed: {
		pagePlatform() {
			return PLATFORM
		},
		carousels() {
			return this.isLandingMobile
				? [{
					h2: this.$t('mobile_2_h2'),
					services: this.typed.TYPE_LIKES,
				}, {
					h2: this.$t('mobile_1_h2'),
					services: this.typed.TYPE_SUBS,
				}, {
					h2: this.$t('mobile_3_h2'),
					services: this.typed.TYPE_VIEWS,
				}, {
					h2: this.$t('mobile_4_h2'),
					services: this.typed.TYPE_AUTOVIEWS,
				}, {
					h2: this.$t('mobile_5_h2'),
					services: this.typed.TYPE_AUTOLIKES,
				}, {
					h2: this.$t('mobile_6_h2'),
					services: this.typed.TYPE_REPOSTS,
				}]
				: [{
					h2: this.$t('desktop_h2'),
					services: [
						this.typed.TYPE_LIKES[0],
						this.typed.TYPE_SUBS[0],
						this.typed.TYPE_VIEWS[0],
					],
				}, {
					h2: this.$t('desktop_h2'),
					services: [
						this.typed.TYPE_AUTOVIEWS[0],
						this.typed.TYPE_AUTOLIKES[0],
						this.typed.TYPE_REPOSTS[0],
					],
				}]
		},
		seo() {
			return {
				h2: this.$t('seo_button'),
				questions: [{
					h3: this.$t('question_2_h3'),
					body: [
						this.$t('question_2_body_1'),
						`${this.$t('question_2_body_2')}
              <br> ${this.$t('question_2_body_3')}
              <br> ${this.$t('question_2_body_4')}`,
					],
				}, {
					h3: this.$t('question_3_h3'),
					body: [
						this.$t('question_3_body_1'),
						this.$t('question_3_body_2'),
					],
				}, {
					h3: this.$t('question_4_h3'),
					body: [
						`${this.$t('question_4_body_1')}
              <br> ${this.$t('question_4_body_2')}
              <br> ${this.$t('question_4_body_3')}
              <br> ${this.$t('question_4_body_4')}
              <br> ${this.$t('question_4_body_5')}`,
					],
				}, {
					h3: this.$t('question_1_h3'),
					body: [
						this.$t('question_1_body_1'),
					],
				}],
			}
		},
	},
}
</script>

<style
  src="assets/styles/landing3/_tiktok.scss"
  lang="scss"
/>

<i18n
  locale="ru"
  lang="yaml"
  src="~/app/locale/pages/tiktok/ru-RU.yml"
/>
<i18n
  locale="en"
  lang="yaml"
  src="~/app/locale/pages/tiktok/en-US.yml"
/>
<i18n
  locale="es"
  lang="yaml"
  src="~/app/locale/pages/tiktok/es-ES.yml"
/>
<i18n
  locale="pt"
  lang="yaml"
  src="~/app/locale/pages/tiktok/pt-PT.yml"
/>
<i18n
  locale="tr"
  lang="yaml"
  src="~/app/locale/pages/tiktok/tr-TR.yml"
/>
<i18n
  locale="de"
  lang="yaml"
  src="~/app/locale/pages/tiktok/de-DE.yml"
/>
<i18n
  locale="it"
  lang="yaml"
  src="~/app/locale/pages/tiktok/it-IT.yml"
/>
