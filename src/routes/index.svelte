<section class="container">
	<Header/>
</section>

<section class="first">
	<div class="container">
		<div class="first_container">
			<div class="left-side">
				<p class="title">Накрутка и продвижение аккаунтов Инстаграм</p>
				<p class="description">Повышайте свою популярность в Instagram всего в несколько кликов, просто и эффективно!</p>
				<PromoButton/>
			</div>

			<div class="right-side">
				<img src="/img/svg/promo.svg" width="512" height="425" alt="promo">
			</div>
		</div>
	</div>
</section>

<section class="second">
	<div class="container">
		<h1>Накрутка Инстаграм</h1>

		<!--  Carousel	-->
		<Slider />
	</div>
</section>

<section class="third">
	<div class="container with_padding">
		<!--  Carousel	-->
		<Slider />
	</div>
</section>

<section class="fourth">
	<div class="container with_padding">
		<h1>Часто задаваемые вопросы</h1>
		<Accordion/>
	</div>
</section>

<section class="fifth">
	<div class="container with_padding">
		<h1>Наши преимущества</h1>
		<Seo/>
	</div>
</section>

<Footer/>

<script>
	import Header from '../components/header.svelte'
	import Footer from '../components/footer.svelte'
	import Accordion from '../components/accordion.svelte'
	import Seo from '../components/seo.svelte'
	import Slider from '../components/slider/slider.svelte'
	import PromoButton from '../components/ui/promo-button.svelte'
</script>

<style lang="sass">
@import '../style/common.sass'

.first
	width: 100%
	height: 153vh
	background-image: url("/img/svg/main.svg")
	background-size: cover
	background-repeat: no-repeat

	&_container
		display: flex
		margin-top: 200px

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
.fourth
	width: 100%
	display: flex

.third
	background-image: url("/img/svg/main.svg")
	background-size: cover
	background-repeat: no-repeat


.fifth
	background-image: url("/img/svg/main.svg")
	background-size: cover
	background-repeat: no-repeat
	color: #fff

</style>
