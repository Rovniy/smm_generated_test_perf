<template src="~/app/templates/landing3.html" />

<script>
import Landing3 from '~/mixins/landing3.js'
import fetchServices from '~/middleware/fetchServices.js'

const PLATFORM = 'VK'

export default {
	nuxtI18n: {
		paths: {
			en: '/buy-vk-comments',
			es: '/comprar-comentarios-vkontakte',
			pt: '/comprar-comentarios-vkontakte',
			tr: '/vk-yorum-satin-al',
			de: '/kaufen-kommentare-in-vkontakte',
			it: '/acquistare-commenti-vkontakte',
		},
	},
	mixins: [
		Landing3,
	],
	middleware: [ fetchServices(PLATFORM) ],
	data() {
		return {
			landingWrapperOdd: true,
		}
	},
	computed: {
		pagePlatform() {
			return PLATFORM
		},
		carousels() {
			return [{
				h2: this.$t('h2_1'),
				keyGroupIndex: this.keyGroupIndex,
				services: this.typed.TYPE_COMMENTS,
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
						this.$t('question_2_body_5')
							.replace('{PRICE}', this.serviceMinPrice)
							.replace('{SERVICE}', this.serviceMinStr),
						this.$t('question_2_body_6'),
					],
				}, {
					h3: this.$t('question_1_h3'),
					body: [
						this.$t('question_1_body_1'),
						this.$t('question_1_body_2'),
						`${this.$t('question_1_body_3')}
              <br> ${this.$t('question_1_body_4')}
              <br> ${this.$t('question_1_body_5')}
              <br> ${this.$t('question_1_body_6')}`,
						{
							text: this.$t('question_1_body_7'),
							to: {
								path: this.localePath('uslugi-kommentarii-v-vkontakte', this.$i18n.locale),
								hash: 'services',
							},
							title: this.$t('question_1_link_title'),
							link: this.$t('question_1_link_text'),
						},
					],
				}, {
					h3: this.$t('question_3_h3'),
					body: [
						this.$t('question_3_body_1'),
						this.$t('question_3_body_2'),
						this.$t('question_3_body_3'),
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
				}],
			}
		},
		service() {
			return 'VK_COMMENTS_MAIN'
		},
	},
}
</script>

<style
  src="assets/styles/landing3/_vk.scss"
  lang="scss"
/>

<i18n
  locale="ru"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/ru-RU.yml"
/>
<i18n
  locale="en"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/en-US.yml"
/>
<i18n
  locale="es"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/es-ES.yml"
/>
<i18n
  locale="pt"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/pt-PT.yml"
/>
<i18n
  locale="tr"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/tr-TR.yml"
/>
<i18n
  locale="de"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/de-DE.yml"
/>
<i18n
  locale="it"
  lang="yaml"
  src="~/app/locale/pages/uslugi/kommentarii-v-vkontakte/index/it-IT.yml"
/>
