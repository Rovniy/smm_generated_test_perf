<template>
	<div
		class="accordion3-item"
		:class="{ 'is-opened': isOpened }">
		<button
			class="accordion3-item__button"
			:class="{ 'accordion3-item__button--small': isSmall }"
			@click="isOpened = !isOpened">
			{{ text }}
		</button>
		<div
			v-show="isOpened"
			class="accordion3-item__holder">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'LandingAccordionItem',
	props: {
		text: {
			type: String,
			default: null,
		},
		isSmall: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		isOpened: false,
	}),
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

$color-primary:         var(--color-primary, $primary);
$color-opened:          var(--color-secondary, $secondary);
$color-secondary-text:  var(--color-secondary-text, $base-color);

$color-border:          #ECECEC;

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$button-text: (
	xs: (14px, 20px),
	md: (16px),
	lg: (18px),
);

// breakpoint-name: (padding-left padding-right);
$button-hpadding: (
	xs: (25px 45px),
	md: (39px 40px),
);

// breakpoint-name: (padding-top padding-right padding-bottom padding-left);
$holder-padding: (
	xs: (24px 25px 24px 25px),
	md: (28px 39px 28px 39px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$holder-text: (
	xs: (14px, 20px),
	lg: (16px),
	xl: (18px),
);

.accordion3-item {
	$self: &;

	box-shadow: 0 0 70px rgba(0, 0, 0, .1);
	border: 1px solid $color-border;
	border-radius: 10px;
	overflow: hidden;
	background: $white;

	&:hover {
		background: #ECF5FF;
	}

	&.is-opened {
		background: $color-opened;

		#{$self}__button {
			color: $color-secondary-text;
			font-weight: 600;

			&::after {
				border-color: $white;
				transform: rotate(315deg);
			}
		}
	}
}

.accordion3-item__button {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	margin: 0;
	background: transparent;
	font-family: $ff-gilroy;
	text-align: left;
	padding-top: 15px;
	padding-bottom: 15px;
	min-height: 51px;

	@include media-text($button-text);
	@include media-hpadding($button-hpadding);

	&::after {
		transition: $transition-rotate;
		transform-origin: 60% 45%;
		content: '';
		display: inline-block;
		height: 7px;
		width: 7px;
		border-color: $color-primary;
		border-style: solid;
		border-width: 2px 2px 0 0;
		border-radius: 1px;
		transform: rotate(135deg);
		position: absolute;
		right: 21px;
		@include media-up(lg) {
			right: 30px;
		}
	}

	@include media-up(md) {
		margin-right: 2px;
	}

	&--small {
		padding-top: 12px;
		padding-bottom: 12px;
		min-height: 43px;
		@include media-breakpoint-up(md) {
			font-size: calc_rem(18px);
		}
	}
}

.accordion3-item__holder {
	color: #8499A4;
	border-top: 1px solid $color-border;
	background: $white;

	@include media-padding($holder-padding);
	@include media-text($holder-text);

	p {
		margin-bottom: 10px;
	}

	a {
		text-decoration: underline;

		&:hover {
			text-decoration: none;
		}
	}
}
</style>
