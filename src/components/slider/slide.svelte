<div class="slide center">
	<div class="header center">
		<h3 class="heading">1000 Лайков</h3>
		<span class="price">4 450 $</span>
		<span class="economy">скидка 300 $</span>
	</div>
	<ul class="text body center">
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

<style lang="sass">
@import "../../style/common"

$shadow_offset: 35px
$side_offset: -10px

.slide
	color: $color_base
	background: #FFF
	flex-shrink: 0
	display: flex
	flex-direction: column
	align-items: center
	border-radius: 10px
	box-shadow: 0 0 $shadow_offset rgba(0, 0, 0, .1)
	padding-left: 24px
	padding-right: 24px
	margin-top: 58px
	margin-bottom: 58px

	&:first-child
		&:not(:only-child)
			margin-left: $shadow_offset
			margin-right: $side_offset



	&:last-child
		&:not(:only-child)
			margin-left: $side_offset
			margin-right: $shadow_offset

		&--center
			z-index: 2
			margin: 35px 0


	.header
		position: relative
		text-align: center

		.heading
			text-transform: capitalize
			font: bold 14px/14px $ff_gilroy

		.price
			@include flex_center
			color: $color_primary
			white-space: nowrap

		.economy
			@include flex_center
			white-space: nowrap
			color: $color_dark

		&::after
			content: ''
			position: absolute
			bottom: 0
			left: 50%
			transform: translateX(-50%)
			border-bottom: 1px solid #D1DCE8

	.body
		display: flex
		flex-direction: column
		justify-content: center
		margin-top: 20px
		margin-bottom: 20px

		.item
			position: relative
			padding-left: 20px

			&::before
				position: absolute
				top: 10px
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

		&:hover
			border-color: $color_body !important
			background: $color_body !important
			color: $color_light !important

		font-family: $ff_gilroy

		&.inverted
			background: $color_light
			color: #2674bd
			border-color: #2674bd
			box-shadow: none

		.icon
			margin-right: 14px
</style>
