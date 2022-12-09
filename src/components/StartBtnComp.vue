<template>
	<button
		@click="$emit('start')"
		class="start-btn"
		:class="{ stopBtnStyle: isRunning }"
	>
		{{ getBtnTxt }}
	</button>
</template>
<script>
	import { mapState } from "vuex";
	export default {
		name: "StartBtnComp",
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
	.start-btn {
		background: #20bf55 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #707070;
		border-radius: 4px;
		opacity: 1;
		color: black;
		text-align: center;
		text-decoration: none;
		font-size: 20px;
		font-family: Helvetica Neue;
		width: 209px;
		height: 61px;
		cursor: pointer;
	}

	.stopBtnStyle {
		background: rgb(196, 42, 11);
		box-shadow: 6px 4px 3px #00000029;
		border-radius: 4px;
		opacity: 1;
		border: 1px solid #707070;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		font-size: 20px;
		font-family: Helvetica Neue;
		width: 209px;
		height: 61px;
		cursor: pointer;
	}
</style>
