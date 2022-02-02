export default {
	beforeMount() {
		setTimeout(
			() => {
				document.documentElement.style.setProperty(
					'--vh',
					`${window.innerHeight * 0.01}px`,
				) // hack for 100vh on mobiles
			},
			500,
		)
	},
}
