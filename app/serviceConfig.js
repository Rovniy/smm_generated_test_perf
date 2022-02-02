import {
	required,
	// url,
	// or,
	and,
	numeric,
	minValue,
	maxValue,
} from 'vuelidate/lib/validators/index.js'

const SERVICE_CONFIG = (min = 100, max = 1e5, postMax = 0) => ({
	urlLogin: {},
	quantity: {
		min,
		max,
	},
	...postMax && {
		postQuantity: {
			min: 1,
			max: postMax,
		},
	},
})

const FAKE_SERVICES_CONFIG = () => ({
	...SERVICE_CONFIG(1, 1e10),
	target1: {
		min: 0,
	},
	target2: {
		min: 0,
	},
})

export const SERVICES_CONFIG = (tag, min, max, postMax = 100) => {
	switch (tag) {
		case 'INSTAGRAM_LIKES_MAIN':
		case 'INSTAGRAM_LIKES_LK':
		case 'INSTAGRAM_SUBS_MAIN':
		case 'INSTAGRAM_SUBS_LK':
		case 'INSTAGRAM_VIEWS_VIDEO_MAIN':
		case 'INSTAGRAM_VIEWS_VIDEO_LK':
		case 'INSTAGRAM_VIEWS_IGTV_MAIN':
		case 'INSTAGRAM_VIEWS_IGTV_LK':
		case 'INSTAGRAM_VIEWS_STORY_MAIN':
		case 'INSTAGRAM_VIEWS_STORY_LK':
		case 'INSTAGRAM_VIEWS_REEL_MAIN':
		case 'INSTAGRAM_VIEWS_REEL_LK':
		case 'INSTAGRAM_VIEWS_SHOWS_IMPRESSIONS_LK':
		case 'INSTAGRAM_LIVE_LIKES_LK':
		case 'INSTAGRAM_LIVE_VIEWERS_LK':
		case 'INSTAGRAM_COMMENTS_CUSTOM_LK':
		case 'INSTAGRAM_COMMENTS_POSITIVE_LK':
		case 'TIKTOK_LIKES_MAIN':
		case 'TIKTOK_LIKES_LK':
		case 'TIKTOK_SUBS_MAIN':
		case 'TIKTOK_SUBS_LK':
		case 'TIKTOK_VIEWS_MAIN':
		case 'TIKTOK_VIEWS_LK':
		case 'TIKTOK_REPOSTS_MAIN':
		case 'TIKTOK_REPOSTS_LK':
		case 'TIKTOK_COMMENTS_POSITIVE_LK':
		case 'TIKTOK_COMMENTS_CUSTOM_LK':
		case 'YOUTUBE_LIKES_MAIN':
		case 'YOUTUBE_LIKES_LK':
		case 'YOUTUBE_DISLIKES_MAIN':
		case 'YOUTUBE_DISLIKES_LK':
		case 'YOUTUBE_SUBS_MAIN':
		case 'YOUTUBE_SUBS_LK':
		case 'YOUTUBE_VIEWS_MAIN':
		case 'YOUTUBE_VIEWS_LK':
		case 'VK_LIKES_MAIN':
		case 'VK_LIKES_LK':
		case 'VK_SUBS_MAIN':
		case 'VK_SUBS_LK':
		case 'VK_FRIENDS_MAIN':
		case 'VK_FRIENDS_LK':
		case 'VK_REPOSTS_MAIN':
		case 'VK_REPOSTS_LK':
		case 'VK_COMMENTS_MAIN':
		case 'VK_COMMENTS_LK':
			return SERVICE_CONFIG(min, max)
		case 'INSTAGRAM_AUTO_LIKES_MAIN':
		case 'INSTAGRAM_AUTO_LIKES_LK':
		case 'INSTAGRAM_AUTO_VIEWS_MAIN':
		case 'INSTAGRAM_AUTO_VIEWS_LK':
		case 'INSTAGRAM_MULTI_LIKES_MAIN':
		case 'INSTAGRAM_MULTI_LIKES_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_POSITIVE_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK':
		case 'TIKTOK_AUTO_VIEWS_MAIN':
		case 'TIKTOK_AUTO_VIEWS_LK':
		case 'TIKTOK_AUTO_LIKES_MAIN':
		case 'TIKTOK_AUTO_LIKES_LK':
		case 'VK_AUTO_LIKES_MAIN':
		case 'VK_AUTO_LIKES_LK':
			return SERVICE_CONFIG(min, max, postMax)
		case 'FAKE_SERVICE_LK':
			return FAKE_SERVICES_CONFIG()
		default:
			return false
	}
}
/* *****  LANDING SERVICES ***** */
export const RE = {
	urlHead: () => '^(https?:\\/\\/)?(www\\.)?',
	urlTail: () => '\\/?((\\?|#)[\\w=#%&-]*)?$',
	instagram: () => `${RE.urlHead()}(instagr\\.(am|com)|(instagram\\.[a-z]{2,3}(\\.[a-z]{2,3})?))\\/`,
	/**
	 * Не может быть www.instagram.com | instagram.com
	 */
	instagramLogin: () => '@?(?!(explore|about|accounts|developer)$)(?!(www\\.)?instagram(\\.com)?$)[\\w]((?!.*?\\.{2})[\\w.]{0,28}[\\w])?',
	instagramStory: () => `${RE.instagram()}(${RE.instagramLogin()}\\/)?(s|stories(\\/highlights)?)(\\/${RE.instagramLogin()})?${RE.instagramPost()}${RE.urlTail()}`,
	instagramVideo: () => `${RE.instagram()}(${RE.instagramLogin()}\\/)?(p|tv|reel)${RE.instagramPost()}${RE.urlTail()}`,
	instagramAccount: () => `${RE.instagram()}${RE.instagramLogin()}${RE.urlTail()}`,
	instagramLoginOrAccount: () => `${RE.instagramAccount()}|^${RE.instagramLogin()}$`,
	/**
	 * Изначально был квантификатор {11}, но есть закрытые аккаунты (см. док Парсинг ссылок)
	 * Решили не привязываться к длине, поскольку все быстро меняется
	 */
	instagramPost: () => '\\/([\\w_-]*)',
	vk: () => '\\S*(vk\\.com|vkontakte\\.ru)\\/',
	tiktok: () => '\\S*(tiktok\\.com)\\/\\S+',
	youtube: () => '\\S*(youtube\\.com|youtu\\.be)\\/\\S+',
	login: () => '@?[\\w\\.-]{0,29}',
}

