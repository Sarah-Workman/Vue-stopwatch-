<template>
	<div class="snack-bar-container">
		<div class="snack-bar" v-if="isToasting">
			{{ toast }}
		</div>
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
			display: flex;
			justify-content: center;
			align-content: center;
		}
		&-bar {
			display: flex;
			width: auto;
			height: auto;
			align-content: center;
			justify-content: center;
			color: #fff;
			background: gray;
			text-align: center;
			border-radius: 2px;
			z-index: 1;
			font-size: 30px;
			position: absolute;
		}
	}
</style>
