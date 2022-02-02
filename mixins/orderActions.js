const MODER_COMPLETE_MAIN = {
	title: 'Завершить (главная)',
	type: 'success',
	icon: 'el-icon-success',
	name: 'complete_main',
	ids: [],
}
const MODER_COMPLETE = {
	title: 'Завершить',
	type: 'success',
	icon: 'el-icon-success',
	name: 'complete',
	ids: [],
}
const MODER_STOP = {
	title: 'Остановить',
	type: 'danger',
	icon: 'el-icon-error',
	name: 'stop',
	ids: [],
}
const MODER_RUN = {
	title: 'Перезапустить',
	type: 'info',
	icon: 'el-icon-video-play',
	name: 'run',
	ids: [],
}
const MODER_CANCEL = {
	title: 'Отменить',
	type: 'danger',
	icon: 'el-icon-error',
	name: 'cancel',
	ids: [],
}

export default {
	computed: {
		actionsList() {
			return {
				complete_main: MODER_COMPLETE_MAIN,
				complete: MODER_COMPLETE,
				stop: MODER_STOP,
				run: MODER_RUN,
				cancel: MODER_CANCEL,
			}
		},
	},
	methods: {
		orderActions(order) {
			if (
				order.roles
     && order.roles.includes
     && order.roles.includes('ROLE_AUTO')
     && [ 'STATUS_PARTIAL_COMPLETED', 'STATUS_CANCELED' ].includes(order.status)
			) {
				return [ MODER_COMPLETE_MAIN ]
			}
			if ([ 'STATUS_PAID', 'STATUS_UPDATING' ].includes(order.status)) {
				return [ MODER_RUN ]
			}
			const list = []
			if ([ 'STATUS_RUNNING', 'STATUS_ERROR' ].includes(order.status)) {
				list.push(MODER_COMPLETE)
			}
			if ('STATUS_RUNNING' === order.status) {
				list.push(MODER_STOP)
			}
			if ('STATUS_ERROR' === order.status) {
				list.push(MODER_RUN, MODER_CANCEL)
			}
			return list
		},
	},
}
