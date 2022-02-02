<template>
	<div class="__nuxt-error-page">
		<div class="error">
			<div class="title">
				<h1>Error {{ error.statusCode }}</h1>
				{{ error.message }}
			</div>
			<p class="description">
				<a
					v-if="typeof $route === 'undefined'"
					class="error-link"
					href="/"
					rel="noopener">{{ $t('error_page_link') }}</a>
				<a
					v-else
					class="error-link"
					href="#"
					rel="noopener"
					@click="$router.go(-1)">Go back</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PageError500',
	props: {
		error: {
			type: Object,
			default: () => {},
		},
	},
	head() {
		return {
			title: this.error.message,
		}
	},
}
</script>

<style lang="scss">
.__nuxt-error-page {
	padding: 1rem;
	background: #F7F8FB;
	color: #47494E;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: sans-serif;
	font-weight: 100 !important;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-webkit-font-smoothing: antialiased;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.__nuxt-error-page .title {
	h1 {
		font-weight: 400;
		font-size: 2rem;
		margin-bottom: .5rem;
	}

	font-size: 1.5rem;
	color: #47494E;
	margin-bottom: 1rem;
}

.__nuxt-error-page .description {
	color: #7F828B;
	line-height: 21px;
}

.__nuxt-error-page a {
	color: #7F828B !important;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
}
</style>
