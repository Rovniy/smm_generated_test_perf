export default function paymentNoReferrer(req, res, next) {
	let domain = 'https://smmtouch.com'
	let path
	const { referer, host } = req.headers

	if (host) {
		domain = host.indexOf('localhost') + 1
			? `http://${host}`
			: `https://${host}`
	}
	try {
		path = new URL(req.url, domain)
	}
	catch (e) {
		path = new URL('/', domain)
	}

	if (
		!path.searchParams.has('rd')
 && referer
 && referer.indexOf
 && (
 	referer.indexOf('money.yandex.ru') + 1
|| referer.indexOf('ulogin.ru') + 1
|| referer.indexOf('oauth.vk.com') + 1
|| referer.indexOf('yookassa.ru') + 1
|| referer.indexOf('yoomoney.ru') + 1
|| referer.indexOf('kassa.yandex.ru') + 1
|| referer.indexOf('stripe.com') + 1
|| referer.indexOf('paypal.com') + 1
|| referer.indexOf('tinkoff.ru') + 1
|| referer.indexOf('fondy.eu') + 1
 )
	) {
		const urlParts = req.url.split('?')

		path.searchParams.append('rd', 'true')

		const redirectUrl = `${urlParts[0]}?${path.searchParams.toString()}`

		res.writeHead(307, {
			Location: redirectUrl,
			'Referrer-Policy': 'no-referrer',
		})

		res.end()
	}
	else {
		next()
	}
}
