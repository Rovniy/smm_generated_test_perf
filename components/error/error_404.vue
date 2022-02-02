<template>
	<div class="page404">
		<a
			class="page404__logo"
			href="/"
			rel="noopener" />
		<div class="page404__horizont" />
		<div class="page404__globe" />
		<div class="page404__ground" />
		<div class="page404__forest" />
		<div class="page404__girl" />
		<div class="page404__title" />
		<div class="page404__clouds">
			<div class="page404__cloud-animation1">
				<div class="page404__cloud1" />
			</div>
			<div class="page404__cloud-animation2">
				<div class="page404__cloud2" />
			</div>
			<div class="page404__cloud-animation3">
				<div class="page404__cloud1" />
			</div>
			<div class="page404__cloud-animation4">
				<div class="page404__cloud2" />
			</div>
			<div class="page404__cloud-animation5">
				<div class="page404__cloud1" />
			</div>
		</div>
		<div class="page404__text">
			<h1 class="page404__h1">
				{{ $t('error_page_heading') }}
			</h1>
			<p class="page404__p">
				{{ $t('error_page_text') }}
			</p>
			<a
				class="page404__button"
				href="/"
				rel="noopener">
				{{ $t('error_page_link') }}
			</a>
		</div>
	</div>
</template>

<script>
import calculateHeight from '~/mixins/calculateHeight.js'

export default {
	name: 'PageError404',
	mixins: [
		calculateHeight,
	],
	props: {
		error: {
			type: Object,
			default: () => {},
		},
	},
	head() {
		return {
			title: this.$t('error_page_heading'),
		}
	},
}
</script>

<style lang="scss" scoped>

@font-face {
	font-family: 'Segoe UI';
	src: url('/fnt/SegoeUI.eot');
	src:
		url('/fnt/SegoeUI.eot?#iefix') format('embedded-opentype'),
		url('/fnt/SegoeUI.woff') format('woff'),
		url('/fnt/SegoeUI.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
	font-display: optional;
}

.page404 {
	margin: 0;
	height: 100vh; /* Fallback for browsers that do not support Custom Properties */
	height: calc(var(--vh, 1vh) * 100);
	transition: all .5s ease;
	overflow: hidden;
	position: relative;
	font-family: $ff-segoe;
	background: linear-gradient(0deg, #DEEEFD 25.59%, #D5E5FC 96.09%);

	&__horizont {
		position: absolute;
		left: 0;
		right: 0;
		top: 40%;
		bottom: 0;
		background: url(~assets/svg/404/horizont.svg) top center no-repeat;
		background-size: cover;
	}

	&__globe {
		position: absolute;
		left: 0;
		right: 0;
		top: 70%;
		bottom: 0;
		background: url(~assets/svg/404/globe.svg) top center no-repeat;
		background-size: cover;
		z-index: 6;
	}

	&__forest {
		position: absolute;
		left: 0;
		right: 0;
		top: 65%;
		bottom: 0;
		background: url(~assets/svg/404/forest.svg) center no-repeat;
		background-size: contain;
		z-index: 8;
	}

	&__ground {
		position: absolute;
		left: 0;
		right: 0;
		top: 91%;
		bottom: 0;
		background: url(~assets/svg/404/ground.svg) top center no-repeat;
		background-size: cover;
		z-index: 10;
	}

	&__girl {
		position: absolute;
		left: 40%;
		right: 30%;
		top: 55%;
		bottom: 0;
		background: url(~assets/svg/404/girl.svg) center no-repeat;
		background-size: contain;
		z-index: 12;
	}

	&__logo {
		position: absolute;
		width: 120px;
		height: 40px;
		left: 5%;
		top: 5%;
		background: url(~assets/symbols/icons/new-logo-ny-blue.svg) center no-repeat;
		background-size: contain;
		z-index: 12;
		cursor: pointer;
	}

	&__title {
		position: absolute;
		width: 46%;
		height: 23%;
		right: 12%;
		top: 5%;
		background: url(~assets/svg/404/title.svg) center no-repeat;
		background-size: contain;
		z-index: 12;
	}

	&__text {
		font-family: $ff-segoe;
		position: absolute;
		width: 90%;
		height: 53px;
		left: 5%;
		top: 27%;
		color: #363333;
		z-index: 12;
	}

	&__h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	&__p {
		margin-bottom: 1.5rem;
		line-height: 1.5rem;
	}

	&__button {
		display: inline-block;
		padding: .75rem 1.5rem calc(.75rem + 2px);
		background: $primary;
		background: #2691F4;
		color: $white;
		border-radius: 50px;
		transition: $transition-fast;
		box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);

		&:hover {
			color: $white;
			text-decoration: underline;
		}
	}

	&__clouds {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		z-index: 8;
		overflow: hidden;
		padding-top: 10%;
	}

	&__cloud1 {
		height: 49px;
		width: 182px;
		background: url(~assets/svg/404/cloud1.svg) center no-repeat;
		background-size: contain;
	}

	&__cloud2 {
		width: 107px;
		height: 23px;
		background: url(~assets/svg/404/cloud2.svg) center no-repeat;
		background-size: contain;
	}

	&__cloud-animation1 {
		animation: animateCloud 20s linear infinite;
		transform: scale(.3);
	}

	&__cloud-animation2 {
		animation: animateCloud 40s linear infinite;
		transform: scale(1);
	}

	&__cloud-animation3 {
		animation: animateCloud 30s linear infinite;
		transform: scale(.7);
	}

	&__cloud-animation4 {
		animation: animateCloud 18s linear infinite;
		transform: scale(1.5);
	}

	&__cloud-animation5 {
		animation: animateCloud 25s linear infinite;
		transform: scale(1.5);
	}

	@-webkit-keyframes animateCloud {
		0% {
			margin-left: -300px;
		}

		100% {
			margin-left: 100%;
		}
	}

	@media (min-width: 768px) {
		&__logo {
			width: 165px;
			height: 52px;
			left: 10%;
			top: 5%;
		}

		&__title {
			width: 32%;
			height: 30%;
			left: 10%;
			top: 17%;
		}

		&__text {
			width: 40%;
			left: auto;
			right: 10%;
			top: 20%;
		}

		&__horizont {
			top: 34%;
		}

		&__globe {
			top: 70%;
			background-size: cover;
		}

		&__forest {
			left: -2.15%;
			right: -2.15%;
			top: 45%;
			bottom: 10%;
		}

		&__ground {
			top: 86%;
		}

		&__girl {
			left: 48.44%;
			right: 35%;
			top: 45.33%;
			bottom: 9.09%;
			background-size: contain;
		}
	}
}
</style>
