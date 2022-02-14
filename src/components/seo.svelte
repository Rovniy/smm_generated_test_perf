<div class="seo">
	<div class="seo_cards">
		{#each [1,2,3,4,5,6] as card}
			<SeoCard/>
		{/each}
	</div>

	<div class="seo_info">
		<div class="info_title">Скучный SEO текст</div>
	</div>

	<div class="seo_btn">
		<button>
			<img src="/img/svg/seo_instagram.svg" alt="network">
			<span>Раскрутить Инстаграм</span>
		</button>
	</div>
</div>

<script>
	import SeoCard from '../components/items/seo-card.svelte'
</script>

<style lang="sass">
	@import '../style/common.sass'

	.seo
		max-width: $container_width

		&_cards
			display: flex
			flex-wrap: wrap

		&_info
			min-height: 51px
			display: flex
			flex-direction: column
			justify-content: center
			align-items: flex-start
			box-shadow: 0 0 70px rgba(0, 0, 0, 0.1)
			border-radius: 10px
			margin-top: 15px
			margin-bottom: 15px
			background: #fff
			color: #263238
			padding: 0 40px

		&_btn
			display: flex
			justify-content: center
			align-items: center
			margin-top: 40px

			button
				height: 48px
				background: #FFFFFF
				box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1)
				border-radius: 250px
				border: none
				cursor: pointer
				display: flex
				justify-content: center
				align-items: center
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
