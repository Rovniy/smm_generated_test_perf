<footer class="footer">
	<div class="container area">
		<div class="description">
			<a class="logo" href="#">
				<img
					src="/img/misc/new-logo-ny-white.svg"
					width="123"
					height="38"
					alt="logo"
					loading="lazy" />
			</a>

			<div class="text">
				Займись раскруткой своей страницы уже сегодня! Мы привлекаем качественную аудиторию для Вашего аккаунта, что сделает Вас популярным уже через несколько часов.
			</div>
		</div>

		<div class="navigation">
			<h3 class="title">НАВИГАЦИЯ:</h3>

			<div class="items">
				<ul class="menu left">
					<li>
						<a href="#" class="link">Faq</a>
					</li>
					<li>
						<a href="#" class="link">Блог</a>
					</li>
					<li>
						<a href="#" class="link">Отзывы</a>
					</li>
				</ul>

				<ul class="menu right">
					<li>
						<a href="#" class="link">Личный кабинет</a>
					</li>
					<li>
						<a href="#" class="link">Договор оферты</a>
					</li>
					<li>
						<a href="#" class="link">Политика конфиденциальности</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="contacts">
			<h3 class="title">КОНТАКТЫ:</h3>
			<a href="mailto:info@smmtouch.com" class="email">info@smmtouch.com</a>
		</div>
	</div>

	<div class="copyrights">
		&copy 2017 - 2022 Все права защищены.
	</div>
</footer>

<style lang="sass">
@import '../style/common.sass'

.footer
	width: 100%
	background: #222
	color: #7a7d84

	.area
		+flex_start_space_between
		padding: 50px 15px

		.description
			width: 33.33%
			padding: 0 15px

			.logo
				max-width: 100%
				display: block
				width: 1223px
				height: 38px

			.text
				display: block
				margin-top: 10px
				font: 400 14px/23px $ff_gotham
				color: $color_afina

		.navigation,
		.contacts
			.title
				font: 700 16px/16px $ff_gotham
				text-transform: uppercase
				color: $color_light
				margin: 0 0 35px 0

		.navigation
			padding: 0 15px

			.items
				+flex_start_space_between

				.menu
					+flex_start_column
					width: 50%
					padding: 0 15px

					.link
						font: 400 13px/23px $ff_gotham
						color: $color_afina
						text-transform: uppercase

						&:hover
							color: $color_light

						&:before
							content: ''
							display: inline-block
							border-style: solid
							border-width: 1px 1px 0 0
							height: 8px
							width: 8px
							transform: rotate(45deg)
							margin-right: 6px



		.contacts
			.email
				font: 400 14px/14px $ff_gotham
				color: $color_afina

				&:hover
					color: $color_light

	.copyrights
		+flex_center
		padding: 30px 15px
		border-top: 1px solid $color_semi
		color: $color_light
		font: 400 14px/14px $ff_gotham
</style>
