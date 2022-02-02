import api from '~/app/http.api.js'

export default (ctx, inject) => {
	inject('http', api(ctx.$axios, ctx.store))
}
