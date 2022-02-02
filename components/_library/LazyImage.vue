<template>
	<img
		:src="failsafeSrc"
		:alt="alt"
		@error="onError">
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default() {
				return ''
			},
		},
	},
	data() {
		return {
			imageError: false,
			path: null,
		}
	},
	computed: {
		failsafeSrc() {
			return this.path
				? this.path
				: '/img/default-avatar.png'
		},
	},
	watch: {
		src(newValue) {
			if (newValue) {
				this.path = newValue
			}
		},
	},
	created() {
		this.path = this.src
	},
	methods: {
		onError(val) {
			if ('error' === val.type) {
				this.path = '/img/default-avatar.png'
			}
		},
	},
}
</script>

<style lang="scss" scoped>
img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 50%;
}
</style>
