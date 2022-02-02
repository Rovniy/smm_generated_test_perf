import get from 'lodash/get'

const NUMEROSITY_SINGLE = 'single'
const NUMEROSITY_MULTIPLE = 'multiple'
const CURRENCIES = [ 'RUB', 'USD', 'EUR', 'BRL' ]
const COUNTS = [ 100, 1000, 5000, 10000, 25000, 50000, 100000 ]

const CLIENTS = [
	'CLIENT_MAIN',
	'CLIENT_LK',
]
const PLATFORMS = [
	'INSTAGRAM',
	'TIKTOK',
	'YOUTUBE',
	'VK',
	'FAKE',
]
const STAMPS = [ 'services', 'costs' ]

const TTL = 3e5 // 300k milliseconds = 5 min
const DEFAULT_STATE = () => {
	const state = {}
	CLIENTS.forEach(client => {
		state[client] = state[client] || {}
		PLATFORMS.forEach(platform => {
			state[client][platform] = []
		})
	})
	return state
}

const WRAPED_STATE = KEYS => {
	const state = {}
	KEYS.forEach(key => {
		state[key] = DEFAULT_STATE()
	})
	return state
}

const GET_SERVICE_TYPE = ({ labels = [] }) => labels.find(label => label.startsWith('TYPE_')) || 'TYPE_OTHER'
const GET_SERVICE_CLIENT = ({ labels = [] }) => labels.find(label => label.startsWith('CLIENT_')) || 'CLIENT_ANY'

const TYPES_ORDER = {
	TYPE_LIKES: 0,
	TYPE_SUBS: 1,
	TYPE_FRIENDS: 2,
	TYPE_VIEWS: 3,
	TYPE_AUTO: 4,
	TYPE_COMMENTS: 5,
	TYPE_REPOSTS: 6,
}
const TAGS_ORDER = {
	INSTAGRAM_SUBS_LK: 10,
	INSTAGRAM_LIKES_LK: 2,
	INSTAGRAM_LIVE_LIKES_LK: 13,
	INSTAGRAM_VIEWS_VIDEO_LK: 0,
	INSTAGRAM_VIEWS_IGTV_LK: 1,
	INSTAGRAM_VIEWS_STORY_LK: 2,
	INSTAGRAM_VIEWS_SHOWS_IMPRESSIONS_LK: 3,
	INSTAGRAM_LIVE_VIEWERS_LK: 4,
	INSTAGRAM_COMMENTS_POSITIVE_LK: 7,
	INSTAGRAM_COMMENTS_CUSTOM_LK: 12,
	INSTAGRAM_AUTO_LIKES_LK: 10,
	INSTAGRAM_AUTO_VIEWS_LK: 11,
	INSTAGRAM_MULTI_LIKES_LK: 1e10,
	INSTAGRAM_MULTI_COMMENTS_POSITIVE_LK: 1e10,
	INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK: 1e10,
	TIKTOK_VIEWS_LK: 0,
	TIKTOK_COMMENTS_POSITIVE_LK: 1,
	TIKTOK_COMMENTS_CUSTOM_LK: 2,
	TIKTOK_LIKES_LK: 3,
	TIKTOK_AUTO_LIKES_LK: 7,
	TIKTOK_REPOSTS_LK: 4,
	TIKTOK_SUBS_LK: 5,
	TIKTOK_AUTO_VIEWS_LK: 6,
	YOUTUBE_LIKES_LK: 0,
	YOUTUBE_DISLIKES_LK: 1,
	YOUTUBE_SUBS_LK: 2,
	YOUTUBE_VIEWS_LK: 3,
	VK_LIKES_LK: 0,
	VK_AUTO_LIKES_LK: 5,
	VK_SUBS_LK: 1,
	VK_FRIENDS_LK: 2,
	VK_REPOSTS_LK: 3,
	VK_COMMENTS_LK: 4,
}

export const state = () => ({
	services: DEFAULT_STATE(),
	numerosity: NUMEROSITY_SINGLE,
	service: null,
	costs: WRAPED_STATE(CURRENCIES),
	orderCost: [ 0, 0 ],
	timestamps: WRAPED_STATE(STAMPS),
})

