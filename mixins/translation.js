import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('translation', [ '$t' ]),
	},
}
