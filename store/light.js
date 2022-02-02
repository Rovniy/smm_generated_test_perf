import views from '~/assets/svg/service-icons/views.svg'
import likes from '~/assets/svg/service-icons/likes.svg'
import followers from '~/assets/svg/service-icons/followers.svg'

function clearLogin(login) {
	return '@' === login[0]
		? login.slice(1)
		: login
}

export const state = () => ({
	postList: [],
	profile: null,
	postIndex: null,
	slug: 'likes',
	errorCode: 0,
	menuList: [{
		name: 'Подписчики', // page name
		name2: 'подписчиков', // page name родительный падеж
		title: 'Подписчики', // link title
		slug: 'followers',
		icon: followers,
		tag: 'TIKTOK_SUBS_MAIN',
		type: 'TYPE_SUBS',
	}, {
		name: 'Лайки',
		name2: 'лайков',
		title: 'Лайки',
		slug: 'likes',
		icon: likes,
		tag: 'TIKTOK_LIKES_MAIN',
		type: 'TYPE_LIKES',
	}, {
		name: 'Просмотры',
		name2: 'просмотов',
		title: 'Просмотры',
		slug: 'views',
		icon: views,
		tag: 'TIKTOK_VIEWS_MAIN',
		type: 'TYPE_VIEWS',
	}],
})

export const getters = {
	postIndex: state => state.postIndex,
	postList: state => state.postList,
	profile: state => state.profile,
	slug: state => state.slug,
	menuList: state => state.menuList,
	post(state) {
		return state.postList[state.postIndex]
	},
	isFollowers(state) {
		return 'followers' === state.slug
	},
	menu(state) {
		return state.menuList.find(item => item.slug === state.slug)
	},
	error(state) {
		if (1 === state.errorCode) {
			return 'Временные технические неполадки. <br> Попробуйте повторить через несколько минут.'
		}
		if (2 === state.errorCode) {
			return 'Неверный логин TikTok <br> Попробуйте еще раз'
		}
		return ''
	},
}

export const mutations = {
	setErrorCode(state, value) {
		state.errorCode = value
	},
	setPostIndex(state, value) {
		state.postIndex = value
	},
	setMenuSlug(state, value) {
		state.slug = value
	},
	setServiceList(state, value) {
		state.serviceList = value
	},
	mergePostProps(state, { trueProps, falseProps }) {
		if (state.postList) {
			state.postList = state.postList.map((item, index) => ({
				...item,
				...(index === state.postIndex ? trueProps : falseProps),
			}))
		}
	},
	setProfile(state, profile) {
		state.profile = profile
	},
	setPostsList(state, posts) {
		state.postList = posts
	},
	resetIndex(state) {
		state.postIndex = null
	},
	resetData(state) {
		state.profile = null
		state.postList = []
		state.postIndex = null
		state.errorCode = 0
	},
}

export const actions = {
	setPost({ commit, state, dispatch }, index) {
		if (state.postIndex) {
			dispatch('resetPost')
		}
		else {
			commit('setPostIndex', index)
			commit('mergePostProps', { trueProps: { visible: true }, falseProps: { visible: false } })
		}
	},

	resetPost({ commit }) {
		commit('resetIndex')
		commit('mergePostProps', { falseProps: { visible: true } })
	},

	resetError({ commit }) {
		commit('setErrorCode', 0)
	},

	setMenu({ commit, dispatch }, slug) {
		commit('setMenuSlug', slug)
		dispatch('resetPost')
	},

	async getScrapperData({ commit, state }, login) {
		const lgn = clearLogin(login)
		if (state.profile && state.profile.login === lgn) {
			return
		}
		const response = await Promise.all([
			this.$http.getTiktokProfile(lgn),
			this.$http.getTiktokFeed(lgn),
		])
		// console.log(response);
		// if ('success' !== response[0].status) {
		//   throw JSON.stringify(response[0]);
		// }
		commit('setProfile', response[0].sdata)
		if (null === response[0].sdata.login) {
			commit('setErrorCode', 1)
		}
		else if (response[0].sdata.error) {
			commit('setErrorCode', 2)
		}
		// if ('success' !== response[1].status) {
		//   throw JSON.stringify(response[1]);
		// }
		commit('setPostsList', response[1].sdata)
		if (!response[1].sdata.length) {
			commit('setErrorCode', 1)
		}
	},
}
