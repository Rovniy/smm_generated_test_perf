const REDIRECTS = [{
	from: '/cp/payment/transfer',
	to: '/cp',
}, {
	from: '/uslugi',
	to: '/uslugi/podpischiki-v-instagram',
}]

export default function redirects(req, res, next) {
	const redirect = REDIRECTS.find(r => r.from === req.url)

	if (redirect) {
		res.writeHead(301, { Location: redirect.to })

		res.end()
	}
	else {
		next()
	}
}
