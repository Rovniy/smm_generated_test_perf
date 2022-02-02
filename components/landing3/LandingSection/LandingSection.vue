<template>
	<article class="landing3-section">
		<div class="container">
			<h2 class="landing3__heading">
				{{ heading }}
			</h2>
			<slot />
		</div>
	</article>
</template>

<script>
export default {
	name: 'LandingSection',
	props: {
		heading: {
			type: String,
			default: null,
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

// breakpoint-name: (padding-top, padding-bottom);
$section-vpadding: (
	xs: (58px 58px),
	md: (74px 74px),
	lg: (84px 84px),
	xl: (110px 110px),
);

.landing3-section {
	@include media-vpadding($section-vpadding);
}
</style>
