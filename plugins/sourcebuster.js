import sbjs from 'sourcebuster'

export default (ctx, inject) => {
	sbjs.init({
		domain: 'smmtouch.com',
		lifetime: 3,
	})
	inject('sbjs', sbjs)
}
