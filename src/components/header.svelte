<div class="container header_container">
	<header>
		<div class="left_side">
			<img src="/img/misc/new-logo-ny-white.svg" alt="logo" width="103" height="50" />
			<ul class="list">
				<li>
					<a href="#" class="link">Инстаграм</a>
				</li>
				<li>
					<a href="#" class="link">ВКонтакте</a>
				</li>
				<li>
					<a href="#" class="link">ТикТок</a>
				</li>
				<li>
					<a href="#" class="link">Ютуб</a>
				</li>
			</ul>
		</div>

		<div class="right_side">
			<ul class="list">
				<li>
					<a href="#" class="link">Личный кабинет</a>
				</li>
			</ul>
		</div>
	</header>
</div>

<style lang="sass">
@import '../style/common.sass'

.header_container
	position: fixed
	top: 60px
	z-index: 100

	header
		width: 100%
		display: flex
		justify-content: space-between
		align-items: center
		background: transparent
		z-index: 100

		.right_side,
		.left_side

			.list
				+flex_start
				margin-left: 25px

				.link
					+flex_center
					padding: 20px
					font: 400 17px/17px $ff_gotham
					color: $color_light

					&:hover
						text-decoration: none
						opacity: .8

		.left_side
			display: flex
			justify-content: space-between
			align-items: center
			min-width: 500px
</style>
