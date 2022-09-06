<template>
	<div id="stopwatchContainer">
		<Buttons
			@start="startBtn"
			@stop="stopBtn"
			@reset="resetBtn"
			@lap="lapBtn"
			@resetLap="resetLapsBtn"
		/>
		<Rectangle />
	</div>
</template>
<script>
	import Buttons from "./Buttons";
	import Rectangle from "./Rectangle";
	import { nextTick } from "vue";
	import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

	export default {
		name: "StopWatchWrapper",
		components: {
			Buttons,
			Rectangle,
		},

		methods: {
			startBtn() {
				if (this.secondLength < 2) {
					this.startStopwatch;
					this.placeholderSeconds;
					console.log("inside of startBtn");
					console.log(this.outputSeconds);
				}
			},
			stopBtn() {
				console.log("stopBtn connected");
				this.$store.commit("NotRunning");
				this.$store.commit("clearTimeInterval");
				this.$store.commit("clear");
			},
			resetBtn() {
				console.log("resetBtn connected");
			},
			lapBtn() {
				console.log("lapBtn connected");
			},
			resetLapsBtn() {
				console.log("resetLapsBtn connected");
			},
		},
		computed: mapState(["seconds", "minutes", "hours", "outputSeconds"]),
		...mapActions([
			"incrementSeconds",
			"addPlaceholderSeconds",
			"startStopwatch",
		]),
		...mapMutations(["countSeconds"]),
		...mapGetters(["secondLength"]),
	};
</script>
<style lang="scss" scoped>
	Buttons {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1em;
	}
	#stopwatchContainer {
		background-color: #defff2;
		border-radius: 8px;

		width: fit-content;
		padding-bottom: 1em;
		padding-right: 2em;
	}
</style>
