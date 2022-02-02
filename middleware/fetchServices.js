export default (platform, client = 'CLIENT_MAIN') => async({ store }) => {
	await Promise.all([
		store.dispatch('services/netServices', { client, platform }),
		store.dispatch('services/netCosts', { client, platform }),
	])
}
