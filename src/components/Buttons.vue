<template>
	<div id="stopwatch - button - container">
		<StartBtn @start="$emit('start')" />

		<ResetBtn @click="$emit('reset')" text="Reset" />
		<LapBtn @click="$emit('lap')" text="Lap" />
	</div>
</template>
<script>
	import StartBtn from "./StartBtn";
	import StopBtn from "./StopBtn";
	import ResetBtn from "./ResetBtn";
	import LapBtn from "./LapBtn";
	import BulkDeleteBtn from "./BulkDeleteBtn";
	import { mapState } from "vuex";

	export default {
		name: "Buttons",
		components: {
			StartBtn,
			StopBtn,
			ResetBtn,
			LapBtn,
			BulkDeleteBtn,
		},

		computed: {
			...mapState(["isRunning"]),
		},
	};
</script>
<style lang="scss" scoped></style>