export const getters = {
	counts: () => COUNTS,
	numerosities: () => [ NUMEROSITY_SINGLE, NUMEROSITY_MULTIPLE ],
	localeCurrency: (_, __, ___, rootGetters) => rootGetters['locale/currency'],
	greenToggle: (_, __, ___, rootGetters) => rootGetters['userRoles/hasGreenToggle'],

	numerosity: state => state.numerosity,
	service: state => state.service,
	client: state => GET_SERVICE_CLIENT(state.service || {}),
	platforms: (_, getters) => getters.greenToggle ? PLATFORMS : PLATFORMS.filter(platform => 'FAKE' !== platform),
	platform: state => state.service?.platform.toUpperCase() || '',
	platformLow: state => state.service?.platform.toLowerCase() || '',
	type: state => GET_SERVICE_TYPE(state.service || {}),
	tag: state => state.service?.tag,
	multiTag: (_, getters) => getters.tag?.replace(getters.platform, `${getters.platform}_MULTI`),
	numerositiedTag: (_, getters) => getters.numerositiedService?.tag,
	orderCost: state => state.orderCost,
	services: state => (platform = 'INSTAGRAM', client = 'CLIENT_MAIN') => state.services[client][platform],
	numerositiedService: (state, getters) => state.numerosity === NUMEROSITY_SINGLE
		? state.service
		: getters.multiService,
	multiService: (state, getters) => {
		return getters.typedServices(getters.platform, getters.client).TYPE_OTHER?.find(
			service => getters.multiTag === service.tag,
		)
	},
	isMultiple: (_, getters) => getters.multiService && NUMEROSITY_MULTIPLE === getters.numerosity,
	isFake: (_, getters) => 'TYPE_TEST' === getters.type,
	isAuto: (_, getters) => getters.type?.includes('TYPE_AUTO'),
	isCustomComments: (_, getters) => getters.tag?.includes('COMMENTS_CUSTOM'),
	isInstagram: (_, getters) => 'INSTAGRAM' === getters.platform,
	isTiktok: (_, getters) => 'TIKTOK' === getters.platform,
	isYoutube: (_, getters) => 'YOUTUBE' === getters.platform,
	typedServices: state => (platform = 'INSTAGRAM', client = 'CLIENT_MAIN') => {
		const typed = {}
		state.services[client][platform]?.forEach(service => {
			const serviceType = GET_SERVICE_TYPE(service)
			typed[serviceType] = typed[serviceType] || []
			typed[serviceType].push(service)
		})

		for (const i in typed) {
			typed[i].sort((a, b) => TAGS_ORDER[a.tag] - TAGS_ORDER[b.tag])
		}

		return typed
	},
	types: (state, getters) => (platform = 'INSTAGRAM', client = 'CLIENT_LK') => {
		return Object.keys(getters.typedServices(platform, client))
			.filter(type => type !== 'TYPE_OTHER')
			.sort((typeA, typeB) => TYPES_ORDER[typeA] - TYPES_ORDER[typeB])
	},
	firstService: (_, getters) => (
		platform = 'INSTAGRAM',
		client = 'CLIENT_LK',
		type = getters.types(platform, client)[0],
	) => {
		return get(getters.typedServices(platform, client), type, [])[0]
	},
	servicesNoMulti: (_, getters) => (platform = 'INSTAGRAM', client = 'CLIENT_LK') => {
		return getters.services(platform, client)?.filter(
			service => !(service.tag.includes('_MULTI_') || service.labels.includes('TYPE_OTHER')),
		)
	},
	validationMin: (_, getters) => get(getters.numerositiedService, getters.greenToggle ? 'min' : 'min_order', 0),
	validationMax: (_, getters) => get(getters.numerositiedService, getters.greenToggle ? 'max' : 'max_order', 0),

	costs: (state, getters) => (platform = 'INSTAGRAM', client = 'CLIENT_MAIN') => {
		return state.costs[getters.localeCurrency][client][platform]
	},
	loyaltyCost: (_, getters) => (tag, count = 100, platform = 'INSTAGRAM', client = 'CLIENT_MAIN') => {
		return get(getters.costs(platform, client)[tag], count, { cost: 0, discount: 0 })
	},
	fullCost: (_, getters) => (tag, count = 100, platform = 'INSTAGRAM', client = 'CLIENT_MAIN') => {
		const loyaltyCost = getters.loyaltyCost(tag, count, platform, client)
		return loyaltyCost.cost + loyaltyCost.discount
	},
	minCost: (_, getters) => (platform = 'INSTAGRAM', client = 'CLIENT_MAIN') => {
		const costs = Object.values(getters.costs(platform, client))
		return costs.reduce((prev, cur) => prev > cur[100].cost ? cur[100].cost : prev, costs[0][100].cost)
	},
	quantityForCost: (_, getters) => (postQuantity, quantity = 0, quantityMin = 0, quantityMax = 0) => {
		if ('CLIENT_LK' === getters.client && getters.isInstagram && getters.isAuto) {
			return Math.round((quantityMin + quantityMax) * 0.5 * postQuantity)
		}
		if (getters.isAuto || getters.isMultiple) {
			return quantity * postQuantity
		}
		return quantity
	},

	stateHit: () => (state, key, client, platform) => state[key][client][platform]?.length
		&& Date.now() - state.timestamps[key][client][platform] > TTL,
}

