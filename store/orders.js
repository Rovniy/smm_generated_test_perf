export const state = () => ({
	orderState: {},
})

export const getters = {
	orderState(state) {
		return state.orderState
	},
}

export const mutations = {
	setOrderState(state, { key, value }) {
		state.orderState[key] = value
	},
}
