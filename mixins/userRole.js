import { mapGetters } from 'vuex'

export default {
	middleware: [
		({ store, route, redirect }) => {
			if ( // conditions order crucial
				[ 'proxy', 'seo' ].includes(store.getters['userRoles/role'])
			 && route.name.startsWith('cp')
			) {
				if (process.client) {
					window.location.assign('/admin/')
				}
				else {
					redirect('/admin/')
				}
			}
		},
	],
	computed: {
		...mapGetters('userRoles', [ 'role' ]),
	},
}
