<div class="slider_wrapper">
	<ul class="slider_ul">
		<slot />
	</ul>
</div>

<style lang="sass">
@import "../../style/common"

.slider_wrapper
	width: 100%

	.slider_ul
		+flex_center
		padding: 0

</style>
