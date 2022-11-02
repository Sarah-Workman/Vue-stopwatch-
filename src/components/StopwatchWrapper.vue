<template>
	<div id="stopwatchContainer">
		<p>StopWatchApp</p>
		<div id="stopwatchWrapper">
			<Rectangle class="Rectangle" />
			<Buttons
				class="Buttons"
				@start="startStopBtnClick"
				@reset="resetBtn"
				@lap="lapBtn"
			/>
		</div>
		<div @click="signOut" class="signOut">Logoff</div>
		<LapContainer @store-checked-ids="someEvent" ref="lapInfo" />
		<div id="snackBar" text="toaster" v-show="toast === true">{{ text }}</div>
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
		data() {
			return {
				lapIds: [],
			};
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
			]),

			...mapGetters(["checkSeconds", "checkMinutes", "checkHours"]),
		},
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
			// bulkDeleteBtn() {
			// debugger;

			// this.$store.commit("toggleBulkDelete");

			// if (this.$store.state.bulkDeleteOn === false) {
			// this.$store.dispatch("bulkDelete");

			// this.$store.commit("clearCheckedIds");
			// }
			// },
			someEvent(lapId) {
				this.$store.commit("bulkDeleteIds", lapId);
			},
			signOut() {
				this.$store.dispatch("logOut");
				//listener is currently not working, but I would want the isAuthed to equal false before pushing to the login screen
				this.$router.push("/");
			},
		},
	};
</script>
<style lang="scss" scoped>
	.Buttons {
		display: flex;
		flex-direction: column;
		grid-column-start: 1;
		row-gap: 1em;
		align-self: center;
	}

	::v-deep#stopwatchWrapper {
		border-radius: 8px;

		width: fit-content;
		padding-bottom: 1em;
		padding-right: 2em;
		display: grid;
		grid-template-columns: 1fr, 2fr;
		grid-auto-flow: column;
	}
	#stopwatchContainer {
		border-radius: 8px;

		width: fit-content;
	}
	p {
		font: normal normal bold 20px/25px Helvetica Neue;
	}
	.signOut {
		color: blue;
		font-weight: bolder;
		cursor: pointer;
	}
	#toaster {
		min-width: 250px;
		display: flex;
		align-content: center;
		color: #fff;
		background: gray;
		text-align: center;
		border-radius: 2px;
		z-index: 1;
		font-size: 17px;
		position: fixed;
	}
</style>
