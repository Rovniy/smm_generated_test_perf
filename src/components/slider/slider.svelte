<script>
	import SliderWrapper from './slider-wrapper.svelte';
	import slides from '../../db/slides.json';
</script>

<SliderWrapper>
	{#each slides as slide, index}
		<div class="slide" class:center="{index === 1}">
			<div class="header">
				<h3 class="heading">1000 Лайков</h3>
				<span class="price">4 450 $</span>
				<span class="economy">скидка 300 $</span>
			</div>

			<hr class="separator" />

			<ul class="body">
				<li class="item">Высокое качество</li>
				<li class="item">Гарантия от списаний</li>
				<li class="item">Быстрый запуск</li>
				<li class="item">Накрутка без бана</li>
				<li class="item">До 20 тыс. в сутки</li>
			</ul>
			<button class="button inverted">
				<svg-icon name="icon-cart" class="icon" />
				Купить сейчас
			</button>
		</div>
	{/each}
</SliderWrapper>

<style lang="sass">
@import "../../style/common"

$shadow_offset: 35px
$side_offset: -10px
$indent_normal: 40px
$indent_big: 60px


.slide
	color: $color_base
	background: #FFF
	flex-shrink: 0
	display: flex
	flex-direction: column
	align-items: center
	border-radius: 10px
	box-shadow: 0 0 $shadow_offset rgba(0, 0, 0, .1)
	margin-top: 58px
	margin-bottom: 58px
	width: 100%
	padding: 44px 24px
	max-width: 274px
	+tablet
		max-width: 350px
	+tablet-xl
		padding: 44px 30px
		max-width: 298px
	+desktop
		padding: 44px 70px
		max-width: 368px

	&:first-child
		&:not(:only-child)
			margin-left: $shadow_offset
			margin-right: $side_offset

	&:last-child
		&:not(:only-child)
			margin-left: $side_offset
			margin-right: $shadow_offset

	&.center
		z-index: 2
		margin: $indent_normal 0

		.separator
			margin-bottom: $indent_big

		.button
			margin-top: $indent_big

	.header
		position: relative
		text-align: center

		.heading
			display: block
			text-transform: capitalize
			font: 700 16px/16px $ff_gilroy
			color: $color_base
			margin-bottom: 30px
			+desktop
				font: 700 20px/20px $ff_gilroy

		.price
			+flex_center
			color: $color_primary
			white-space: nowrap
			font: 800 45px/45px $ff_gilroy
			margin-bottom: 15px
			+tablet-xl
				font: 800 60px/60px $ff_gilroy
			+desktop
				font: 800 70px/70px $ff_gilroy

		.economy
			+flex_center
			white-space: nowrap
			color: $color_gray
			font: 500 14px/14px $ff_gilroy
			+desktop
				font: 500 20px/20px $ff_gilroy

	.separator
		margin: $indent_normal 0
		width: 100%
		border: none
		border-bottom: 1px solid $color_gray

	.body
		+flex_start_column

		.item
			position: relative
			padding-left: 20px
			font: 400 18px/18px $ff_gilroy
			color: $color_base
			margin: 5px 0

			&::before
				position: absolute
				top: 5px
				left: 0
				content: ''
				display: inline-block
				height: 5px
				width: 9px
				border-style: solid
				border-width: 3px 3px 0 0
				border-radius: 2px
				transform: rotate(135deg) translateY(40%)
				margin-right: 3px

	.button
		display: flex
		justify-content: center
		align-items: center
		background: #2674bd
		color: $color_light
		border: 2px solid transparent
		border-radius: 250px
		box-shadow: 0 7px 10px rgba(0, 0, 0, .25)
		transition: all $transition-fast
		font-family: $ff_gilroy
		margin: $indent_normal 0

		&:hover
			border-color: $color_body !important
			background: $color_body !important
			color: $color_light !important

		&.inverted
			background: $color_light
			color: #2674bd
			border-color: #2674bd
			box-shadow: none

		.icon
			margin-right: 14px
</style>

