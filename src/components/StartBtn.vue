<template>
	<button @click="$emit('start')" id="StartBtn">{{ getBtnTxt }}</button>
</template>
<script>
	import { mapState } from "vuex";
	export default {
		name: "StartBtn",
		props: {},
		computed: {
			...mapState(["isRunning"]),
			getBtnTxt() {
				return this.isRunning ? "Stop" : "Start";
			},
		},
	};
</script>
<style lang="scss" scoped>
	$shadows: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	@mixin stopwatchBtns {
		background-color: rgb(11, 196, 11);
		box-shadow: $shadows;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		font-size: 20px;
		font-family: Helvetica Neue;
	}

	#StartBtn {
		@include stopwatchBtns();
	}
</style>
