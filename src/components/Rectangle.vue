<template>
	<div class="rectangle-container">
		<div class="rectangle">
			<p id="textWrapper">
				{{ outputhours }}:{{ outputminutes }}:{{ outputseconds }}
			</p>
		</div>
		<div class="button-container">
			<start-btn @start="startStopBtnClick" Id="startStopBtn" />
			<div class="stopwatchFunBtns">
				<LapBtn @lap="lapBtn" />
				<EditBtn @edit="editSubmitBtnClick" />
				<ResetBtn @reset="resetBtn" />
			</div>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import StartBtn from "./StartBtn.vue";
	import ResetBtn from "./ResetBtn.vue";
	import LapBtn from "./LapBtn.vue";
	import EditBtn from "./EditBtnComp.vue";
	export default {
		name: "Rectangle",
		components: { StartBtn, LapBtn, ResetBtn, EditBtn },
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
			lapBtn() {
				if (this.$store.state.isRunning === true) {
					this.$store.dispatch("addData");
				}
			},
			resetBtn() {
				console.log("resetBtn connected");
				if (this.$store.state.isRunning) {
					this.$store.commit("toggleRunning");
				}
				this.$store.commit("clearTimeInterval");
				this.$store.commit("clear");
			},
			editSubmitBtnClick() {
				debugger;

				if (!this.isEditing) {
					this.editBtn();
				} else {
					this.submitBtn();
				}
			},
			editBtn() {
				this.$store.commit("toggleIsEditing");
			},
			submitBtn() {
				this.$store.commit("toggleIsEditing");
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
				"laps",
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
		align-content: center;

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
	.button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		row-gap: 0.5em;
	}
	#deleteAllLabel {
		text-align: left;
		font: normal normal normal 20px/24px Roboto;
		letter-spacing: 0.19px;
		color: #000000;
		opacity: 1;
		width: 93px;
		height: 26px;
	}
	#deleteAll {
		width: 35px;
		height: 35px;
		border: 1px solid #000000;
		opacity: 1;
	}
	.stopwatchFunBtns {
		display: flex;
		column-gap: 1em;
	}
</style>
