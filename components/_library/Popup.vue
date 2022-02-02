<template>
	<div
		class="popup__backdrop"
		@keydown.esc="close()"
		@mousedown.self="close()">
		<div class="popup__dialog">
			<button
				class="popup__close"
				type="button"
				@click="close()" />
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			overflow: null,
		}
	},
	beforeMount() {
		this.overflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
	},

	beforeDestroy() {
		document.body.style.overflow = this.overflow
	},
	methods: {
		close() {
			this.$emit('close')
		},
	},
}
</script>

<style lang="scss">
@import "~assets/styles/landing3/_variables.scss";
@import "~assets/styles/landing3/_functions.scss";
@import "~assets/styles/landing3/_mixins.scss";

.popup {
	&__backdrop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		bottom: 0;
		z-index: 1000;
		background: $white;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		@include media-up(md) {
			background: rgba(0, 0, 0, 0.8);
		}
	}

	&__dialog {
		width: 100%;
		padding: 55px 20px 43px;
		background: $white;

		max-height: 100vh; // low screen height fix
		overflow-y: auto;  // low screen height fix

		@include media-up(md) {
			padding: 44px 29px 42px;
			width: 448px;
			position: relative;
			border-radius: 4px;
		}

		//  mobile low screen height close button fix
		@media (max-height: 550px) {
			position: relative;
		}
	}

	&__close {
		width: 18px;
		height: 18px;
		padding: 0;
		position: absolute;
		right: 27px;
		top: 25px;
		transition: $transition-fast;

		&:before,
		&:after {
			content: '';
			@include absolute();
			top: 50%;
			height: 2.65px;
			border-radius: 1px;
			background: $color-gray;

			transform: rotate(45deg);
		}
		&:after {
			transform: rotate(-45deg);
		}

		&:hover {
			&:before,
			&:after {
				background: $primary;
			}
		}
	}
}
</style>