export const VALIDATIONS = {
	validateInstagramLogin: string => (new RegExp(`^${RE.instagramLogin()}$`, 'i')).test(string),
	validateInstagramLoginOrAccountOrStory: string => (new RegExp(`${RE.instagramLoginOrAccount()}|${RE.instagramStory()}`, 'i')).test(string),
	validateInstagramLoginOrAccountOrVideo: string => (new RegExp(`${RE.instagramLoginOrAccount()}|${RE.instagramStory()}`, 'i')).test(string),
	validateInstagramLoginOrAccount: string => (new RegExp(`${RE.instagramLoginOrAccount()}|${RE.instagramVideo()}`, 'i')).test(string),
	validateInstagramPost: string => VALIDATIONS.validateInstagramVideo(string), // it's possible to like tv or reel too.
	validateInstagramVideo: string => (new RegExp(`${RE.instagramVideo()}`, 'i')).test(string),
	validateInstagramPostReel: string => (new RegExp(`${RE.instagram()}(${RE.instagramLogin()}\\/)?(p|reel)${RE.instagramPost()}${RE.urlTail()}`, 'i')).test(string),
	validateInstagramTvReel: string => (new RegExp(`${RE.instagram()}(${RE.instagramLogin()}\\/)?(tv|reel)${RE.instagramPost()}${RE.urlTail()}`, 'i')).test(string),
	validateInstagramIgtv: string => (new RegExp(`${RE.instagram()}(${RE.instagramLogin()}\\/)?tv${RE.instagramPost()}${RE.urlTail()}`, 'i')).test(string),
	validateVkPost: string => (new RegExp(`${RE.vk()}[\\w-]+${RE.urlTail()}`, 'i')).test(string),
	validateVkLoginOrAccount: string => (new RegExp(`${RE.vk()}\\w+${RE.urlTail()}|^${RE.login()}$`, 'i')).test(string),
	validateVkLoginOrGroup: string => (new RegExp(`${RE.vk()}\\w+${RE.urlTail()}|^${RE.login()}$`, 'i')).test(string),
	validateTiktokLoginOrAccount: string => (new RegExp(`${RE.tiktok()}|^(?!(www\\.)?tiktok.com$)${RE.login()}$`, 'i')).test(string),
	validateTiktokVideo: string => (new RegExp(RE.tiktok(), 'i')).test(string),
	/**
	 * Логин не может быть www.youtube.com | youtube.com
	 */
	validateYoutubeLoginOrAccount: string => (new RegExp(`${RE.youtube()}|^(?!(www\\.)?youtube.com$)${RE.login()}$`, 'i')).test(string),
	validateYoutubeVideo: string => (new RegExp(RE.youtube(), 'i')).test(string),
}

