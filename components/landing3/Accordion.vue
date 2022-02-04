<template>
	<LandingSection
		:heading="$t('header')"
		class="accordion3">
		<AccordionItem
			v-for="(item, index) in data"
			:key="`accordion-item-${index}`"
			:text="$t(item.head)"
			class="accordion3__item">
			<p
				v-for="(text, index2) in item.textList"
				:key="`text-${index2}`">
				<template v-if="typeof text === 'string'">
					{{ $t(text) }}
				</template>
				<template v-else>
					{{ replaceText(text) }}
				</template>
			</p>
		</AccordionItem>
		<div v-if="isLandingMobile">
			<Seo :seo="seo" />
		</div>
	</LandingSection>
</template>

<script>
import {
	mapGetters,
} from 'vuex'

import AccordionItem from '@/components/landing3/AccordionItem.vue'
import Seo from '@/components/landing3/Seo.vue'
import LandingSection from '@/components/landing3/LandingSection.vue'

export default {
	name: 'LandingAccordion',
	components: {
		AccordionItem,
		Seo,
		LandingSection,
	},
	props: {
		seo: {
			type: Object,
			default() {
				return {}
			},
		},
		data: {
			type: Array,
			default() {
				return []
			},
		},
	},
	computed: {
		...mapGetters({
			isLandingMobile: 'responsive/isLandingMobile',
		}),
	},
	methods: {
		replaceText(item) {
			let t = this.$t(item.text)
			item.replaceList.forEach(replace => {
				t = t.replace(replace.substr, replace.newstr)
			})
			return t
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

// breakpoint-name: (css-property, value);
$item-style: (
	xs: (margin-bottom, 10px),
	md: (margin-bottom, 14px),
);

.accordion3 {
	&__item {
		&:not(:last-child) {
			@include media-style($item-style);
		}
	}
}
</style>
