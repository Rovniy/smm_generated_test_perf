import {
	mapGetters,
} from 'vuex'

import Header from '@/components/Landing3/Header.vue'
import Banner from '@/components/Landing3/Banner.vue'
import Carousels from '@/components/Landing3/Carousels.vue'
import Accordion from '@/components/Landing3/Accordion.vue'
import Features from '@/components/Landing3/Features.vue'
import Thanks from '@/components/Landing3/Thanks.vue'

import Currency from '~/mixins/currency.js'

const SERVICE_MIN_COUNT = 100

export default {
	layout: 'landing3',
	mixins: [
		Currency,
	],
	auth: false,
	components: {
		Header,
		Banner,
		Carousels,
		Accordion,
		Features,
		Thanks,
	},
	head() {
		return {
			title: this.seoTitle,
			meta: [{
				hid: 'description',
				name: 'description',
				content: this.seoDescription,
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
	},
	data() {
		return {
			isReadyToShow: true,
			landingWrapperOdd: false,
			bannerImage: null,
		}
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
			typedServices: 'services/typedServices',
			minCost: 'services/minCost',
		}),
		typed() {
			return this.typedServices(this.pagePlatform)
		},
		cssClass() {
			return `${this.pagePlatform.toLowerCase()}-page`
		},
		promoImageSize() {
			switch (this.pagePlatform) {
				case 'INSTAGRAM':
					return {
						width: 512,
						height: 425,
						sizes: 'xs:100vw sm:338px md:363px lg:441px xl:512px',
					}
				case 'TIKTOK':
					return {
						width: 324,
						height: 360,
						sizes: 'xs:100vw sm:273px md:324px lg:403px xl:430px',
					}
				case 'VK':
					return {
						width: 611,
						height: 458,
						sizes: 'xs:100vw sm:373px md:416px lg:516px xl:611px',
					}
				case 'YOUTUBE':
					return {
						width: 530,
						height: 482,
						sizes: 'xs:100vw sm:319px md:370px lg:457px xl:529px',
					}
			}
		},
		// promoImg() {
		//   return require(`~/assets/svg/landing3/${this.pagePlatform.toLowerCase()}/promo.svg`);
		// },
		// инлайн svg тут не нужен, он не интерактивен
		// promoComponent() {
		//   return () => import(`~/assets/svg/landing3/${this.pagePlatform.toLowerCase()}/promo.svg?inline`);
		// },
		keyGroupIndex() {
			return this.isLandingMobile
				? 'mobile'
				: 'desktop'
		},
		seoTitle() {
			return this.$t('seo_title')
		},
		seoDescription() {
			return this.$t('seo_description')
		},
		promoButton() {
			return {
				text: this.$t('banner_btn'),
				platform: this.pagePlatform,
				isDark: false,
			}
		},
		banner() {
			return {
				heading1: this.$t('banner_heading1'),
				heading2: this.$t('banner_heading2'),
				text1: this.$t('banner_text1'),
			}
		},
		features() {
			return [
				[{
					icon: 'feature1',
					title: this.$t('features_1_h3'),
					text: this.$t('features_1_p'),
				}, {
					icon: 'feature2',
					title: this.$t('features_2_h3'),
					text: this.$t('features_2_p').replace('{PRICE}', this.serviceMinPrice),
				}, {
					icon: 'feature4',
					title: this.$t('features_4_h3'),
					text: this.$t('features_4_p'),
				}], [{
					icon: 'feature3',
					title: this.$t('features_3_h3'),
					text: this.$t('features_3_p'),
				}, {
					icon: 'feature5',
					title: this.$t('features_5_h3'),
					text: this.$t('features_5_p'),
				}, {
					icon: 'feature6',
					title: this.$t('features_6_h3'),
					text: this.$t('features_6_p'),
				}]]
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
				},
			]
		},
		serviceMinPrice() {
			return this.getCurrencyString(this.minCost(this.pagePlatform))
		},
		serviceMinStr() {
			return `${SERVICE_MIN_COUNT} ${this.$t('service')}`
		},
		bannerSrc() {
			return require(`~/assets/svg/landing3/${this.pagePlatform.toLowerCase()}/promo.svg`)
		},
	},
	beforeCreate() {
		process.browser && (this.isReadyToShow = false)
	},
	watch: {
		$route() {
			this.bannerImage.src = this.bannerSrc
		},
	},
	mounted() {
		this.bannerImage = new Image(this.promoImageSize.width, this.promoImageSize.height)
		this.bannerImage.onload = () => ctx.drawImage(this.bannerImage, 0, 0)
		this.bannerImage.src = this.bannerSrc

		const canvas = document.querySelector('#banner')
		const ctx = canvas.getContext('2d')
		ctx.canvas.height = this.promoImageSize.height
		ctx.canvas.width = this.promoImageSize.width

		process.browser && this.$nextTick(() => (this.isReadyToShow = true))
	},
}
