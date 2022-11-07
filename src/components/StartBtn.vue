<template>
	<button
		@click="$emit('start')"
		id="StartBtn"
		v-bind="{ stopBtnStyle: isRunning === true }"
	>
		{{ getBtnTxt }}
	</button>
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

	#StartBtn {
		background: #20bf55 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #707070;
		border-radius: 4px;
		opacity: 1;
	}

	.stopBtnStyle {
		background-color: rgb(196, 42, 11);
		box-shadow: $shadows;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		font-size: 20px;
		font-family: Helvetica Neue;
		width: 209px;
		height: 61px;
	}
</style>
