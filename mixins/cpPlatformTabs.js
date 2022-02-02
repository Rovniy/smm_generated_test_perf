import {
	mapGetters,
	mapMutations,
	mapActions,
} from 'vuex'

import fetchServices from '@/middleware/fetchServices.js'

export default {
	computed: {
		...mapGetters({
			pending: 'loading/pending',
			platform: 'services/platform',
			platforms: 'services/platforms',
		}),
		tabs() {
			return this.platforms.map(tab => ({
				id: tab,
				label: this.$t(tab),
			}))
		},
	},
	methods: {
		...mapMutations({
			setPending: 'loading/setPending',
		}),
		...mapActions({
			setPlatform: 'services/setPlatform',
		}),
		async changePlatform(platform) {
			if (this.pending) {
				return
			}
			this.setPending(true)
			try {
				await fetchServices(platform, 'CLIENT_LK')({ store: this.$store })
				this.setPlatform(platform)
			}
			finally {
				this.setPending(false)
			}
		},
	},
}
