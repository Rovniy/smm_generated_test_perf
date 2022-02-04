const CURRENCY_REGION_MAP = {
	RUB: 'CIS',
	USD: 'USA',
	EUR: 'EUROPE',
	BRL: 'BRAZIL',
}
export const state = () => ({
	data: {},
	inited: false,
})

export const getters = {
	region(state, _, rootState) {
		if (rootState.auth.user) {
			return CURRENCY_REGION_MAP[rootState.auth.user.cur]
		}
		if ('ru' === rootState.i18n.locale) {
			return 'CIS'
		}
		return state.data.region
	},
	currency(_, getters) {
		switch (getters.region) {
			case 'CIS':
				return 'RUB'
			case 'EUROPE':
				return 'EUR'
			case 'BRAZIL':
				return 'BRL'
			default:
				return 'USD'
		}
	},
	rub(_, getters) {
		return 'RUB' === getters.currency
	},
}

export const mutations = {
	inited(state) {
		state.inited = true
	},
	data(state, newData) {
		state.data = newData
	},
}

export const actions = {
	getRegion({ commit, getters, rootState }) {
		if (getters.region) {
			return getters.region
		}

		return this.$http.region()
			.then(({ status, data }) => {
				if (status !== 'success') {
					throw status
				}
				if ('CIS' === data.region
					&& !this.$cookiz.get('i18n_region')
					&& !this.$ua.isFromCrawler()
				) {
					this.$i18n.setLocaleCookie('ru')
					this.$cookiz.set('i18n_region', 'ru')
				}

				commit('data', data)

				return data
			})
			.then(data => {
				if ('ru' === rootState.i18n.locale) {
					return 'CIS'
				}
				return data.region
			})
	},
	clientInit({ state, commit, dispatch }) {
		if (state.inited) {
			return
		}
		commit('inited')
		dispatch('getRegion')
	},
}
