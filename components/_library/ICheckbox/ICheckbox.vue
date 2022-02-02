<template>
	<label class="i-checkbox" :class="{'is-hover': hover}">
		<input
			type="checkbox"
			:checked="checked"
			:value="value"
			@change="$emit('change', $event.target.checked)">
		<i />
		{{ label }}
	</label>
</template>

<script>
export default {
	model: {
		prop: 'checked',
		event: 'change',
	},
	props: {
		checked: {
			type: Boolean,
			default: false,
		},
		hover: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [ String, Number ],
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
	},
}
</script>

<style lang="scss">
	.i-checkbox {
		position: relative;
		display: block;
		font-weight: 400;
		min-width: 14px;
		height: 14px;
		cursor: pointer;
		line-height: 1;
		padding-left: 1.5rem;

		&::after {
			content: '';
			position: absolute;
			top: calc(-.5rem - 1px);
			left: calc(-.5rem - 1px);
			width: 2rem;
			height: 2rem;
			background: $grey;
			border-radius: 50%;
			opacity: 0;
		}

		&:hover,
		&.is-hover {
			&::after {
				opacity: .15;
			}

			i {
				border-color: $c-orders-history;
			}
		}

		input {
			position: absolute;
			left: -9999px;

			&:checked + i {
				border-color: $c-orders-history;
				background: $c-orders-history;

				&::after {
					opacity: 1;
				}
			}
		}

		i {
			position: absolute;
			top: 0;
			left: 0;
			width: 14px;
			height: 14px;
			outline: 0;
			border: 1px solid #BBB;
			border-radius: 2px;
			color: #FFF;

			&::after {
				position: absolute;
				top: 3px;
				left: 2px;
				width: 100%;
				height: 100%;
				content: '';
				opacity: 0;
				text-align: center;

				/* eslint-disable-next-line max-len */
				background-image: str-replace(url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 5'%3E%3Cpath fill='#{$white}' d='M6.87355 0.690236C6.95785 0.768799 7 0.864197 7 0.976431C7 1.08866 6.95785 1.18406 6.87355 1.26263L3.60387 4.30976L2.98968 4.88215C2.90538 4.96072 2.80301 5 2.68258 5C2.56215 5 2.45978 4.96072 2.37548 4.88215L1.76129 4.30976L0.126452 2.7862C0.0421505 2.70763 0 2.61223 0 2.5C0 2.38777 0.0421505 2.29237 0.126452 2.2138L0.740645 1.64141C0.824946 1.56285 0.927312 1.52357 1.04774 1.52357C1.16817 1.52357 1.27054 1.56285 1.35484 1.64141L2.68258 2.883L5.64516 0.117845C5.72946 0.0392817 5.83183 0 5.95226 0C6.07269 0 6.17505 0.0392817 6.25935 0.117845L6.87355 0.690236Z'/%3E%3C/svg%3E"), "#", "%23");
				background-repeat: no-repeat;
				background-size: 8px 6px;
			}
		}
	}
</style>
