import path from 'path'
import fs from 'fs'
import axios from 'axios'
import { isDev, isProduction } from './const/index.js'
import { COUNTS, CURRENCIES } from './store/services.js'

const BACK_URL = process.env.BACK_URL
const FRONT_URL = process.env.FRONT_URL || BACK_URL
const API_URL = `${BACK_URL}/api`

export default {
	ssr: true,
	target: 'static',
	modern: !isDev,
	parallel: true,
	resolve: {
		extensions: [ '.js', '.json', '.vue', '.ts', '.svg', '.css', '.scss', '.less', '.sass' ],
		root: path.resolve(__dirname),
		alias: {
			'@': path.resolve(__dirname),
			'~': path.resolve(__dirname),
		},
	},
	publicRuntimeConfig: {
		urls: {
			back: BACK_URL,
			front: FRONT_URL,
			admin: `${FRONT_URL}/admin/`,
			storage: `${BACK_URL}/storage`,
		},
	},
	head: {
		meta: [
			{ charset: 'utf-8' },
			{ hid: 'viewport', name: 'viewport', content: 'width=device-width' },
			{ name: 'msapplication-TileColor', content: '#009dff' },
			{ name: 'msapplication-config', content: `${FRONT_URL}/favicons/browserconfig.xml` },
			{ name: 'theme-color', content: '#ffffff' },
			{ hid: 'og:type', property: 'og:type', content: 'website' },
			{ hid: 'og:image', property: 'og:image', content: `${FRONT_URL}/favicons/android-chrome-512x512.png` },
			{ hid: 'og:url', property: 'og:url', content: FRONT_URL },
		],
		link: [
			{ rel: 'apple-touch-icon', href: `${FRONT_URL}/favicons/apple-touch-icon.png`, sizes: '180x180' },
			{ rel: 'mask-icon', href: `${FRONT_URL}/favicons/safari-pinned-tab.svg`, color: '#009dff' },
			{ rel: 'shortcut icon', href: `${FRONT_URL}/favicons/favicon.ico` },
		],
	},
	loading: {
		color: '#0cc',
	},
	loadingIndicator: {
		name: '~/app/loading-smm-circle.html',
		color: '#2bf',
	},
	router: {
		prefetchLinks: false,
		middleware: [
			'auth',
		],
		linkActiveClass: 'link-active',
		linkExactActiveClass: 'link-exact-active',
	},
	css: [
		'~/assets/styles/reset.scss',
		'~/assets/styles/_init.scss',
		'~/assets/styles/_bootstrap-grid-custom.scss',
		'~/assets/styles/element-ui.scss',
		'~/assets/styles/_svg-sprite.scss',
	],
	components: [
		'~/components',
		{ path: '~/components/landing3', prefix: 'landing', prefetch: true, isAsync: true },
	],
	plugins: [
		'~/plugins/element-ui.js',
		'~/plugins/vuelidate.js',
		'~/plugins/filters.plugin.js',
		'~/plugins/http.js',
		{ src: '~/plugins/sourcebuster.js', mode: 'client' },
		{ src: '~/plugins/nuxt-client-init.js', mode: 'client' },
	],
	messages: {
		loading: 'Идёт загрузка...',
		error_404: 'This page could not be found',
		server_error: 'Server error',
		nuxtjs: 'Nuxt.js',
		back_to_home: 'Back to the home page',
		server_error_details: 'An error occurred in the application and your page could not be served.'
      + ' If you are the application owner, check your logs for details.',
		client_error: 'Error',
		client_error_details: 'An error occurred while rendering the page. Check developer tools console for details.',
	},
	buildModules: [
		'@nuxtjs/gtm',
		'@nuxtjs/device',
	],
	gtm: {
		enabled: 'true' === process.env.GTM_ENABLED,
		id: process.env.GTM_ID,
		scriptDefer: true,
		pageTracking: true,
		debug: 'true' === process.env.GTM_DEBUG,
	},
	modules: [
		'@nuxtjs/svg',
		[ '@nuxtjs/svg-sprite', {
			elementClass: 'svg-sprite',
		}],
		'@nuxt/image',
		'@nuxtjs/pwa',
		'@nuxtjs/axios',
		'nuxt-i18n',
		'@nuxtjs/auth',
		'@nuxtjs/style-resources',
		'@nuxtjs/sentry',
		'nuxt-user-agent',
		'@nuxtjs/robots',
		[ 'nuxt-lazy-load', {
			directiveOnly: true,
		}],
		[ 'cookie-universal-nuxt', {
			alias: 'cookiz',
			parseJSON: false,
		}],
		'nuxt-polyfill',
		'nuxt-clipboard2',
	],
	robots: {
		UserAgent: '*',
		Disallow: '/', // TODO убарать перед переносом
		Sitemap: `${FRONT_URL}/sitemap.xml`,
	},
	axios: {
		baseURL: API_URL,
	},
	image: {
		dir: 'assets',
		screens: {
			xs: 375,
			sm: 660,
			md: 768,
			lg: 992,
			xl: 1200,
			w1440: 1440,
			w1920: 1920,
		},
	},
	i18n: {
		locales: [{
			code: 'ru',
			name: 'Русский',
			iso: 'ru-RU',
			file: 'ru-RU.js',
		}, {
			code: 'en',
			name: 'English',
			iso: 'en-US',
			file: 'en-US.js',
		}, {
			code: 'es',
			name: 'Español',
			iso: 'es-ES',
			file: 'es-ES.js',
		}, {
			code: 'pt',
			name: 'Português',
			iso: 'pt-PT',
			file: 'pt-PT.js',
		}, {
			code: 'tr',
			name: 'Türkçe',
			iso: 'tr-TR',
			file: 'tr-TR.js',
		}, {
			code: 'de',
			name: 'Deutsch',
			iso: 'de-DE',
			file: 'de-DE.js',
		}, {
			code: 'it',
			name: 'Italiano',
			iso: 'it-IT',
			file: 'it-IT.js',
		}],
		defaultLocale: 'ru',
		vueI18nLoader: true,
		vueI18n: {
			fallbackLocale: 'ru',
			silentFallbackWarn: true,
		},
		lazy: true,
		langDir: 'app/locale_global/',
		seo: false,
		baseUrl: FRONT_URL,
		detectBrowserLanguage: {
			alwaysRedirect: true,
			useCookie: true,
			cookieKey: 'i18n_redirected',
			onlyOnRoot: false,
		},
		vuex: {
			moduleName: 'i18n',
			syncLocale: true,
			syncMessages: false,
			syncRouteParams: true,
		},
	},
	auth: {
		localStorage: false,
		cookie: {
			options: {
				expires: 30,
			},
		},
		redirect: {
			login: '/login/',
			logout: '/',
			callback: '/c/',
			home: '/cp/',
		},
		strategies: {
			email: {
				_scheme: 'local',
				endpoints: {
					login: {
						url: 'login/local',
						method: 'post',
						propertyName: 'data.token',
					},
					user: {
						url: 'user/',
						method: 'get',
						propertyName: 'success',
					},
				},
			},
			uLoginByToken: {
				_scheme: 'local',
				endpoints: {
					login: {
						url: 'login/ulogin/token',
						method: 'post',
						propertyName: 'data.token',
					},
					user: {
						url: 'user/',
						method: 'get',
						propertyName: 'success',
					},
				},
			},
			uLoginByData: {
				_scheme: 'local',
				endpoints: {
					login: {
						url: 'login/ulogin/data',
						method: 'post',
						propertyName: 'data.token',
					},
					user: {
						url: 'user/',
						method: 'get',
						propertyName: 'success',
					},
				},
			},
		},
		plugins: [
			'~/plugins/authLocaleRedirects.js',
		],
	},
	styleResources: {
		scss: [
			'bootstrap/scss/_functions.scss',
			'bootstrap/scss/_variables.scss',
			'bootstrap/scss/_mixins.scss',
			'~/assets/styles/_variables.scss',
			'~/assets/styles/_mixins.scss',
			'~/assets/styles/components/mixins/responsive.mixin.scss',
			'~/assets/styles/components/_mixins.scss',
			'~/assets/styles/components/_variables.scss',
		],
		sass: [
			'~/assets/styles/sass/_variables.sass',
			'~/assets/styles/sass/mixins/responsive.mixin.sass',
		],
	},
	sentry: {
		dsn: 'https://0bb4917a4c8a4f17bc8c15e1ff8273f0@o439470.ingest.sentry.io/5411452',
	},
	polyfill: {
		features: [{
			require: 'intersection-observer',
			detect: () => 'IntersectionObserver' in window,
		}, {
			require: 'smoothscroll-polyfill',
			detect: () => 'scrollBehavior' in document.documentElement.style
        && window.__forceSmoothScrollPolyfill__ !== true,
			install: smoothscroll => smoothscroll.polyfill(),
		}],
	},
	serverMiddleware: [
		'~/serverMiddleware/security-policy.js',
		'~/serverMiddleware/paymentNoReferer.js',
		'~/serverMiddleware/redirects.js',
		'~/serverMiddleware/defaultLocale.js',
	],
	hooks: {
		listen(server) {
			// The signals we want to handle
			// NOTE: although it is tempting, the SIGKILL signal (9) cannot be intercepted and handled
			const signals = {
				SIGHUP: 1,
				SIGINT: 2,
				SIGTERM: 15,
			}
			// Do any necessary shutdown logic for our application here
			const shutdown = (signal, value) => {
				// console.log('shutdown!');
				server.close(() => {
					// console.log(`server stopped by ${signal} with value ${value}`);
					process.exit(128 + value)
				})
			}
			// Create a listener for each of the signals that we want to handle
			Object.keys(signals).forEach(signal => {
				process.on(signal, () => {
					// console.log(`process received a ${signal} signal`);
					shutdown(signal, signals[signal])
				})
			})
		},
		'generate:before': async generator => {
			try {
				const { data: { data: services } } = await axios.get(`${generator.options.axios.baseURL}/user_services/tiny`, {
					params: {
						labels: 'CLIENT_MAIN VISIBLE',
						platform: 'INSTAGRAM',
					},
				})
				await new Promise(resolve => fs.writeFile('./static/instagram_services.json', JSON.stringify(services), 'utf8', resolve))

				for (const currency of CURRENCIES) {
					await new Promise((resolve, reject) => {
						axios.get(`${generator.options.axios.baseURL}/prices/tiny`, {
							params: {
								cur: currency,
								labels: 'CLIENT_MAIN VISIBLE',
								platform: 'INSTAGRAM',
								counts: COUNTS,
							},
						}).then(({ data: { data: cost } }) => {
							if (cost) {
								fs.writeFile(`./static/instagram_costs_${currency}.json`, JSON.stringify(cost), 'utf8', resolve)
							}
							else {
								resolve()
							}
						}).catch(reject)
					})
				}
			}
			catch (e) {
				// eslint-disable-next-line no-console
				console.error('NUXT : HOOK : generate:before', e)
			}
		},
	},
	build: {
		filenames: {
			app: isDev ? '[name].js' : 'js/app-[chunkhash].js',
			chunk: isDev ? '[name].js' : 'js/chunk-[chunkhash].js',
			css: isDev ? '[name].css' : 'css/css-[chunkhash].css',
			img: isDev ? '[path][name].[ext]' : 'img/img-[contenthash:7].[ext]',
			font: isDev ? '[path][name].[ext]' : 'fonts/font-[contenthash:7].[ext]',
			video: isDev ? '[path][name].[ext]' : 'videos/video-[contenthash:7].[ext]',
		},
		friendlyErrors: true,
		...(isProduction && {
			parallel: true,
			// cache: true,
			extractCSS: {
				ignoreOrder: true,
			},
			html: {
				minify: {
					collapseBooleanAttributes: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					processConditionalComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					trimCustomFragments: true,
					useShortDoctype: true,
				},
			},
		}),
		splitChunks: {
			layouts: true,
			pages: true,
			commons: true,
		},
		optimization: {
			minimize: isProduction,
			splitChunks: {
				cacheGroups: {
					styles: {
						name: 'styles',
						test: /\.(css|vue)$/,
						chunks: 'all',
						enforce: true,
					},
				},
				maxSize: 200000,
			},
			namedChunks: true,
			chunkIds: 'named',
		},
		postcss: {
			order: 'cssnanoLast',
			preset: {
				browsers: 'cover 99.5%',
				autoprefixer: true,
			},
		},
		loaders: {
			fontUrl: {
				limit: 1024,
			},
			imgUrl: {
				limit: 3072,
			},
		},
		extend(config) {
			config.devtool = 'source-map'
		},
	},
	pwa: {
		meta: {
			charset: 'utf-8',
			title: 'SmmTouch.com',
			author: 'SmmTouch.com',
			description: 'Boost likes, followers and views on Instagram. Fast, cheap and guaranteed Instagram boost via a link. Learn how to boost your Instagram safely.',
			theme_color: '#009dff',
			crossorigin: 'use-credentials',
			name: 'SmmTouch.com',
			appleStatusBarStyle: 'white',
		},
		manifest: {
			start_url: process.env.PWA_SITE_ADDRESS || 'https://smmtouch.com/?source=pwa',
			name: 'SmmTouch.com',
			short_name: 'SmmTouch',
			description: 'Boost likes, followers and views on Instagram. Fast, cheap and guaranteed Instagram boost via a link. Learn how to boost your Instagram safely.',
			lang: 'en',
			display: 'standalone',
			background_color: '#fff',
			theme_color: '#009dff',
			useWebmanifestExtension: false,
		},
		workbox: {
			runtimeCaching: [
				{
					urlPattern: '_nuxt/.*',
					strategyOptions: {
						cacheName: 'our-cache',
					},
					strategyPlugins: [{
						use: 'Expiration',
						config: {
							maxEntries: 10,
							maxAgeSeconds: 300,
						},
					}],
				},
			],
		},
	},
}
