import fetchServices from '~/middleware/fetchServices.js'

const CLIENT = 'CLIENT_LK'

export default platform => [
	fetchServices(platform, CLIENT),
	({ store }) => (CLIENT !== store.getters['services/client'] || !store.getters['services/service'])
		&& store.dispatch('services/setPlatform', platform),
]
