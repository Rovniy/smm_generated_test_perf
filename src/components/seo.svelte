<div class="seo">
	<div class="seo_cards">
		{#each [1,2,3,4,5,6] as card}
			<SeoCard/>
		{/each}
	</div>

	{#each clicked as acc, idx}
		<div class="info" class:info_open={clicked[idx]} on:click={() => clickAccordion(idx)}>
			<div class="info_title">Через какое время выполняются услуги?</div>

			<img class="arrow" class:rotate={clicked[idx]} src="img/svg/accordion_arrow.svg" alt="arrow">
		</div>

		{#if clicked[idx]}
			<div class="more_info">Для заказа выберите услугу, введите ссылку и укажите количество. Вас перенаправит на сайт платежной системы, где нужно будет произвести оплату. После совершения оплаты Ваш заказ автоматически начнет выполняться.</div>
		{/if}
	{/each}

	<div class="seo_btn">
		<PromoButton/>
	</div>
</div>

<script>
	import SeoCard from './ui/seo-card.svelte'
	import PromoButton from './ui/promo-button.svelte'

	let clicked = [false]

	function clickAccordion(idx) {
		clicked[idx] = clicked[idx] ? !clicked[idx] : true
	}
</script>

<style lang="sass">
	@import '../style/common.sass'

	.seo
		&_cards
			display: flex
			flex-wrap: wrap

		.info
			+flex_center_start_column
			position: relative
			min-height: 50px
			box-shadow: 0 0 70px rgba(0, 0, 0, 0.1)
			border-radius: 10px
			margin-bottom: 14px
			background: #fff
			font-weight: 500
			font-size: 18px
			color: #000
			margin-top: 25px

			&_open
				background: #7EB0FF
				margin-bottom: 0
				border-radius: 10px 10px 0 0
				color: #fff
				font-size: 18px
				font-weight: 700

				&:hover
					background: #7EB0FF !important

			&_title
				padding: 15px 30px

			&:hover
				cursor: pointer
				background: #ecf5ff

			.arrow
				position: absolute
				top: 50%
				right: 30px
				transition: $transition-slow

			.rotate
				transform: rotate(180deg)
				transition: $transition-slow

		.more_info
			padding: 15px 50px
			background: #FFFFFF
			border-radius: 0 0 10px 10px
			box-shadow: 0 0 70px rgb(0 0 0 / 10%)
			margin-bottom: 14px
			font-weight: 400
			font-size: 18px
			color: #8499A4

		&_btn
			+flex_center
			margin-top: 40px
</style>
