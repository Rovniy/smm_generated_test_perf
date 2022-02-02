import get from 'lodash/get'

import { SERVICES_CONFIG } from '@/app/serviceConfig.js'

export default {
	computed: {
		serviceConfig() {
			return SERVICES_CONFIG(this.numerositiedTag, this.validationMin, this.validationMax)
		},
		errorHints() {
			return {
				urlLogin: {
					required: this.$t('required'),
					validateInstagramLogin: this.$t('validate_instagram_login'),
					validateInstagramLoginOrAccountOrStory: this.$t('validate_instagram_login_or_account_or_story'),
					validateInstagramLoginOrAccountOrVideo: this.$t('validate_instagram_login_or_account_or_video'),
					validateInstagramLoginOrAccount: this.$t('validate_instagram_login_or_account'),
					validateInstagramPost: this.$t('validate_instagram_post'),
					validateInstagramVideo: this.$t('validate_instagram_video'),
					validateInstagramPostReel: this.$t('validate_instagram_video'),
					validateInstagramTvReel: this.$t('validate_instagram_video'),
					validateInstagramIgtv: this.$t('validate_instagram_igtv'),
					validateVkPost: this.$t('validate_vk_post'),
					validateVkLoginOrAccount: this.$t('validate_vk_login_or_account'),
					validateVkLoginOrGroup: this.$t('validate_vk_login_or_group'),
					validateTiktokLoginOrAccount: this.$t('validate_tiktok_login_or_account'),
					validateTiktokVideo: this.$t('validate_tiktok_video'),
					validateYoutubeLoginOrAccount: this.$t('validate_youtube_login_or_account'),
					validateYoutubeVideo: this.$t('validate_youtube_video'),
				},
				quantityMin: {
					required: this.$t('required'),
					numeric: this.$t('validate_natural_number'),
					minValue: `${this.$t('min')}: ${this.serviceConfig.quantity?.min || ''}`,
					maxValue: `${this.$t('max')}: ${this.quantityMax || this.serviceConfig.quantity?.max || ''}`,
				},
				quantityMax: {
					required: this.$t('required'),
					numeric: this.$t('validate_natural_number'),
					minValue: `${this.$t('min')}: ${this.quantityMin || this.serviceConfig.quantity?.min || ''}`,
					maxValue: `${this.$t('max')}: ${this.serviceConfig.quantity?.max || ''}`,
				},
				quantity: {
					required: this.$t('required'),
					numeric: this.$t('validate_natural_number'),
					minValue: `${this.$t('min')}: ${this.serviceConfig.quantity?.min || ''}`,
					maxValue: `${this.$t('max')}: ${this.serviceConfig.quantity?.max || ''}`,
				},
				postQuantity: {
					required: this.$t('required'),
					numeric: this.$t('validate_natural_number'),
					minValue: `${this.$t('min')}: ${this.serviceConfig.postQuantity?.min || ''}`,
					maxValue: `${this.$t('max')}: ${this.serviceConfig.postQuantity?.max || ''}`,
				},
				comments: {
					required: this.$t('required'),
				},
				target1: {
					required: this.$t('required'),
					numeric: this.$t('validate_natural_number'),
				},
				target2: {
					required: this.$t('required'),
					numeric: this.$t('validate_natural_number'),
				},
			}
		},
	},
	methods: {
		getFieldV(field, index) {
			const v = get(this.$v, field, null)
			return null === index ? v : get(v?.$each, index, null)
		},
		fieldError(field, index = null) {
			return this.getFieldV(field, index)?.$error
		},
		fieldValid(field, index = null) {
			return this.getFieldV(field, index)?.$dirty && !this.getFieldV(field, index)?.$error
		},
		fieldErrorHint(field, index = null) {
			const hintType = Object.keys(this.errorHints[field])?.find(
				hintKey => !get(this.getFieldV(field, index), (null === index ? '' : 'text.') + hintKey, true),
			)
			return get(this.errorHints[field], hintType, '')
		},
	},
}
