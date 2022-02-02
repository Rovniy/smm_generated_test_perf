import * as woothee from 'woothee'
import {
	parseAcceptLanguage,
	matchBrowserLocale,
} from 'nuxt-i18n/src/templates/utils-common.js'

const coded = code => {
	return {
		code,
	}
}
// documented locales (12): ru, az, am, by, kz, kg, md, tj, uz, ua, ge, tm
const localesToRu = [
	'ab', // Abkhazian
	'av', // Avaric (Dagestan)
	'az', // Azeri
	'ba', // Bashkir
	'be', // Belarusian
	'ce', // Chechen
	'cv', // Chuvash
	'hy', // Armenian
	'ka', // Georgian
	'kk', // Kazakh
	'kv', // Komi
	'ky', // Kyrgyz
	'os', // Ossetian
	'ro', // Romanian (Moldova)
	'tg', // Tajik
	'tk', // Turkmen
	'tt', // Tatar
	'uk', // Ukrainian
	'uz', // Uzbek
].map(coded)
const localesToEs = [
	'ca',
].map(coded)
const localesToDe = [
	'de-DE',
	'de-AT',
	'de-BE',
	'de-CH',
	'de-DK',
	'de-IT',
	'de-LI',
	'de-LU',
].map(coded)
const localesToIt = [
	'it-CH',
	'it-IT',
	'sc', // Sardinian
	'co', // Corsican
	'it-SM', // San Marino
].map(coded)
const localesDefaults = [
	'ru', // Russian
	'en',
	'es',
	'pt',
	'tr',
	'de',
	'it',
].map(coded)
const localesAll = [
	...localesDefaults,
	...localesToRu,
	...localesToEs,
	...localesToDe,
	...localesToIt,
]

function noRedirect(headers) {
	const UA = headers['user-agent']
	const cookie = headers.cookie
	const wd = woothee.parse(UA)

	const condition1 = UA && 'crawler' === wd.category
	const condition2 = cookie && cookie.indexOf('i18n_redirected') + 1
	const condition3 = UA && [ 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot', 'Konqueror', 'Exabot', 'ia_archiver' ].includes(wd.name)

	return condition1 || condition2 || condition3
}

function localeFromUrl(headers, url) {
	return url.includes('fwd=0')
  || (
  	headers.referer
 && headers.referer.includes('nakrutka.one')
  )
}

function redirect(url, res, lang = 'en') {
	res.setHeader('Set-Cookie', [ `i18n_redirected=${lang}`, `i18n_region=${lang}` ])
	res.writeHead(307, {
		Location: url,
	}).end()
}

function getLocaleFromUrl(url) {
	if (url.startsWith('/en')) {
		return 'en'
	}
	if (url.startsWith('/es')) {
		return 'es'
	}
	if (url.startsWith('/pt')) {
		return 'pt'
	}
	if (url.startsWith('/tr')) {
		return 'tr'
	}
	if (url.startsWith('/de')) {
		return 'de'
	}
	if (url.startsWith('/it')) {
		return 'it'
	}
	return 'ru'
}

export default function defaultLocale(req, res, next) {
	if (localeFromUrl(req.headers, req.url)) {
		const locale = getLocaleFromUrl(req.url)

		if (!req.headers.cookie || !(req.headers.cookie.indexOf(`i18n_redirected=${locale}`) + 1)) {
			redirect(req.url, res, locale)
			return
		}
	}

	if (noRedirect(req.headers)) {
		next()
		return
	}

	const languages = req.headers['accept-language'] && parseAcceptLanguage(req.headers['accept-language'])

	if (languages) {
		const match = matchBrowserLocale(localesAll, languages)
		if (match) {
			if (localesToRu.find(locale => match === locale.code)) {
				redirect(req.url, res, 'ru')
				return
			}
			if (localesToEs.find(locale => match === locale.code)) {
				redirect(req.url, res, 'es')
				return
			}
			if (localesToDe.find(locale => match === locale.code)) {
				redirect(req.url, res, 'de')
				return
			}
			if (localesToIt.find(locale => match === locale.code)) {
				redirect(req.url, res, 'it')
				return
			}
			next() // when match is in the rest of locales we trust nuxt-i18n
			return
		}
	}
	redirect(req.url, res) // english when in doubt
}
