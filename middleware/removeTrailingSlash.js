export default ({ route, redirect }) => {
	const queryParams = route.fullPath.split('?')[1]
	if (route.path.endsWith('/')) {
		redirect(route.path.slice(0, route.path.length - 1) + (queryParams ? `?${queryParams}` : ''))
	}
}
