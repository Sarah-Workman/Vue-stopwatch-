<template>
	<div id="stopwatch - button - container">
		<StartBtn @click="$emit('start')" text="Start" />
		<StopBtn @click="$emit('stop')" text="Stop" />
		<ResetBtn @click="$emit('reset')" text="Reset" />
		<LapBtn @click="$emit('lap')" text="Lap" />
		<BulkDeleteBtn @click="$emit('bulkDelete')" text="Bulk Delete" />
	</div>
</template>
<script>
	import StartBtn from "./StartBtn";
	import StopBtn from "./StopBtn";
	import ResetBtn from "./ResetBtn";
	import LapBtn from "./LapBtn";
	import BulkDeleteBtn from "./BulkDeleteBtn";

	export default {
		name: "Buttons",
		components: {
			StartBtn,
			StopBtn,
			ResetBtn,
			LapBtn,
			BulkDeleteBtn,
		},
	};
</script>
<style lang="scss" scoped>
	div {
		width: 100%;
		padding: 1em;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2em;
	}
</style>