export const VALIDATE_URL_LOGIN = validationName => ({
	urlLogin: {
		required,
		[validationName]: and(
			VALIDATIONS[validationName],
		),
	},
})

const urlLoginMain = tag => {
	switch (tag) {
		case 'INSTAGRAM_LIKES_MAIN':
			return 'validateInstagramPost'
		case 'INSTAGRAM_VIEWS_VIDEO_MAIN':
			return 'validateInstagramVideo'
		case 'INSTAGRAM_VIEWS_STORY_MAIN':
			return 'validateInstagramLoginOrAccountOrStory'
		case 'INSTAGRAM_SUBS_MAIN':
		case 'INSTAGRAM_AUTO_LIKES_MAIN':
		case 'INSTAGRAM_AUTO_VIEWS_MAIN':
		case 'INSTAGRAM_MULTI_LIKES_MAIN':
			return 'validateInstagramLoginOrAccount'
		case 'TIKTOK_SUBS_MAIN':
		case 'TIKTOK_AUTO_LIKES_MAIN':
		case 'TIKTOK_AUTO_VIEWS_MAIN':
			return 'validateTiktokLoginOrAccount'
		case 'TIKTOK_LIKES_MAIN':
		case 'TIKTOK_VIEWS_MAIN':
		case 'TIKTOK_REPOSTS_MAIN':
			return 'validateTiktokVideo'
		case 'YOUTUBE_SUBS_MAIN':
			return 'validateYoutubeLoginOrAccount'
		case 'YOUTUBE_VIEWS_MAIN':
		case 'YOUTUBE_LIKES_MAIN':
		case 'YOUTUBE_DISLIKES_MAIN':
			return 'validateYoutubeVideo'
		case 'VK_SUBS_MAIN':
			return 'validateVkLoginOrGroup'
		case 'VK_LIKES_MAIN':
		case 'VK_COMMENTS_MAIN':
		case 'VK_REPOSTS_MAIN':
			return 'validateVkPost'
		case 'VK_FRIENDS_MAIN':
		case 'VK_AUTO_LIKES_MAIN':
			return 'validateVkLoginOrAccount'
		default:
			return false
	}
}
const postQuantityFlagMain = tag => {
	switch (tag) {
		case 'INSTAGRAM_AUTO_LIKES_MAIN':
		case 'INSTAGRAM_AUTO_VIEWS_MAIN':
		case 'INSTAGRAM_MULTI_LIKES_MAIN':
		case 'TIKTOK_AUTO_LIKES_MAIN':
		case 'TIKTOK_AUTO_VIEWS_MAIN':
		case 'VK_AUTO_LIKES_MAIN':
			return true
		default:
			return false
	}
}
export const MAIN_VALIDATION = (tag, min, max, postsMax = 100) => {
	return urlLoginMain(tag) && {
		...VALIDATE_URL_LOGIN(urlLoginMain(tag)),
		...QUANTITY_PARAMS(min, max),
		...postQuantityFlagMain(tag) && POST_QUANTITY_PARAMS(postsMax),
	}
}

const QUANTITY_PARAMS = (min, max, name = 'quantity') => ({
	[name]: {
		required,
		numeric,
		minValue: minValue(min),
		maxValue: maxValue(max),
	},
})
const POST_QUANTITY_PARAMS = max => ({
	postQuantity: {
		required,
		numeric,
		minValue: minValue(1),
		maxValue: maxValue(max),
	},
})

const COMMENTS_PARAMS = {
	comments: {
		$each: {
			text: {
				required,
			},
		},
	},
}

