/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */

function mapArticleDate(article) {
	const dateSplit = article.created_at.split(' ')
	const correctDateForAllBrowsers = `${dateSplit[0]}T${dateSplit[1]}`
	const d = new Date(correctDateForAllBrowsers)
	const monthList = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',')
	return {
		...article,
		date: `${d.getDate()} ${monthList[d.getMonth()]} ${d.getFullYear()}`,
		timestamp: d.getTime(),
	}
}

function mapArticlesList(articlesList) {
	return articlesList.map(article => mapArticleDate(article))
}

export const state = () => ({
	articlesList: [],
	featuredList: [],
	article: {},
	total: 0,
	isLoading: true,
})

export const mutations = {
	setArticlesList(state, articlesList) {
		state.articlesList = mapArticlesList(articlesList)
	},
	setFeaturedList(state, articlesList) {
		state.featuredList = mapArticlesList(articlesList)
	},
	setArticle(state, article) {
		state.article = mapArticleDate(article)
	},
	setTotal(state, total) {
		state.total = total
	},
	setIsLoading(state, value) {
		state.isLoading = value
	},
}

export const actions = {
	async loadArticles({ commit }, params) {
		commit('setIsLoading', true)
		await this.$http.getArticles(params)
			.then(result => {
				if ('success' === result.status) {
					commit('setArticlesList', result.data.items)
					commit('setTotal', result.data.meta.total)
					commit('setIsLoading', false)
				}
				else {
					console.error('Error of getting articles data')
				}
			})
	},

	async loadFeatured({ commit }) {
		await this.$http.getArticles({ sort: 'views', limit: 3 })
			.then(result => {
				if ('success' === result.status) {
					commit('setFeaturedList', result.data.items)
				}
				else {
					console.error('Error of getting featured data')
				}
			})
	},

	async loadArticle({ commit }, slug) {
		await this.$http.getArticle(slug)
			.then(result => {
				if ('success' === result.status) {
					commit('setArticle', result.data)
				}
				else {
					console.error('Error of getting article data')
				}
			})
	},

}
