<template>
	<div class="progress-bar">
		<div :style="{ width }" />
	</div>
</template>

<script>
export default {
	props: {
		progress: {
			type: [ String, Number ],
			required: true,
		},
	},
	computed: {
		width() {
			return `${Math.min(this.progress, 100)}%`
		},
	},
}
</script>

<style lang="scss">
.progress-bar {
	height: .25rem;
	border-radius: .25rem;
	background-color: #EEE;

	> div {
		border-radius: .25rem;
		height: 100%;
		background-color: #2691F4;
		transform-origin: left center;
		animation: 1s translating;
	}

	.error & {
		> div {
			background-color: $red;
		}
	}

	.done & {
		> div {
			background-color: $green-juice;
		}
	}
}

@keyframes translating {
	from {
		transform: scaleX(0);
	}

	to {
		transform: scaleX(1);
	}
}
</style>
