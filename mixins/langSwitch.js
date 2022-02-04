import LangSwitch from '@/components/_library/LangSwitch.vue'

export default {
	components: {
		LangSwitch,
	},
	data() {
		return {
			langOpen: false,
		}
	},
	methods: {
		changeLang(state) {
			this.langOpen = state
		},
	},
}
