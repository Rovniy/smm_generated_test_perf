<template>
	<div class="loader">
		<div class="wrap">
			<img
				class="circle"
				alt="circle"
				width="53"
				height="53"
				src="~/assets/symbols/icons/circle.svg">
			<img
				class="logo"
				alt="logo"
				width="24"
				height="26.5"
				src="~/assets/symbols/icons/new-logo-ny-icon.svg">
		</div>
		<p class="text">
			{{ $t('LOADING_MESSAGE') }}
		</p>
	</div>
</template>

<script>
export default {
	data: () => ({
		overflow: '',
	}),
	beforeMount() {
		this.overflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
	},
	beforeDestroy() {
		document.body.style.overflow = this.overflow
	},
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(-360deg);
	}
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(-360deg);
	}
}

.loader {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	background: #FFF;
	-moz-transition-duration: .75s;
	-o-transition-duration: .75s;
	-ms-transition-duration: .75s;
	-webkit-transition-duration: .75s;
	transition-duration: .75s;

	.wrap {
		position: relative;
		line-height: 0;
		width: 4rem;
		height: 4rem;

		.circle,
		.logo {
			position: absolute;
			top: 50%;
			left: 50%;
		}

		.circle {
			margin-top: -26.5px;
			margin-left: -26.5px;
			-webkit-animation: spin 1s ease-in-out infinite;
			animation: spin 1s ease-in-out infinite;
		}

		.logo {
			margin-left: -12px;
			margin-top: -13.25px;
		}

		.text {
			font-family: 'Arial', sans-serif;
			margin-top: 20px;
			margin-bottom: 0;
			color: #888;
			font-size: 16px;
		}
	}
}
</style>
