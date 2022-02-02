export default {
	methods: {
		scrollTo(selector) {
			const node = document.querySelector(selector)
			const top = (selector && node)
				? (node.offsetTop - 60)
				: 0
			window.scrollTo({
				top,
				left: 0,
				behavior: 'smooth',
			})
		},
	},
}
