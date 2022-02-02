export default ({ app }) => {
	app.$auth.onRedirect(to => {
		if (app.$auth.loggedIn) {
			return app.localePath(to, app.$auth.user.lang)
		}
		return app.localePath(to)
	})
}
