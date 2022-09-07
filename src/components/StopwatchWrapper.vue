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
	import { getterTypes } from "../store/index";
	import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

	export default {
		name: "StopWatchWrapper",
		components: {
			Buttons,
			Rectangle,
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
						const outputSeconds =
							this.seconds < 10 ? "0" + this.seconds : this.seconds;

						this.$store.commit("setOutputSeconds", outputSeconds);
						if (this.$store.state.seconds >= 60) {
							this.$store.commit("countMinutes");
							this.$store.commit("clearSeconds");

							const outputminutes =
								this.minutes < 10 ? "0" + this.minutes : this.minutes;
							this.$store.commit("setOutputMinutes", outputminutes);
						} else if (this.$store.state.minutes >= 60) {
							this.$store.commit("countHours");
							this.$store.commit("clearMinutes");
							const outputhours =
								this.hours < 10 ? "0" + this.hours : this.hours;
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
			},
			lapBtn() {
				console.log("lapBtn connected");
			},
			resetLapsBtn() {
				console.log("resetLapsBtn connected");
			},
		},
		computed: {
			...mapState(["seconds", "minutes", "hours", "outputSeconds"]),

			...mapGetters({
				//secondLength: getterTypes.SECOND_LENGTH
			}),
		},
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
