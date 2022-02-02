<template>
	<div class="tabs">
		<button
			v-for="{ id, label } in tabs"
			:key="id"
			class="tab"
			:class="{ active: id === value }"
			@click="$emit('change', id)">
			{{ label }}
		</button>
	</div>
</template>

<script>
export default {
	props: {
		tabs: {
			type: Array,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.tabs {
	border-bottom: 1px solid #DCE6F6;
	display: inline-flex;
	margin-bottom: 20px;
	@media (max-width: 1440px) {
		margin-bottom: 20px;
	}
	@media (max-width: 1280px) {
		margin-bottom: 10px;
	}
	@media (max-width: 767px) {
		margin-bottom: 10px;
		padding: 0;
	}
	@media (max-width: 550px) {
		text-align: center;
		width: 100%;
		margin-bottom: 15px;
	}

	.tab {
		-webkit-appearance: none;
		font-family: inherit;
		font-size: 14px;
		font-weight: 600;
		color: #829FBA;
		text-transform: uppercase;
		padding: 0 0 15px;
		display: inline-block;
		margin-bottom: -1px;
		position: relative;
		line-height: 1.2;
		transition: all .2s ease;
		@media (max-width: 767px) {
			padding-bottom: 9px;
			font-size: 13px;
		}
		@media (max-width: 550px) {
			font-size: 12px;
			font-weight: normal;
			padding-bottom: 13px;
			flex: auto;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			border-radius: 50px 50px 0 0;
			width: 100%;
			height: 3px;
			background-color: #2991F2;
			opacity: 0;
			transition: all .2s ease;
			@media (max-width: 550px) {
				height: 2px;
			}
		}

		&.active {
			color: #19233C;
			@media (max-width: 550px) {
				font-weight: 600;
			}

			&::after {
				opacity: 1;
				color: #19233C;
				@media (max-width: 550px) {
					color: #1786EC;
				}
			}
		}

		& + .tab {
			margin-left: 28px;
			@media (max-width: 1024px) {
				margin-left: 17px;
			}
			@media (max-width: 767px) {
				margin-left: 35px;
			}
			@media (max-width: 550px) {
				margin-left: 5px;
			}
		}
	}
}
</style>
