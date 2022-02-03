export default ({ app, route, redirect }) => {
	if (app.$auth.loggedIn && route.query.fromCp !== 'true' && route.query.action !== 'PaymentSuccess') {
		redirect(app.localePath('/cp', app.$auth.user.lang), route.query)
	}
}
