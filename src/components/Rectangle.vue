<template>
	<div class="rectangle-container">
		<div class="rectangle">
			<p id="textWrapper">
				{{ outputhours }}:{{ outputminutes }}:{{ outputseconds }}
			</p>
		</div>
		<div id="buttonWrapper">
			<start-btn @start="startStopBtnClick" Id="startStopBtn" />
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import StartBtn from "./StartBtn.vue";
	export default {
		name: "Rectangle",
		components: { StartBtn },
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
		color: #000000;
		opacity: 1;
		width: 557px;
		height: 170px;
		font: normal normal bold 143px/174px Helvetica Neue;
		letter-spacing: opx;
		font-weight: bold;
		text-align: left;
	}
	.rectangle-container {
		@include flex();
		flex-direction: column;
	}

	.rectangle p {
		margin: 0;
		padding-top: 0.5em;
	}
	#buttonWrapper {
		display: flex;
		justify-content: center;
		align-content: center;
	}
	#startStopBtn {
		background: #20bf55 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #707070;
		border-radius: 4px;
		opacity: 1;
		width: 209px;
		height: 61px;
	}
</style>
