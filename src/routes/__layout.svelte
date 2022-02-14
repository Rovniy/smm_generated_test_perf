<slot />

<style lang='sass' global>
@import "../style/reset"
@import "../style/common"

body
	font-family: $ff_gilroy

.container
	+flex_center_column
	width: 100%
	margin: 0 auto
	+tablet
		max-width: $tablet
	+tablet-xl
		max-width: $tablet-xl
	+desktop
		max-width: $desktop

	h1
		font-size: 35px

</style>
