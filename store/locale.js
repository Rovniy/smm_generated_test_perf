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
	async init({ commit }) {
		try {
			const response = await this.$http.region()
			if (response.status !== 'success') {
				throw response
			}
			if (
				process.server
		        && 'CIS' === response.data.region
        		&& !this.$cookiz.get('i18n_region')
        		&& !this.$ua.isFromCrawler()
			) {
				this.$i18n.setLocaleCookie('ru')
				this.$cookiz.set('i18n_region', 'ru')
			}
			commit('data', response.data)
		}
		catch (e) {
			console.error(e)
		}
	},
	clientInit({ state, commit, dispatch }) {
		if (state.inited) {
			return
		}
		commit('inited')
		dispatch('init')
	},
}
