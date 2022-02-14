<Header class="header"/>

<section class="first container">
	<div class="left-side">
		<p class="title">Накрутка и продвижение аккаунтов Инстаграм</p>
		<p class="description">Повышайте свою популярность в Instagram всего в несколько кликов, просто и эффективно!
	</div>

	<div class="right-side">
		<img src="/img/svg/promo.svg" width="512" height="425" alt="promo">
	</div>
</section>

<section class="second container">
	<h1>Накрутка Инстаграм</h1>
	<!--  Carousel	-->
</section>

<section class="third container">
<!--  Carousel	-->
</section>

<section class="fourth container">
	<h1>Часто задаваемые вопросы</h1>
	<Accordion/>
</section>

<section class="fifth container">
	<h1>Наши приемущества</h1>
	<Seo/>
</section>

<Footer/>

<script>
	import Header from '../components/header.svelte'
	import Footer from '../components/footer.svelte'
	import Accordion from '../components/accordion.svelte'
	import Seo from '../components/seo.svelte'
</script>

<style lang="sass">
@import '../style/common.sass'

.container
	max-width: 1108px
	margin: 0 auto

	.first
		width: 100%
		height: 100vh
		background-image: url("/img/svg/main.svg")
		background-size: cover
		background-repeat: no-repeat
		display: flex
		justify-content: center
		align-items: center

		.left-side
			.title
				color: #fff
				font-size: 3.125rem
				line-height: 3.4375rem
				margin-bottom: 30px

			.description
				color: #fff
				font-size: 1.25rem
				line-height: 1.75rem
				margin-bottom: 39px
				width: 80%

	.second,
	.third,
	.fourth,
	.fifth
		width: 100%
		height: 500px
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center

	.third
		background-image: url("../assets/svg/main.svg")
		background-size: cover
		background-repeat: no-repeat

	.fifth
		background-image: url("/img/svg/main.svg")
		background-size: cover
		background-repeat: no-repeat
		color: #fff
</style>
