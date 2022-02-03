/**
 * Фильтр требуется для разделения знаков по тысячам
 */
import Vue from 'vue'

const thousandsHandler = (val = 0, clear = true) => {
	if (0 === val || '0' === val || 1 === val || '1' === val) {
		return val
	}

	const preparedValue = Number(String(val)
		.replace(/[\s%]/g, '')
		.replace(/[,%]/g, '.'),
	)

	try {
		return String(new Intl.NumberFormat('ru', {
			style: 'decimal',
			useGrouping: true,
			minimumFractionDigits: (preparedValue < 1) ? 2 : 0,
			maximumFractionDigits: clear ? 2 : 3,
		})
			.format(preparedValue))
			.replace(',', '.')
	}
	catch {
		const parts = preparedValue.toString().split('.')

		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		parts[1] = parts[1] && parts[1].substr(0, 3)
		return parts[1] ? parts.join('.') : parts[0]
	}
}

Vue.filter('thousands', thousandsHandler)

export const thousandsFilter = thousandsHandler
