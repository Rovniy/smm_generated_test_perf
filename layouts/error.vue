<template>
	<div class="nuxt-error">
		<component
			:is="errorPage"
			:error="error" />
	</div>
</template>

<script>
import error404 from '@/components/error/error_404.vue'
import error500 from '@/components/error/error_500.vue'

export default {
	name: 'Error',
	props: {
		error: {
			type: Object,
			default: () => {},
		},
	},
	head() {
		return {
			title: this.error.message,
		}
	},
	computed: {
		errorPage() {
			if (404 === this.error.statusCode) {
				return error404
			}
			// catch everything else
			return error500
		},
	},
}
</script>