const CP_VALIDATE_URL_LOGIN = tag => {
	switch (tag) {
		case 'INSTAGRAM_LIKES_LK':
		case 'INSTAGRAM_COMMENTS_POSITIVE_LK':
		case 'INSTAGRAM_COMMENTS_CUSTOM_LK':
			return VALIDATE_URL_LOGIN('validateInstagramPost')
		case 'INSTAGRAM_VIEWS_SHOWS_IMPRESSIONS_LK':
		case 'INSTAGRAM_VIEWS_VIDEO_LK':
			return VALIDATE_URL_LOGIN('validateInstagramPostReel')
		case 'INSTAGRAM_VIEWS_IGTV_LK':
			return VALIDATE_URL_LOGIN('validateInstagramIgtv')
		case 'INSTAGRAM_SUBS_LK':
		case 'INSTAGRAM_AUTO_LIKES_LK':
		case 'INSTAGRAM_AUTO_VIEWS_LK':
		case 'INSTAGRAM_MULTI_LIKES_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_POSITIVE_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK':
		case 'INSTAGRAM_LIVE_LIKES_LK':
			return VALIDATE_URL_LOGIN('validateInstagramLoginOrAccount')
		case 'INSTAGRAM_LIVE_VIEWERS_LK':
			return VALIDATE_URL_LOGIN('validateInstagramLoginOrAccountOrVideo')
		case 'INSTAGRAM_VIEWS_STORY_LK':
			return VALIDATE_URL_LOGIN('validateInstagramLoginOrAccountOrStory')
		case 'TIKTOK_SUBS_LK':
		case 'TIKTOK_AUTO_VIEWS_LK':
		case 'TIKTOK_AUTO_LIKES_LK':
			return VALIDATE_URL_LOGIN('validateTiktokLoginOrAccount')
		case 'TIKTOK_LIKES_LK':
		case 'TIKTOK_VIEWS_LK':
		case 'TIKTOK_REPOSTS_LK':
		case 'TIKTOK_COMMENTS_POSITIVE_LK':
		case 'TIKTOK_COMMENTS_CUSTOM_LK':
			return VALIDATE_URL_LOGIN('validateTiktokVideo')
		case 'YOUTUBE_SUBS_LK':
			return VALIDATE_URL_LOGIN('validateYoutubeLoginOrAccount')
		case 'YOUTUBE_LIKES_LK':
		case 'YOUTUBE_DISLIKES_LK':
		case 'YOUTUBE_VIEWS_LK':
			return VALIDATE_URL_LOGIN('validateYoutubeVideo')
		case 'VK_SUBS_LK':
			return VALIDATE_URL_LOGIN('validateVkLoginOrGroup')
		case 'VK_FRIENDS_LK':
		case 'VK_AUTO_LIKES_LK':
			return VALIDATE_URL_LOGIN('validateVkLoginOrAccount')
		case 'VK_LIKES_LK':
		case 'VK_COMMENTS_LK':
		case 'VK_REPOSTS_LK':
			return VALIDATE_URL_LOGIN('validateVkPost')
		case 'FAKE_SERVICE_LK':
			return {
				urlLogin: {
					required,
				},
			}
		default:
			return false
	}
}

const CP_VALIDATE_QUANTITY = (tag, min, max, quantityMin, quantityMax) => {
	switch (tag) {
		case 'INSTAGRAM_AUTO_LIKES_LK':
		case 'INSTAGRAM_AUTO_VIEWS_LK':
			return {
				...QUANTITY_PARAMS(min, quantityMax || max, 'quantityMin'),
				...QUANTITY_PARAMS(quantityMin || min, max, 'quantityMax'),
			}
		default:
			return QUANTITY_PARAMS(min, max)
	}
}

const CP_VALIDATE_POSTS = tag => {
	switch (tag) {
		case 'INSTAGRAM_MULTI_LIKES_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_POSITIVE_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK':
		case 'INSTAGRAM_AUTO_LIKES_LK':
		case 'INSTAGRAM_AUTO_VIEWS_LK':
		case 'TIKTOK_AUTO_LIKES_LK':
		case 'TIKTOK_AUTO_VIEWS_LK':
		case 'VK_AUTO_LIKES_LK':
			return true
		default:
			return false
	}
}

const CP_VALIDATE_COMMENTS = tag => {
	switch (tag) {
		case 'INSTAGRAM_COMMENTS_CUSTOM_LK':
		case 'INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK':
			return true
		default:
			return false
	}
}

export const CP_VALIDATION = (tag, min, max, quantityMin, quantityMax, postsMax = 100) => {
	return {
		...CP_VALIDATE_URL_LOGIN(tag),
		...CP_VALIDATE_QUANTITY(tag, min, max, quantityMin, quantityMax),
		...CP_VALIDATE_POSTS(tag) && POST_QUANTITY_PARAMS(postsMax),
		...CP_VALIDATE_COMMENTS(tag) && COMMENTS_PARAMS,
		...('FAKE_SERVICE_LK' === tag) && {
			target1: {
				required,
				numeric,
				minValue: minValue(SERVICES_CONFIG(tag).target1.min),
			},
			target2: {
				required,
				numeric,
				minValue: minValue(SERVICES_CONFIG(tag).target2.min),
			},
		},
	}
}
