<template>
	<div class="rectangle-container">
		<div class="rectangle-wrapper">
			<p id="textWrapper">
				{{ outputhours }}:{{ outputminutes }}:{{ outputseconds }}
			</p>
		</div>
		<div class="button-container">
			<start-btn @start="startStopBtnClick" Id="startStopBtn" />
			<div class="stopwatch-fun-btns">
				<LapBtn @lap="lapBtn" />
				<EditBtn @edit="editSubmitBtnClick" />
				<ResetBtn @reset="resetBtn" />
			</div>
		</div>
		<inputErrorComp />
	</div>
</template>
<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import StartBtn from "./StartBtn.vue";
	import ResetBtn from "./ResetBtn.vue";
	import LapBtn from "./LapBtn.vue";
	import EditBtn from "./EditBtnComp.vue";
	import inputErrorComp from "./InputErrorComp.vue";
	export default {
		name: "Rectangle",
		components: { StartBtn, LapBtn, ResetBtn, EditBtn, inputErrorComp },
		methods: {
			...mapActions([
				"incrementSeconds",
				"addPlaceholderSeconds",
				"startStopwatch",
				"bulkDelete",
				"signOut",
				"toastTimeout",
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
				"setToastMsg",
				"clearErrors",
				"toggleEditing",
			]),
			startStopBtnClick() {
				if (!this.isRunning) {
					this.startBtn();
				} else {
					this.stopBtn();
				}
				this.toggleRunning();
			},
			startBtn() {
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

				this.$store.commit("setToastMsg", "Lap added");
				this.$store.commit("toggleToast");
				this.$store.dispatch("toastTimeout", 5000);
			},
			resetBtn() {
				console.log("resetBtn connected");
				if (this.$store.state.isRunning) {
					this.$store.commit("toggleRunning");
				}
				this.$store.commit("clearTimeInterval");
				this.$store.commit("clear");
				this.$store.commit("setToastMsg", "You reset stopwatch time");
				this.$store.commit("toggleToast");
				this.$store.dispatch("toastTimeout", 5000);
			},
			editSubmitBtnClick() {
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
				if (this.$store.state.selectedIds.length > 0) {
					debugger;
					this.$store.dispatch("bulkDelete");
					this.$store.commit("clearSelected");
				} else {
				}
				if (this.$store.state.editing) {
					this.$store.commit("toggleEdit");
				}
				this.$store.commit("toggleIsEditing");
				this.$store.commit("clearErrors");
			},
			stopBtn() {
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
				"isEditing",
				"toastTimeout",
				"editing",
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
	.rectangle-wrapper {
		display: flex;
		justify-content: center;
		align-content: center;

		width: fit-content;
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

	.rectangle-wrapper p {
		margin: 0;
	}
	.button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		row-gap: 0.5em;
	}
	// .delete {
	// &-all-label {
	// text-align: left;
	// font: normal normal normal 20px/24px Roboto;
	// letter-spacing: 0.19px;
	// color: #000000;
	// opacity: 1;
	// width: 93px;
	// height: 26px;
	// }
	// &-all {
	// width: 35px;
	// height: 35px;
	// border: 1px solid #000000;
	// opacity: 1;
	// }
	// }
	.stopwatch-fun-btns {
		display: flex;
		column-gap: 1em;
		margin-bottom: 1em;
	}
</style>
