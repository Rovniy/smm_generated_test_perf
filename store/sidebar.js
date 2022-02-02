/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
export const state = () => ({
	minimized: false,
	manuallyFixed: false,
	mobileMenuOpened: false,
})

export const getters = {
	isMinimized: state => state.minimized,
	isManuallyFixed: state => state.manuallyFixed,
	isMobileMenuOpened: state => state.mobileMenuOpened,
}

export const mutations = {
	setMinimized(state, value) {
		state.minimized = value
	},
	setManuallyFixed(state, value) {
		state.manuallyFixed = value
	},
	setMobileMenuOpened(state, value) {
		state.mobileMenuOpened = value
	},
}
