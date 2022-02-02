import Vue from 'vue'
// import element from 'element-ui';
import Button from 'element-ui/lib/button'
import Input from 'element-ui/lib/input'
import InputNumber from 'element-ui/lib/input-number'
import Option from 'element-ui/lib/option'
import Select from 'element-ui/lib/select'
import Dropdown from 'element-ui/lib/dropdown'
import DropdownItem from 'element-ui/lib/dropdown-item'
import DropdownMenu from 'element-ui/lib/dropdown-menu'
import Notification from 'element-ui/lib/notification'
import DatePicker from 'element-ui/lib/date-picker'
import ElBadge from 'element-ui/lib/badge'
import ElTooltip from 'element-ui/lib/tooltip'
import ElPopover from 'element-ui/lib/popover'
import ElRow from 'element-ui/lib/row'

import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'

locale.use(lang)
// Vue.use(element);

Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Option)
Vue.use(Select)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(DatePicker)
Vue.use(ElBadge)
Vue.use(ElTooltip)
Vue.use(ElPopover)
Vue.use(ElRow)

Vue.prototype.$notify = params => {
	Notification({
		...params,
		position: 'top-right',
		dangerouslyUseHTMLString: true,
		customClass: params.type,
	})
}