export const mutations = {
	setSimple(state, { key, value }) {
		state[key] = value
		if ('service' === key) {
			state.numerosity = NUMEROSITY_SINGLE
		}
	},
	setComplex(state, { key, key2, client = 'CLIENT_MAIN', platform = 'INSTAGRAM', value }) {
		if (key2) {
			state[key][key2][client][platform] = value
			return
		}
		state[key][client][platform] = value
	},
}

export const actions = {
	setPlatform({ getters, commit }, platform) {
		commit('setSimple', { key: 'service', value: getters.firstService(platform) })
	},
	setType({ getters, commit }, type) {
		commit('setSimple', { key: 'service', value: getters.firstService(getters.platform, getters.client, type) })
	},
	setService({ state, commit }, value) {
		commit('setSimple', { key: 'service', value })
	},
	setServiceByTag({ getters, commit }, tag) {
		const value = getters.typedServices(getters.platform, getters.client)[getters.type].find(
			service => service.tag === tag,
		)
		commit('setSimple', { key: 'service', value })
	},
	setNumerosity({ commit }, value) {
		commit('setSimple', { key: 'numerosity', value })
	},
	unsetService({ commit }) {
		commit('setSimple', { key: 'service', value: '' })
	},
	unsetOrderCost({ commit }) {
		commit('setSimple', { key: 'orderCost', value: [ 0, 0 ] })
	},

	async netServices({ state, getters, commit }, { client = 'CLIENT_MAIN', platform = 'INSTAGRAM' } = {}) {
		if (getters.stateHit(state, 'services', client, platform)) {
			return
		}
		const response = await this.$http.services.tiny({
			labels: [ client, 'VISIBLE' ].join(' '),
			platform,
		})
		if ('success' !== response.status) {
			throw response
		}
		commit('setComplex', {
			key: 'services',
			client,
			platform,
			value: response.data,
		})
		commit('setComplex', {
			key: 'timestamps',
			key2: 'services',
			client,
			platform,
			value: Date.now(),
		})
	},
	async netCosts({ state, getters, commit }, { client = 'CLIENT_MAIN', platform = 'INSTAGRAM' } = {}) {
		if (getters.stateHit(state.costs, getters.localeCurrency, client, platform)) {
			return
		}
		const IS_MAIN = 'CLIENT_MAIN' === client
		const counts = IS_MAIN ? getters.counts : [ 100 ]
		const cur = getters.localeCurrency
		const response = await this.$http.costs.tiny({
			...IS_MAIN && { cur },
			labels: [ client, 'VISIBLE' ].join(' '),
			platform,
			counts,
		})
		if ('success' !== response.status) {
			throw response
		}
		commit('setComplex', {
			key: 'costs',
			key2: cur,
			client,
			platform,
			value: response.data,
		})
		commit('setComplex', {
			key: 'timestamps',
			key2: 'costs',
			client,
			platform,
			value: Date.now(),
		})
	},
	async netOrderCost(
		{ state, commit, getters, dispatch },
		{ postQuantity, quantity = 0, quantityMin = 0, quantityMax = 0 },
	) {
		const count = getters.quantityForCost(postQuantity, quantity, quantityMin, quantityMax)
		if (!count) {
			dispatch('unsetOrderCost')
			return
		}
		const response = await this.$http.costs.orderCost({
			...!this.$auth.loggedIn && { cur: getters.localeCurrency },
			tag: getters.tag,
			count,
		})
		if ('success' !== response.status) {
			throw response
		}
		commit('setSimple', { key: 'orderCost', value: response.data })
	},
}
