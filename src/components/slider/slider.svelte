<script>
	import SliderWrapper from './slider-wrapper.svelte';
	import slides from '../../db/slides.json';
	import SlideComponent from './slide.svelte';
</script>

<SliderWrapper>
	{#each slides as slide}
		<SlideComponent />
	{/each}
</SliderWrapper>
