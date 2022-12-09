<template>
	<div class="rectangle-container">
		<div class="rectangle-wrapper">
			<p id="textWrapper">
				{{ outputhours }}:{{ outputminutes }}:{{ outputseconds }}
			</p>
		</div>
		<div class="button-container">
			<StartBtnComp @start="startStopBtnClick" Id="startStopBtn" />
			<div class="stopwatch-fun-btns">
				<LapBtnComp @lap="lapBtn" />
				<EditBtnComp @edit="editSubmitBtnClick" />
				<ResetBtnComp @reset="resetBtn" />
			</div>
		</div>
		<InputErrorComp />
	</div>
</template>
<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import StartBtnComp from "./StartBtnComp.vue";
	import ResetBtnComp from "./ResetBtnComp.vue";
	import LapBtnComp from "./LapBtnComp.vue";
	import EditBtnComp from "./EditBtnComp.vue";
	import InputErrorComp from "./InputErrorComp.vue";
	export default {
		name: "RectangleComp",
		components: {
			StartBtnComp,
			LapBtnComp,
			ResetBtnComp,
			EditBtnComp,
			InputErrorComp,
		},
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

				this.$store.commit("setToastMsg", "Lap Added");
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
				this.$store.commit("setToastMsg", "Stopwatch Time Reset");
				this.$store.commit("toggleToast");
				this.$store.dispatch("toastTimeout", 5000);
			},
			editSubmitBtnClick() {
				debugger;
				if (!this.isEditing) {
					this.editBtn();
				} else {
					this.submitUpdateBulkDeleteBtnClick();
				}
			},
			editBtn() {
				this.$store.commit("toggleIsEditing");
			},
			submitUpdateBulkDeleteBtnClick() {
				debugger;
				if (this.$store.state.selectedIds.length > 0) {
					this.bulkDelete();
				} else if (this.$store.state.isUpdating) {
					this.checkThenUpdateEnter(this.$store.state.lapId);
				} else if (this.$store.state.editing) {
					debugger;
					this.$store.commit("toggleEdit");
					// setTimeout(() =>
					this.$store.commit("toggleIsEditing", 790);
					this.$store.commit("clearErrors");
				}
				{
				}
			},

			bulkDelete() {
				this.$store.dispatch("bulkDelete");
				this.$store.commit(
					"setToastMsg",
					`Deleted ${this.$store.state.selectedIds.length} Lap(s)`
				);
				this.$store.commit("toggleToast");
				this.$store.dispatch("toastTimeout", 5000);
				this.$store.commit("clearSelected");
			},
			checkThenUpdateEnter(id) {
				debugger;
				if (this.$store.state.checked) {
					this.update(id);
				} else {
					this.check(id);
				}
			},
			check(id) {
				debugger;
				if (
					(this.$store.state.lapHour.length !== 2 &&
						this.$store.state.lapMinute.length !== 2 &&
						this.$store.state.lapSecond.length !== 2) ||
					this.$store.state.lapHour === "" ||
					this.$store.state.lapMinute === "" ||
					this.$store.state.lapSecond == ""
				) {
					this.$store.commit("setErrors", {
						error:
							"Hours, Minutes, and Seconds must have two digits, and a value in all boxes is requred for update",
					});
				} else {
					this.$store.commit("toggleChecked");
					this.update(id);
				}
			},

			update(id) {
				debugger;
				this.$store.commit("toggleIsUpdating");
				this.$store.dispatch("updateLap", {
					lapId: id,
				});
				this.$store.commit("toggleChecked");
				this.$store.commit("clearErrors");
				this.inputHours = "";
				this.inputMinutes = "";
				this.inputSeconds = "";

				// this.$store.commit("setToastMsg", "Lap Updated");
				// this.$store.commit("toggleToast");
				// this.$store.dispatch("toastTimeout", 5000);
			},
			deleteOne(id, time) {
				console.log(id);
				this.$store.commit("toggleIsDeleting");
				this.$store.dispatch("deleteOne", { lapId: id });

				this.$store.commit("replaceLaps", { id: id, time: time });
				this.$store.commit("setToastMsg", "Lap Deleted");
				this.$store.commit("toggleToast");
				this.$store.dispatch("toastTimeout", 5000);
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
				"lapHour",
				"lapMinute",
				"lapSecond",
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

	.stopwatch-fun-btns {
		display: flex;
		column-gap: 1em;
		margin-bottom: 1em;
	}
</style>
