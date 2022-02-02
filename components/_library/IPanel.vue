<template>
	<div
		class="i-panel"
		:class="{
			'i-panel--sm': sm,
		}">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		sm: Boolean,
	},
}
</script>

<style lang="scss" scoped>
$c-panel-shadow: lighten(desaturate(adjust-hue($primary, 14), 44.78), 23.73);

.i-panel {
	$self: &;

	background-color: $white;
	box-shadow: 0 .25rem 1rem rgba($c-panel-shadow, .25);
	border-radius: .25rem;
	margin-bottom: 1rem;
	position: relative;
	padding: 12px 27px;
	min-height: 42px;

	@media (min-width: 1024px) and (max-width: 1040px) {
		margin-bottom: 0;
	}

	&--sm {
		padding-top: $panel-padding-y-sm;
		padding-bottom: $panel-padding-y-sm;
		margin-bottom: $panel-padding-y-sm;
	}

	.is-phone & {
		padding: 12px 20px;
		margin-bottom: 1.5rem;
	}
  &.no_padding {
    padding: 0;
  }
}
</style>
