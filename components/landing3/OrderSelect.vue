<template>
	<div
		v-click-outside="deactivate"
		class="order-select">
		<button
			class="order-select__button"
			type="button"
			:class="{ 'active': isDropdownActive }"
			@click="isDropdownActive = !isDropdownActive">
			<span class="order-select__prefix">
				<svg-icon
					:name="`order-post-${value}`"
					:class="`svg-sprite--order-post-${value}`" />
			</span>
			{{ $t(value) }}
		</button>
		<ul
			v-if="isDropdownActive"
			class="order-select__dropdown">
			<li
				v-for="item in list"
				:key="item"
				class="order-select__dropdown-item"
				@click="select(item)">
				<span class="order-select__prefix">
					<svg-icon
						:name="`order-post-${item}`"
						:class="`svg-sprite--order-post-${item}`" />
				</span>
				{{ $t(item) }}
			</li>
		</ul>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
	directives: {
		ClickOutside,
	},
	props: {
		list: {
			type: Array,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			isDropdownActive: false,
		}
	},
	methods: {
		select(item) {
			this.isDropdownActive = false
			this.$emit('input', item)
		},
		deactivate() {
			if (this.isDropdownActive) {
				this.isDropdownActive = false
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/_variables.scss";
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-primary: var(--color-primary, $primary);

.order-select {
	position: relative;
	color: #213242;
	text-align: left;
	font: inherit;

	&__button {
		position: relative;
		width: 100%;
		height: 45px;
		margin: 0;
		border: 1px solid $color-gray;
		border-radius: 5px;
		text-align: left;

		padding: 0 0 0 48px;

		font: inherit;

		appearance: none;

		transition: $transition-fast;

		&:after {
			transition: $transition;
			content: '';
			position: absolute;
			top: 50%;
			right: 12px;
			width: 11px;
			height: 7px;
			transform: translateY(-50%);
			background-image: url('~assets/svg/order/chevron-select.svg?data');
		}

		&:hover {
			border-color: #c0c4cc;
		}

		&.active {
			border-color: $color-primary !important;

			&:after {
				transform: translateY(-50%) rotate(180deg);
			}
		}
	}

	&__dropdown {
		position: absolute;
		left: 0;
		top: 100%;
		width: 100%;

		margin-top: 12px;
		padding: 6px 0;
		border: 1px solid $color-primary;
		border-radius: 4px;
		z-index: 10;

		background: $white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		&:after {
			content: '';
			position: absolute;
			width: 6px;
			height: 6px;
			top: -4px;
			left: 35px;
			transform: rotate(45deg);
			border-top: 1px solid $color-primary;
			border-left: 1px solid $color-primary;
			background: $white;
		}

		&-item {
			line-height: 36px;
			height: 34px;
			cursor: pointer;
			position: relative;
			padding-left: 48px;

			&:hover {
				color: $color-primary;
			}
		}
	}

	&__prefix {
		position: absolute;
		top: 0;
		left: 0;
		width: 48px;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;

		color: $color-primary;
	}
}
</style>
