// https://developer.mozilla.org/ru/docs/Web/HTTP/CSP
const { isDev } = require('../const/index.js')

export default function(_, res, next) {
	!isDev && res?.setHeader('Content-Security-Policy-Report-Only',
		'default-src \'self\' https:; '
		+ 'connect-src https: wss:; '
		+ 'object-src https:; '
		+ 'media-src https:; '
		+ 'img-src https: data:; '
		+ 'style-src \'unsafe-inline\' https:; '
		+ 'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https:; '
		+ 'frame-src https:; '
		+ 'frame-ancestors https:; '
		+ 'font-src https: data:; ',
	)

	next()
}
