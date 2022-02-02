<template>
	<transition
		name="expand"
		@enter="enter"
		@after-enter="afterEnter"
		@leave="leave">
		<slot />
	</transition>
</template>

<script>
export default {
	name: 'TransitionExpandHeight',
	methods: {
		enter(element, done) {
			const { width } = getComputedStyle(element)

			element.style.width = width
			element.style.position = 'absolute'
			element.style.visibility = 'hidden'
			element.style.height = 'auto'

			const { height } = getComputedStyle(element)

			element.style.width = null
			element.style.position = null
			element.style.visibility = null
			element.style.height = 0

			// Force repaint to make sure the
			// animation is triggered correctly.
			getComputedStyle(element)

			// Trigger the animation.
			// We use `requestAnimationFrame` because we need
			// to make sure the browser has finished
			// painting after setting the `height`
			// to `0` in the line above.
			requestAnimationFrame(() => {
				element.style.height = height
			})

			setTimeout(
				() => {
					done()
				},
				350,
			)
		},
		afterEnter(element) {
			element.style.height = 'auto'
			element.style.overflow = 'visible'
		},
		leave(element) {
			const { height } = getComputedStyle(element)

			element.style.overflow = 'hidden'
			element.style.height = height

			// Force repaint to make sure the
			// animation is triggered correctly.
			getComputedStyle(element)

			requestAnimationFrame(() => {
				element.style.height = 0
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
	transition: height .25s ease-in-out;
	overflow: hidden;
	will-change: height;
}

.expand-leave-active {
	transition-duration: .1s;
}

.expand-enter,
.expand-leave-to {
	height: 0;
}

/* harware height animation aceleration */
* {
	will-change: height;
	//   transform: translateZ(0);
	//   backface-visibility: hidden;
	//   perspective: 1000px;
}
</style>
