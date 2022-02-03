import get from 'lodash/get'
import notification from '~/mixins/notification.js'
import Currency from '@/mixins/currency.js'

export default {
	props: {
		refer: {
			type: String,
			default: null,
		},
	},
	mixins: [
		notification,
		Currency,
	],
	beforeMount() {
		if (window.socialLogin) {
			return
		}
		window.socialLogin = async uLoginToken => {
			const uLoginTokenData = {
				token: uLoginToken,
				host: `${window.location.protocol}//${window.location.host}`,
				...this.refer && { ref_code: this.refer },
			}
			try {
				const response = await this.$http.uLoginByToken(uLoginTokenData)
				if (response.status !== 'success') {
					throw response
				}
				const token = get(response, 'data.token', false)
				if (token) {
					await this.$auth.loginWith(
						'uLoginByToken', {
							data: uLoginTokenData,
						},
					)
				}
				else if (get(response, 'data.data.email', false)) {
					await this.uLoginByData(uLoginTokenData, get(response, 'data.data', null))
				}
				else {
					this.$emit('addEmail', get(response, 'data.data', null))
				}
			}
			catch (e) {
				this.notification(this.$t('user_already_exists_1'), '', 'error')
				console.error(e)
			}
		}
	},
	mounted() {
		if (window.uLogin) {
			window.uLogin.customInit(this.id)
		}
	},
	methods: {
		async uLoginByData(tokenData, uLoginData) {
			try {
				const response = await this.$auth.loginWith(
					'uLoginByData', {
						data: {
							data: {
								...tokenData,
								...uLoginData,
								lang: this.$i18n.locale,
								cur: this.currency,
							},
						},
					},
				)
				if (response.status !== 200 || response.data.status !== 'success') {
					throw response
				}
			}
			catch (e) {
				this.notification(this.$t('user_already_exists_1'), '', 'error')
				console.error(e)
			}
		},
	},
}
