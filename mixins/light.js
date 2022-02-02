import fetchServices from '~/middleware/fetchServices.js'

function loginRegex(login, minLength = 1) {
	const regex = new RegExp(`^[0-9a-zA-Z_.@]{${minLength},}$`)
	return regex.test(login)
}

export default {
	data: () => ({
		isLoading: false,
	}),
	middleware: [
		fetchServices('TIKTOK'),
		async({ store, params, redirect }) => {
			if (params.login) {
				if (!loginRegex(params.login)) {
					redirect('/light')
				}
				await store.dispatch('light/getScrapperData', params.login)
				if (!store.state.light.profile || !store.state.light.postList.length) {
					redirect('/light')
				}
				store.commit('light/setMenuSlug', store.state.light.postList.length
					? 'likes'
					: 'followers',
				)
			}
		},
	],
	methods: {
		validateLogin(login, minLength) {
			return loginRegex(login, minLength)
		},
	},
}
