<template>
	<div
		v-if="pages.display"
		class="pagination">
		<div class="pagination__txt">
			{{ $t('PAGINATION') }}
		</div>
    &nbsp;
		<el-select
			v-model="limit"
			class="pagination-select"
			size="small"
			@change="$emit('set-limit', $event)">
			<el-option
				v-for="value in pages.limits"
				:key="value"
				:label="value"
				:value="value" />
		</el-select>
    &nbsp;
		<div class="pagination__txt">
			{{ pages.offset + 1 }}-{{ pages.limitCaped }}
			/
			{{ pages.total }}
		</div>
		<div class="pagination__arrows">
			<button
				class="pagination__link"
				:disabled="pages.offset === 0"
				@click="$emit('prev-page')">
				<chevron-left class="pagination__link--icon" />
			</button>
			<div class="pagination__arrows-text" />
			<button
				class="pagination__link"
				:disabled="pages.last"
				@click="$emit('next-page')">
				<chevron-right class="pagination__link--icon" />
			</button>
		</div>
	</div>
</template>

<script>
import ChevronLeft from '~/assets/symbols/chevron-left.svg?inline'
import ChevronRight from '~/assets/symbols/chevron-right.svg?inline'

export default {
	components: {
		ChevronRight,
		ChevronLeft,
	},
	props: {
		pages: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			limit: this.pages.limit,
		}
	},
	watch: {
		pages(value) {
			this.limit = value.limit
		},
	},
}
</script>

<style lang="scss">
.pagination__link--icon {
	width: 16px;
	height: 16px;
}

.pagination {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 36px;
	color: #829FBA;
	position: relative;

	&__txt {
		font-family: 'Segoe UI', sans-serif;
		font-size: 12px;
		line-height: 1;
		display: flex;
		flex-wrap: wrap;
		@include r(480px) {
			text-align: center;
			width: 100%;
		}
	}

	&__select {
		margin: 0 10px;
		position: relative;
	}

	&__button {
		width: auto;
		border: .0625rem solid #829FBA;
		border-radius: .25rem;
		min-width: 4rem;
	}

	&__dropdown,
	&__dropdown.i-dropdown--no-response {
		top: auto;
		bottom: 100%;
		margin-bottom: .0625rem;
		left: auto;
		right: 0;
		width: 100%;
		min-width: auto;
	}

	&__arrows {
		display: flex;
		align-items: center;
		margin-left: 20px;
		@include r(480px) {
			margin-left: 0;
		}
	}

	&__arrows-text {
		font-size: .75rem;
		width: .75rem;
		text-align: center;
	}

	&__link {
		color: #829FBA;
		font-size: 16px;
		padding-bottom: 0; // icon font hack
		margin-bottom: -1px; // icon font hack

		&:disabled {
			color: lighten(#829FBA, 20%);
			cursor: not-allowed;
		}
	}

	&__mobile {
		justify-content: space-between;
		margin-top: 15px;
		padding: 0 15px 0 44px;
		@media (max-width: 360px) {
			padding: 0 11px;
		}
	}

	.is-mobile & {
		justify-content: center;
	}
}

.pagination-select {
	width: 80px;
	@include r(480px) {
		width: 100%;
	}

	.el-input--small .el-input__inner {
		font-size: 16px;
	}

	.el-input__inner {
		background-color: transparent;
	}
}

.pagination-select-dropdown {
	font-family: 'Segoe UI', sans-serif;
	font-size: 12px;
}
</style>
