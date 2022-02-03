/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */

export const state = () => ({
	levels: [],
})

export const getters = {
	levels: state => state.levels,
}

export const mutations = {
	setDiscountLevels(state, discount) {
		state.levels = discount
	},
}

export const actions = {
	async getDiscountLevel({ state, commit }) {
		if (state.levels.length) {
			return
		}
		const response = await this.$http.user.getStatuses()
		if (response.status !== 'success') {
			throw response
		}
		commit('setDiscountLevels', response.data)
	},
}
