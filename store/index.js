/* eslint-disable import/prefer-default-export */
export const actions = {
	async nuxtClientInit({ dispatch }, ctx) {
		await dispatch('responsive/getAgentDevice', ctx)
		await dispatch('locale/init')
		await dispatch('responsive/getWidthDevice')

		window.addEventListener('resize', async() => {
			await dispatch('responsive/getWidthDevice')
		})

		await dispatch('locale/clientInit')
		if ('user' === this.getters['userRoles/role']) {
			setTimeout(() => this.$gtm.push({
				event: 'enable_jivosite',
			}), 5e3)
		}
	},
}
