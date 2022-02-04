import Pagination from '@/components/_library/Pagination.vue'

export default {
	components: {
		Pagination,
	},
	data() {
		return {
			pagesData: {
				total: 0,
				offset: 0,
				limit: 0,
				hook: true,
			},
		}
	},
	computed: {
		pagesTotal() {
			return this.pagesData.total
		},
		pagesLimit() {
			return this.pagesData.limit || this.pagesLimits[0]
		},
		pagesLimitCaped() {
			return Math.min(
				this.pagesData.offset + this.pagesLimit,
				this.pagesTotal,
			)
		},
		pagesLimits() {
			return [ 10, 30, 50, 100 ]
		},
		pagesOffset() {
			return this.pagesData.offset
		},
		pagesLoading() {
			return this.isLoading || false
		},
		pagesLast() {
			return this.pagesData.offset + this.pagesLimit >= this.pagesTotal
		},
		pagesDisplay() {
			return this.pagesTotal && !this.pagesLoading
		},
		pagesQuery() {
			return {
				limit: this.pagesLimit,
				offset: this.pagesOffset,
			}
		},
		pagesAll() {
			return {
				display: this.pagesDisplay,
				limit: this.pagesLimit,
				limitCaped: this.pagesLimitCaped,
				limits: this.pagesLimits,
				offset: this.pagesOffset,
				total: this.pagesTotal,
				last: this.pagesLast,
			}
		},
	},
	created() {
		if (this.pagesData.hook) {
			this.pagination()
		}
	},
	methods: {
		setTotal(val) {
			this.pagesData.total = val
		},
		resetPagination() {
			this.pagesData.offset = 0
			this.pagination()
		},
		prevPage() {
			this.pagesData.offset = this.pagesOffset - this.pagesLimit > 0
				? this.pagesOffset - this.pagesLimit
				: 0
			this.pagination()
		},
		nextPage() {
			this.pagesData.offset += this.pagesLimit
			this.pagination()
		},
		specificPage(page) {
			this.pagesData.offset = (page - 1) * this.pagesLimit
			this.pagination(page)
		},
		setLimit(limit) {
			this.pagesData.limit = limit
			if (this.pagesLimit > this.pagesTotal) {
				this.pagesData.offset = 0
			}
			this.pagination()
		},
		pagination() {},
	},
}
