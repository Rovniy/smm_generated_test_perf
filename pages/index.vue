<template src="~/app/templates/landing3.html" />

<script>
import Landing3 from '~/mixins/landing3.js'
import fetchServices from '~/middleware/fetchServices.js'

const PLATFORM = 'INSTAGRAM'

export default {
	mixins: [
		Landing3,
	],
	middleware: [
		'landingToCpRedirect',
		fetchServices(PLATFORM),
	],
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
					services: this.typed.TYPE_AUTOLIKES,
				}, {
					h2: this.$t('mobile_5_h2'),
					services: this.typed.TYPE_AUTOVIEWS,
				}, {
					h2: this.$t('mobile_6_h2'),
					services: this.typed.TYPE_STORIES,
				}]
				: [{
					h2: this.$t('desktop_h2'),
					services: [
						...this.typed.TYPE_LIKES,
						...this.typed.TYPE_SUBS,
						...this.typed.TYPE_VIEWS,
					],
				}, {
					h2: this.$t('desktop_h2'),
					services: [
						...this.typed.TYPE_AUTOVIEWS,
						...this.typed.TYPE_AUTOLIKES,
						...this.typed.TYPE_STORIES,
					],
				}]
		},
		accordionData() {
			return [
				{
					head: 'head_1',
					textList: [
						'text_1',
					],
				}, {
					head: 'head_2',
					textList: [
						'text_2_1',
						'text_2_2',
						'text_2_3',
						'text_2_4',
						'text_2_5',
						'text_2_6',
					],
				}, {
					head: 'head_3',
					textList: [
						'text_3',
						'text_3_1',
						'text_3_2',
					],
				}, {
					head: 'head_4',
					textList: [
						'text_4_1',
						'text_4_2',
					],
				}, {
					head: 'head_5',
					textList: [
						'text_5',
					],
				}, {
					head: 'head_6',
					textList: [
						{
							text: 'text_6',
							replaceList: [
								{
									substr: '{PRICE}',
									newstr: this.serviceMinPrice,
								}, {
									substr: '{SERVICE}',
									newstr: this.serviceMinStr,
								},
							],
						},
					],
				}, {
					head: 'head_7',
					textList: [
						'text_7_1',
					],
				}, {
					head: 'head_8',
					textList: [
						'text_8_1',
					],
				}, {
					head: 'instagram_head',
					textList: [
						'instagram_head_1',
						'instagram_head_2',
					],
				},
			]
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
					h3: this.$t('question_4_h3'),
					body: [
						`${this.$t('question_4_body_1')}
              <br> ${this.$t('question_4_body_2')}
              <br> ${this.$t('question_4_body_3')}
              <br> ${this.$t('question_4_body_4')}
              <br> ${this.$t('question_4_body_5')}`,
					],
				}, {
					h3: this.$t('question_3_h3'),
					body: [
						this.$t('question_3_body_1'),
						this.$t('question_3_body_2'),
						this.$t('question_3_body_3'),
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

<style src="assets/styles/landing3/_instagram.scss" lang="scss" />

<i18n locale="ru" lang="yaml" src="~/app/locale/pages/instagram/ru-RU.yml" />
<i18n locale="en" lang="yaml" src="~/app/locale/pages/instagram/en-US.yml" />
<i18n locale="es" lang="yaml" src="~/app/locale/pages/instagram/es-ES.yml" />
<i18n locale="pt" lang="yaml" src="~/app/locale/pages/instagram/pt-PT.yml" />
<i18n locale="tr" lang="yaml" src="~/app/locale/pages/instagram/tr-TR.yml" />
<i18n locale="de" lang="yaml" src="~/app/locale/pages/instagram/de-DE.yml" />
<i18n locale="it" lang="yaml" src="~/app/locale/pages/instagram/it-IT.yml" />
