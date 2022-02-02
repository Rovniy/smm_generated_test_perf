import {
	mapGetters,
} from 'vuex'

import VkConnect from '~/components/auth/vkConnect.vue'
import FbConnect from '~/components/auth/fbConnect.vue'
import Modal from '~/components/auth/Modal.vue'

import notification from '~/mixins/notification.js'
import Currency from '@/mixins/currency.js'

export default {
	components: {
		VkConnect,
		FbConnect,
		Modal,
	},
	data() {
		return {
			modal: false,
			user: null,
			ref: null,
			pending: false,
		}
	},
	mixins: [
		notification,
		Currency,
	],
	watch: {
		'$auth.loggedIn'() {
			return 'user' === this.role
				? this.$router.push(
					this.localePath(
						'/cp',
						this.$auth.user.lang,
					),
				)
				: window.location.assign(this.$config.urls.admin)
		},
	},
	computed: {
		...mapGetters('userRoles', [ 'role' ]),
	},
	methods: {
		addEmail(user) {
			this.user = user
			this.modal = true
		},
		close() {
			this.modal = false
		},
		async auth(email) {
			if (this.pending) {
				return
			}
			this.pending = true
			const { data } = await this.$auth.loginWith(
				'uLoginByData', {
					data: {
						data: {
							...this.user,
							...this.ref && { ref_code: this.ref },
							email,
							lang: this.$i18n.locale,
							cur: this.currency,
						},
					},
				},
			)
			if (data.status !== 'success' || !this.$auth.loggedIn) {
				this.notification(this.$t('user_already_exists'), '', 'error')
				this.pending = false // только на ошибке, если все ок, то пусть крутит до перехода в кабинет;
			}
		},
	},
	beforeMount() {
		this.ref = this.$cookiz.get('smmtouch_ref_token') || null
	},
}
