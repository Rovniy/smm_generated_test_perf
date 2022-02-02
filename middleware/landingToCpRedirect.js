export default ({ app, route, redirect }) => {
	if (app.$auth.loggedIn && 'true' !== route.query.fromCp && 'PaymentSuccess' !== route.query.action) {
		redirect(app.localePath('/cp', app.$auth.user.lang), route.query)
	}
}
