import get from 'lodash/get'

function retrieveRole(roles) {
	if (!roles || !roles.length) {
		return 'user'
	}
	if (roles.includes('ROLE_ADMIN')) {
		return 'admin'
	}
	if (roles.includes('ROLE_MODERATOR')) {
		return 'moderator'
	}
	if (roles.includes('ROLE_MANAGER')) {
		return 'manager'
	}
	if (roles.includes('ROLE_SEO')) {
		return 'seo'
	}
	if (roles.includes('ROLE_PROXY')) {
		return 'proxy'
	}
	return 'user'
}

export const getters = {
	role: (_, __, rootState) => retrieveRole(get(rootState, 'auth.user.roles', false)),
	isAdmin: (_, getters) => 'admin' === getters.role,
	isManager: (_, getters) => 'manager' === getters.role,
	hasGreenToggle: (_, getters) => [ 'admin', 'moderator', 'manager' ].includes(getters.role),
}
