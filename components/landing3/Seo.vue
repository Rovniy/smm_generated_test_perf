<template>
	<AccordionItem
		:text="seo.h2"
		class="seo3">
		<div class="row">
			<div
				v-for="(question, i) in seo.questions"
				:key="`question-${i}`"
				class="seo3__column seo3__text">
				<h4 class="seo3__heading">
					{{ question.h3 }}
				</h4>
				<template v-for="(line, i_2) in question.body">
					<!-- eslint-disable vue/no-v-html -->
					<p
						v-if="typeof line === 'string' && line.length"
						:key="`p-${i}-${i_2}`"
						class="seo3__text"
						v-html="line" />
					<!--eslint-enable-->
					<p
						v-else-if="typeof line === 'string'"
						:key="`p-${i}-${i_2}`" />
					<p
						v-else
						:key="`p-${i}-${i_2}`">
						{{ line.text }}
						<nuxt-link
							:key="`nl-${i}-${i_2}`"
							:to="line.to"
							:title="line.title">
							{{ line.link }}
						</nuxt-link>
						{{ line.after || '' }}
					</p>
				</template>
			</div>
		</div>
	</AccordionItem>
</template>

<script>
import AccordionItem from '@/components/Landing3/AccordionItem.vue'

export default {
	name: 'LandingSeo',
	components: {
		AccordionItem,
	},
	props: {
		seo: {
			type: Object,
			default() {
				return {}
			},
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$heading-text: (
	xs: (16px, 19px, 700, 22px),
	md: (18px),
);

// breakpoint-name: (font-size, line-height, font-weight, margin-bottom);
$base-text: (
	xs: (12px, 19px, null, 22px),
	md: (14px, 19px, null, 22px),
	xl: (16px),
);

.seo3 {
	&__heading {
		color: $base-color;
		@include media-text($heading-text);
	}

	& &__text {
		@include media-text($base-text);
	}

	&__column {
		@include media_up(lg) {
			flex: 0 0 50%;
		}
	}
}
</style>
