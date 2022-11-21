<template>
	<div class="snack-bar-container">
		<Transition name="v">
			<div class="snack-bar" v-if="isToasting">
				{{ toast }}
			</div>
		</Transition>
	</div>
</template>

<script>
	import { mapMutations, mapState } from "vuex";
	export default {
		name: "Toast",
		props: {
			time: String,
		},
		//beforeUpdate() {
		// debugger;
		// this.$store.state.toastTimeout = setTimeout(() => {
		// this.$store.commit("toggleToast");
		// }, 1000);
		// },

		computed: {
			...mapState(["toast", "isToasting", "toastTimeout"]),
		},

		methods: {
			...mapMutations(["toggleToast"]),
		},
	};
</script>

<style scoped lang="scss">
	.snack {
		&-bar-container {
			position: absolute;
		}
		&-bar {
			width: auto;
			height: auto;
			color: #fff;
			background: gray;
			text-align: center;
			border-radius: 2px;
			z-index: 2;
			opacity: 0.75;
			font-size: 30px;
		}
	}
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}
	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
