import {
	mapGetters,
	mapMutations,
} from 'vuex'

export default {
	computed: {
		...mapGetters({
			pagePending: 'loading/pending',
		}),
	},
	methods: {
		...mapMutations({
			setPending: 'loading/setPending',
		}),
	},
}
