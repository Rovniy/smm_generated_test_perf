<div class="accordion">
	{#each clicked as acc, idx}
		<div class="info" class:info_open={clicked[idx]} on:click={() => clickAccordion(idx)}>
			<div class="info_title">Через какое время выполняются услуги?</div>

			<img class="arrow" class:rotate={clicked[idx]} src="img/svg/accordion_arrow.svg" alt="arrow">
		</div>

		{#if clicked[idx]}
			<div class="more_info">Для заказа выберите услугу, введите ссылку и укажите количество. Вас перенаправит на сайт платежной системы, где нужно будет произвести оплату. После совершения оплаты Ваш заказ автоматически начнет выполняться.</div>
		{/if}
	{/each}
</div>

<script>
	let clicked = [false, false, false, false, false, false]

	function clickAccordion(idx) {
		clicked[idx] = clicked[idx] ? !clicked[idx] : true
	}
</script>

<style lang="sass">
	@import '../style/common.sass'

	.accordion
		width: 100%

		.info
			position: relative
			min-height: 50px
			display: flex
			flex-direction: column
			justify-content: center
			align-items: flex-start
			box-shadow: 0 0 70px rgba(0, 0, 0, 0.1)
			border-radius: 10px
			margin-bottom: 14px
			background: #fff
			font-weight: 500
			font-size: 18px

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

		.more_info
			padding: 15px 50px
			background: #FFFFFF
			border-radius: 0 0 10px 10px
			box-shadow: 0 0 70px rgb(0 0 0 / 10%)
			margin-bottom: 14px
			font-weight: 400
			font-size: 18px
			color: #8499A4

	.arrow
		position: absolute
		top: 50%
		right: 30px
		transition: $transition-slow

	.rotate
		transform: rotate(180deg)
		transition: $transition-slow
</style>
