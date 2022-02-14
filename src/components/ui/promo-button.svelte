<button class="button">
	<img src="/img/svg/seo_instagram.svg" alt="network" width="25" height="25">
	<span>Купить</span>
</button>

<style lang="sass">
	@import './src/style/common.sass'

	button
		+flex_center
		height: 48px
		background: #FFFFFF
		box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1)
		border-radius: 250px
		border: none
		cursor: pointer
		padding: 0 30px
		color: #2691f4

		img
			margin-right: 11px

		span
			font-size: 18px
			font-weight: 700

		&:hover
			background: #263238
			color: #fff
</style>
