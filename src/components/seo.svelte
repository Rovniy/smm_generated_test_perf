<div class="seo">
	<SeoCard/>
	<SeoCard/>
	<SeoCard/>
	<SeoCard/>
	<SeoCard/>
	<SeoCard/>
</div>

<script>
	import SeoCard from '../components/items/seo-card.svelte'

	const cardQuantity = [{id: 1}, {id: 2}, {id: 3}]
</script>

<style lang="sass">
	.seo
		width: 1000px
		display: flex
		flex-wrap: wrap
</style>
