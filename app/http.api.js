// const TIKTOK_SCRAPPER_URL = 'https://smmtouch.com:7443/tiktok';
// const TIKTOK_SCRAPPER_COUNT = 12;
// const DEFAULT_REGION = 'CIS';
// const DEFAULT_REGION = 'USA';
const SERVICE_URL = '/user_services'

export default (axios, store) => ({
	user: {
		getTransactions(filter = {}, pagination = {}) {
			return axios.$get('user/transactions', {
				params: {
					...filter,
					...pagination,
				},
			})
		},
		getTransactionsTotals() {
			return axios.$get('user/transactions/totals')
		},
		getRefBonuses(params = {}) {
			return axios.$get(
				'user/refs', {
					params,
				},
			)
		},
		getRefBonusesTotal() {
			return axios.$get('user/refs/total')
		},
		getStatuses() {
			return axios.$get('user/premium_statuses')
		},
	},
	services: {
		async find(params) {
			const reg = await store.dispatch('locale/getRegion')

			return axios.$get(
				`${SERVICE_URL}/find`, {
				  params: {
				    reg,
				    ...params,
				  },
				},
			)
		},
		tiny(params) {
			return axios.$get(`${SERVICE_URL}/tiny`, { params })
		},
	},
	costs: {
		tiny(params) {
			return axios.$get('prices/tiny', { params })
		},
		orderCost(params) {
			return axios.$get('prices/orderCost', { params })
		},
	},
	async order(data) {
		const reg = await store.dispatch('locale/getRegion')
		return axios.$post(
			'c_orders/main', {
				...data,
				region_value: reg,
			},
		)
	},
	asyncOrder(data) {
		return axios.$post(
			'c_orders/async', {
				...data,
			},
		)
	},
	getOrders(params = {}) {
		return axios.$get(
			'c_orders', {
				params,
			},
		)
	},
	getArticles(params = {}) {
		return axios.$get(
			'articles', {
				params,
			},
		)
	},
	getArticle(slug) {
		return axios.$get(
			`articles/${slug}`,
		)
	},
	uLoginByToken(data) {
		return axios.$post(
			'login/ulogin/token/',
			data,
		)
	},
	setPassword(data) {
		return axios.$post(
			'set_password',
			data,
		)
	},
	resetPassword(data) {
		return axios.post(
			'reset',
			data,
		)
	},
	registerUser(data) {
		return axios.post(
			'register',
			data,
		)
	},
	region() {
		return axios.$get(
			'region', {
				// params: {
				//   ip_value: '64.233.165.99',
				// },
			},
		)
	},
	payment: {
		deposit(data) {
			return axios.$post(
				'deposit',
				data,
			)
		},
		status(id) {
			return axios.$get(`payment/${id}`)
		},
	},
	getTiktokProfile(user) {
		return axios.$get('simple/tiktok/profile', {
			params: {
				user,
			},
		})
	},
	getTiktokFeed(user) {
		return axios.$get('simple/tiktok/feed', {
			params: {
				user,
			},
		})
	},
})
