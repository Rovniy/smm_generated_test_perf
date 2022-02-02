import { mapActions, mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			platform: 'services/platform',
			client: 'services/client',
			type: 'services/type',
			typedServices: 'services/typedServices',
		}),
		urlLower() {
			return this.urlLogin.toLowerCase()
		},
	},
	methods: {
		...mapActions({
			netServices: 'services/netServices',
			setService: 'services/setService',
			netCosts: 'services/netCosts',
		}),
		newPlatform(url) {
			const platforms = []
			if (url.includes('instagram.com') || url.includes('instagr.am')) {
				platforms.push('INSTAGRAM')
			}
			if (url.includes('tiktok.com')) {
				platforms.push('TIKTOK')
			}
			if (url.includes('youtube.com') || url.includes('youtu.be')) {
				platforms.push('YOUTUBE')
			}
			if (url.includes('vk.com') || url.includes('vkontakte.ru')) {
				platforms.push('VK')
			}
			if (
				platforms.length !== 1 // 0 -- no platforms in input, > 1 -- multiple platforms in input
			) {
				return false
			}
			return platforms[0]
		},
		newService(newPlatform, url) {
			let newType = this.type
			/**
			 * some type detection by url here
			 */
			if ('VK' === newPlatform) {
				if (url.includes('/club') || url.includes('/public')) {
					newType = 'TYPE_SUBS'
				}
				if (url.includes('/id')) {
					newType = 'TYPE_FRIENDS'
				}
			}
			/**
			 * TODO make some guesses
			 */
			if (!this.typedServices(newPlatform, this.client)[newType]) {
				return false
			}
			return this.typedServices(newPlatform, this.client)[newType][0]
		},
		async switchService(event = '') {
			const url = this.urlLower || event?.clipboardData?.getData('text') || ''
			const newPlatform = this.newPlatform(url)
			if (!newPlatform || newPlatform === this.platform) { // we've got no or same platform
				return
			}

			await Promise.all([
				this.netServices({ client: this.client, platform: newPlatform }),
				this.netCosts({ client: this.client, platform: newPlatform }),
			])

			const newService = this.newService(newPlatform, url)

			if (!newService) {
				return
			}
			this.setService(newService)
		},
	},
}
