<template>
	<div class="loader line-scale">
		<div /><div /><div /><div /><div />
	</div>
</template>

<style lang="scss" scoped>
@function delay($interval, $count, $index) {
	@return ($index * $interval) - ($interval * $count);
}

@keyframes line-scale {
	0% {
		transform: scaleY(1);
	}

	50% {
		transform: scaleY(.4);
	}

	100% {
		transform: scaleY(1);
	}
}

@mixin line-scale($n:5) {
	@for $i from 1 through $n {
		> div:nth-child(#{$i}) {
			animation: line-scale 1s delay(.1s, $n, $i) infinite cubic-bezier(.2, .68, .18, 1.08);
		}
	}
}

.line-scale {
	line-height: 0;
	@include line-scale();

	> div {
		background-color: $primary;
		width: 4px;
		height: 35px;
		border-radius: 2px;
		margin: 2px;
		animation-fill-mode: both;
		display: inline-block;
	}
}

.loader-abs {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
</style>
