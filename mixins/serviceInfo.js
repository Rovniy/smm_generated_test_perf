import { mapGetters } from 'vuex'
import get from 'lodash/get'

import Money from '@/components/_library/Money.vue'

export default {
	components: {
		Money,
	},
	computed: {
		...mapGetters({
			hasGreenToggle: 'userRoles/hasGreenToggle',
			numerositiedService: 'services/numerositiedService',
			loyaltyCost: 'services/loyaltyCost',
			fullCost: 'services/fullCost',
		}),
		cost() {
			return this.loyaltyCost(
				this.service?.tag,
				100,
				this.service?.platform.toUpperCase(),
				'CLIENT_LK',
			).cost
		},
		min() {
			return get(this.service, this.hasGreenToggle ? 'min' : 'min_order', 0)
		},
		max() {
			return get(this.service, this.hasGreenToggle ? 'max' : 'max_order', 0)
		},
		speedRange() {
			if (this.service?.order_speed?.includes('-')) {
				return this.service?.order_speed.split('-')
			}
			return false
		},
		speed() {
			return parseInt(this.service?.order_speed || 0)
		},
		frequency() {
			return this.service.order_frequency || 'day'
		},
	},
	methods: {
		costNoDiscount(tag) {
			return this.fullCost(
				tag,
				100,
				this.service.platform.toUpperCase(),
				'CLIENT_LK',
			)
		},
		getTitle(tag) {
			const name = this.$t(tag)
			switch (tag) {
				case 'INSTAGRAM_SUBS_LK':
				case 'TIKTOK_SUBS_LK':
				case 'YOUTUBE_SUBS_LK':
					return `${this.$t('STR_TYPE_SUBS')} ${name.toLowerCase()}`
				case 'INSTAGRAM_VIEWS_VIDEO_LK':
				case 'TIKTOK_VIEWS_LK':
					return `${this.$t('STR_TYPE_VIEWS')} ${name.toLowerCase()}`
				case 'INSTAGRAM_VIEWS_IGTV_LK':
				case 'INSTAGRAM_VIEWS_STORY_LK':
					return `${this.$t('STR_TYPE_VIEWS')} ${name}`
				case 'INSTAGRAM_COMMENTS_CUSTOM_LK':
				case 'INSTAGRAM_MULTI_COMMENTS_POSITIVE_LK':
				case 'INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK':
				case 'TIKTOK_COMMENTS_CUSTOM_LK':
					return `${this.$t('STR_TYPE_COMMENTS')} ${name.toLowerCase()}`
				case 'TIKTOK_REPOSTS_LK':
					return `${this.$t('STR_TYPE_REPOSTS')} ${name.toLowerCase()}`
				default:
					return name
			}
		},
	},
}
