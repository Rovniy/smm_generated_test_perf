export const state = () => ({
	pending: true,
})

export const getters = {
	pending: state => state.pending,
}

export const mutations = {
	setPending: (state, value) => {
		state.pending = value
	},
}
