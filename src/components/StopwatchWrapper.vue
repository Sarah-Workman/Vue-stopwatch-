<template>
	<div id="stopwatchContainer">
		<div id="stopwatchWrapper">
			<Buttons
				@start="startBtn"
				@stop="stopBtn"
				@reset="resetBtn"
				@lap="lapBtn"
				@resetLap="resetLapsBtn"
			/>

			<Rectangle />
		</div>

		<LapContainer />
	</div>
</template>

<script>
	import Buttons from "./Buttons";
	import Rectangle from "./Rectangle";
	import LapContainer from "./LapContainer";
	import { getterTypes } from "../store/index";
	import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

	export default {
		name: "StopWatchWrapper",
		components: {
			Buttons,
			Rectangle,
			LapContainer,
		},

		methods: {
			...mapActions([
				"incrementSeconds",
				"addPlaceholderSeconds",
				"startStopwatch",
			]),
			...mapMutations(["countSeconds"]),
			startBtn() {
				if (this.$store.state.isRunning === false) {
					this.$store.commit("toggleRunning");
					this.$store.state.interval = setInterval(() => {
						this.$store.commit("countSeconds");
						const outputseconds = this.$store.getters.outputSeconds;

						this.$store.commit("setOutputSeconds", outputseconds);
						if (this.$store.state.seconds >= 60) {
							this.$store.commit("countMinutes");
							this.$store.commit("clearSeconds");
							this.$store.getters.outputMinutes;
							const outputminutes = this.$store.commit(
								"setOutputMinutes",
								outputminutes
							);
						} else if (this.$store.state.minutes >= 60) {
							this.$store.commit("countHours");
							this.$store.commit("clearMinutes");
							const outputhours = this.$store.getters.outputHours;
							this.$store.commit("setOutputHours", outputhours);
						}
					}, 1000);
				}
			},
			stopBtn() {
				this.$store.commit("toggleRunning");
				console.log("stopBtn connected");
				this.$store.commit("clearTimeInterval");
			},
			resetBtn() {
				console.log("resetBtn connected");
				this.$store.commit("toggleRunning");
				this.$store.commit("clearTimeInterval");
				this.$store.commit("clear");
				this.$store.commit("clearLaps");
			},
			lapBtn() {
				console.log("lapBtn connected");

				if (this.$store.state.isRunning === true) {
					this.$store.commit("createP");
				}
			},
			resetLapsBtn() {
				console.log("resetLapsBtn connected");
				this.$store.commit("clearLaps");
			},
		},
		computed: {
			...mapState([
				"seconds",
				"minutes",
				"hours",
				"outputSeconds",
				"isClicked",
			]),

			...mapGetters(["outputSeconds", "outputMinutes", "outputHours"]),
		},
	};
</script>
<style lang="scss" scoped>
	Buttons {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1em;
	}
	#stopwatchWrapper {
		background-color: #defff2;
		border-radius: 8px;

		width: fit-content;
		padding-bottom: 1em;
		padding-right: 2em;
	}
	#stopwatchContainer {
		border-radius: 8px;

		width: fit-content;
	}
</style>
