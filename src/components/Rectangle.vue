<template>
	<div class="rectangle-container">
		<div class="rectangle">
			<p id="textWrapper">
				{{ outputhours }}:{{ outputminutes }}:{{ outputseconds }}
			</p>
		</div>
		<Buttons
			class="buttons"
			@start="startStopBtnClick"
			@reset="resetBtn"
			@lap="lapBtn"
		/>
	</div>
</template>
<script>
	import Buttons from "./Buttons";
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	export default {
		name: "Rectangle",
		components: { Buttons },
		methods: {
			...mapActions([
				"incrementSeconds",
				"addPlaceholderSeconds",
				"startStopwatch",
				"bulkDelete",
				"signOut",
			]),
			...mapMutations([
				"countSeconds",
				"countMinutes",
				"countHours",

				"setOutputSeconds",
				"setOutputMinutes",
				"setOutputHours",
				"clearSeconds",
				"clearMinutes",
				"clearHours",
				"toggleBulkDelete",
				"toggleRunning",
				"clearTimeInterval",
			]),
			startStopBtnClick() {
				debugger;

				if (!this.isRunning) {
					this.startBtn();
				} else {
					this.stopBtn();
				}
				this.toggleRunning();
			},
			startBtn() {
				debugger;
				this.$store.state.interval = setInterval(() => {
					this.countSeconds();
					const outputseconds = this.$store.getters.checkSeconds;
					this.setOutputSeconds(outputseconds);
					if (this.$store.state.seconds >= 60) {
						this.$store.commit("countMinutes");
						this.$store.commit("clearSeconds");
						const outputminutes = this.$store.getters.checkMinutes;
						this.$store.commit("setOutputMinutes", outputminutes);
					} else if (this.$store.state.minutes >= 60) {
						this.$store.commit("countHours");
						this.$store.commit("clearMinutes");
						const outputhours = this.$store.getters.checkHours;
						this.$store.commit("setOutputHours", outputhours);
					}
				}, 1000);
			},
			stopBtn() {
				debugger;
				this.$store.commit("clearTimeInterval");
			},
			resetBtn() {
				console.log("resetBtn connected");
				this.$store.commit("toggleRunning");
				this.$store.commit("clearTimeInterval");
				this.$store.commit("clear");
			},
			lapBtn() {
				if (this.$store.state.isRunning === true) {
					this.$store.dispatch("addData");
				}
			},
		},
		computed: {
			...mapState([
				"seconds",
				"minutes",
				"hours",
				"interval",
				"lapId",
				"toaster",
				"toast",
				"isRunning",
				"interval",
				"outputseconds",
				"outputminutes",
				"outputhours",
			]),

			...mapGetters(["checkSeconds", "checkMinutes", "checkHours"]),
		},
	};
</script>
<style lang="scss" scoped>
	$fontStyle: Arial, Helvetica, sans-serif;
	@mixin flex {
		justify-content: center;
		align-content: center;
		display: flex;
	}
	.rectangle {
		display: flex;
		justify-content: center;
		align-content: flex-end;

		width: fit-content;
		padding: 1em;
	}
	#textWrapper {
		color: black;

		font-size: 115px;
		font-family: Helvetica Neue;
		font-weight: bold;
	}
	.rectangle-container {
		@include flex();
		width: 100%;
		flex-direction: column;
	}

	.rectangle p {
		margin: 0;
		padding-top: 0.5em;
	}
	.buttons {
		display: flex;
		align-content: center;
		justify-content: center;
		column-gap: 0.5em;
	}
</style>
