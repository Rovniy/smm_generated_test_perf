export const state = () => ({
	savedFilter: null,
})

export const getters = {
	savedFilter: state => state.savedFilter,
}

export const mutations = {
	SAVE_FILTER(state, filterData) {
		state.savedFilter = { ...state.savedFilter, ...filterData }
	},
}

export const actions = {
	saveFilter({ commit }, filterData) {
		commit('SAVE_FILTER', filterData)
	},
	loadFilter({ state }) {
		return state.savedFilter
	},
}
