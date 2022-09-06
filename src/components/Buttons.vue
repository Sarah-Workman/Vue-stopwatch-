<template>
	<div id="stopwatch - button - container">
		<StartBtn @click="$emit('start')" text="START" />
		<StopBtn @click="$emit('stop')" text="STOP" />
		<ResetBtn @click="$emit('reset')" text="RESET" />
		<LapBtn @click="$emit('lap')" text="LAP" />
		<ResetLapBtn @click="$emit('resetLap')" text="LAP RESET" />
	</div>
</template>
<script>
	import StartBtn from "./StartBtn";
	import StopBtn from "./StopBtn";
	import ResetBtn from "./ResetBtn";
	import LapBtn from "./LapBtn";
	import ResetLapBtn from "./ResetLapBtn";

	export default {
		name: "Buttons",
		components: {
			StartBtn,
			StopBtn,
			ResetBtn,
			LapBtn,
			ResetLapBtn,
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
