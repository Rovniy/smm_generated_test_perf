export default (platform, client = 'CLIENT_MAIN') => async ({ store, route }) => {
  let prefetchedData = null
  let prefetchedCosts = null

  if (route.name.includes('index___')) {
    prefetchedData = require('../static/instagram_services.json')
    prefetchedCosts = require(`../static/instagram_costs_${store.getters['locale/currency']}.json`)
  }

  await Promise.all([
    store.dispatch('services/netServices', { client, platform, prefetchedData }),
    store.dispatch('services/netCosts', { client, platform, prefetchedCosts })
  ])
}
