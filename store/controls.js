/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
export const state = () => ({
	isBackdropActive: false,
	dropdownName: null,
})

export const getters = {
	getDropdownName: state => state.dropdownName,
	isDropdownActive: state => name => name === state.dropdownName,
	isBackdropActive: state => state.isBackdropActive,
}

export const mutations = {
	setDropdownName(state, name) {
		state.dropdownName = (state.dropdownName !== name) ? name : null
	},
	setBackdropActive(state, isActive) {
		state.isBackdropActive = isActive
	},
}

export const actions = {
	toggleDropdown({ commit, state }, name) {
		if (name !== state.dropdownName) {
			commit('setDropdownName', name)
			if (state.dropdownName) {
				commit('setBackdropActive', true)
			}
			else {
				commit('setBackdropActive', false)
			}
		}
	},
	toggleBackdrop({ commit, state }, isActive) {
		if (isActive !== state.isBackdropActive) {
			commit('setBackdropActive', false)
			commit('setDropdownName', null)
		}
	},
}
