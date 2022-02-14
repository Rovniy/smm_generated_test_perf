<div class="header_container">
  <header>
    <div class="left-side">
      <img src="/img/misc/new-logo-ny-white.svg" alt="logo" width="103" height="50">
      <a href="#">Инстаграм</a>
      <a href="#">ВКонтакте</a>
      <a href="#">ТикТок</a>
      <a href="#">Ютуб</a>
    </div>

    <div class="right-side">
      <a href="#">Личный кабинет</a>
    </div>
  </header>
</div>

<style lang="sass">
	.header_container
		background: aquamarine /* TODO delete */
		min-width: 1108px
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

			.left-side
				display: flex
				justify-content: space-between
				align-items: center
				min-width: 500px
				a
					color: #fff
					text-decoration: none

			.right-side
				a
					color: #fff
					text-decoration: none
</style>
