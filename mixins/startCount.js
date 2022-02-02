import get from 'lodash/get'

export default {
	computed: {
		startCount() {
			switch (get(this.order, 'tag', '')) {
				case 'INSTAGRAM_AUTO_LIKES_LK':
				case 'INSTAGRAM_AUTO_LIKES_MAIN':
				case 'INSTAGRAM_LIKES_LK':
				case 'INSTAGRAM_LIKES_MAIN':
				case 'INSTAGRAM_LIVE_LIKES_LK':
				case 'INSTAGRAM_MULTI_LIKES_LK':
				case 'INSTAGRAM_MULTI_LIKES_MAIN':
				case 'TIKTOK_AUTO_LIKES_LK':
				case 'TIKTOK_AUTO_LIKES_MAIN':
				case 'TIKTOK_LIKES_LK':
				case 'TIKTOK_LIKES_MAIN':
				case 'VK_LIKES_LK':
				case 'VK_LIKES_MAIN':
				case 'VK_AUTO_LIKES_LK':
				case 'VK_AUTO_LIKES_MAIN':
					return get(this.order, 'params.sdata.likes.count', get(this.order, 'params.sdata.likes', 0)) || 0
				case 'INSTAGRAM_AUTO_VIEWS_LK':
				case 'INSTAGRAM_AUTO_VIEWS_MAIN':
				case 'INSTAGRAM_VIEWS_IGTV_LK':
				case 'INSTAGRAM_VIEWS_SHOWS_IMPRESSIONS_LK':
				case 'INSTAGRAM_VIEWS_STORY_LK':
				case 'INSTAGRAM_VIEWS_STORY_MAIN':
				case 'INSTAGRAM_VIEWS_VIDEO_LK':
				case 'INSTAGRAM_VIEWS_VIDEO_MAIN':
				case 'TIKTOK_AUTO_VIEWS_LK':
				case 'TIKTOK_AUTO_VIEWS_MAIN':
				case 'TIKTOK_VIEWS_LK':
				case 'TIKTOK_VIEWS_MAIN':
					return get(this.order, 'params.sdata.views', 0) || 0
				case 'INSTAGRAM_COMMENTS_CUSTOM_LK':
				case 'INSTAGRAM_COMMENTS_POSITIVE_LK':
				case 'INSTAGRAM_MULTI_COMMENTS_CUSTOM_LK':
				case 'INSTAGRAM_MULTI_COMMENTS_POSITIVE_LK':
				case 'TIKTOK_COMMENTS_CUSTOM_LK':
				case 'TIKTOK_COMMENTS_POSITIVE_LK':
				case 'VK_COMMENTS_LK':
				case 'VK_COMMENTS_MAIN':
					return get(this.order, 'params.sdata.comments.count', get(this.order, 'params.sdata.comments', 0)) || 0
				case 'INSTAGRAM_SUBS_LK':
				case 'INSTAGRAM_SUBS_MAIN':
				case 'TIKTOK_SUBS_LK':
				case 'TIKTOK_SUBS_MAIN':
				case 'VK_SUBS_LK':
				case 'VK_SUBS_MAIN':
					return get(this.order, 'params.sdata.followers', 0) || 0
				case 'TIKTOK_REPOSTS_LK':
				case 'TIKTOK_REPOSTS_MAIN':
				case 'VK_REPOSTS_LK':
				case 'VK_REPOSTS_MAIN':
					return get(this.order, 'params.sdata.reposts.count', get(this.order, 'params.sdata.reposts', 0)) || 0
				case 'VK_FRIENDS_LK':
				case 'VK_FRIENDS_MAIN':
					return (get(this.order, 'params.sdata.friends_count', 0) || 0) + (get(this.order, 'params.sdata.followers', 0) || 0)
				default:
					return get(this.order, 'initialValue', 0)
			}
		},
	},
}
