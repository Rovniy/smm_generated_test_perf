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

	&.with_padding
		padding: 100px 0 60px 0

	h1
		text-align: center
		font-size: 35px
		margin-bottom: 30px

</style>
