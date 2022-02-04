/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
export const state = () => ({
	currentDevice: null,
	screenWidth: null,

	// landing3 update
	isLandingMobile: null,
	landingScreenWidth: 0,
})

export const getters = {
	screenWidth: state => state.screenWidth,
	currentDevice: state => state.currentDevice,
	isCurrentDeviceSet: state => state.isCurrentDeviceSet,
	isSmPhone(state) {
		return 'smPhone' === state.currentDevice
	},
	isLgPhone(state) {
		return 'lgPhone' === state.currentDevice
	},
	isPhone(state, getters) {
		return getters.isSmPhone || getters.isLgPhone
	},
	isTablet(state) {
		return 'tablet' === state.currentDevice
	},
	isLaptop(state) {
		return 'laptop' === state.currentDevice
	},
	isDesktop(state) {
		return 'desktop' === state.currentDevice
	},
	isMobile(state, getters) {
		return getters.isPhone || getters.isTablet
	},

	// landing3 update
	isLandingMobile: state => state.isLandingMobile,
	landingScreenWidth: state => state.landingScreenWidth,
}

export const mutations = {
	setCurrentDevice(state, value) {
		state.currentDevice = value
	},
	setScreenWidth(state, value) {
		state.screenWidth = value
	},

	// landing3 update
	setIsLandingMobile(state, value) {
		state.isLandingMobile = value
	},
	setLandingScreenWidth(state, value) {
		state.landingScreenWidth = value
	},
}

export const actions = {
	getWidthDevice({ commit }, { $device }) {
		const currentScreenWidth = document.documentElement.clientWidth
		let currentDevice = 'smPhone'

		if (currentScreenWidth < 400) {
			currentDevice = 'smPhone'
		}
		else if (currentScreenWidth < 768) {
			currentDevice = 'lgPhone'
		}
		else if (currentScreenWidth < 1024) {
			currentDevice = 'tablet'
		}
		else if (currentScreenWidth < 1200) {
			currentDevice = 'laptop'
		}
		else {
			currentDevice = 'desktop'
		}

		commit('setCurrentDevice', currentDevice)
		commit('setScreenWidth', currentScreenWidth)

		// landing3 update
		const landingWindowWidth = window.innerWidth
		// commit('setIsLandingMobile', landingWindowWidth < 660);
		commit('setLandingScreenWidth', landingWindowWidth)
		commit('setIsLandingMobile', $device.isMobile)
	},

	getAgentDevice({ commit }, { $device }) {
		let currentDevice = 'smPhone'
		if ($device.isMobile) {
			currentDevice = 'smPhone'
		}
		else if ($device.isTablet) {
			currentDevice = 'tablet'
		}
		else if ($device.isDesktop) {
			currentDevice = 'desktop'
		}
		commit('setCurrentDevice', currentDevice)

		// landing3 update
		commit('setIsLandingMobile', $device.isMobile)
	},
}
