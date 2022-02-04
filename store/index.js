/* eslint-disable import/prefer-default-export */
export const actions = {
	async nuxtClientInit({ dispatch }, ctx) {
		await dispatch('responsive/getWidthDevice', ctx)

		window.addEventListener('resize', () => dispatch('responsive/getWidthDevice', ctx))

		await dispatch('locale/clientInit')

		if ('user' === this.getters['userRoles/role']) {
			setTimeout(() => this.$gtm.push({
				event: 'enable_jivosite',
			}), 5e3)
		}
	},
}
