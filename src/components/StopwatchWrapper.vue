<template>
	<div id="stopwatchContainer">
		<p id="logo">StopWatchApp</p>
		<div id="stopwatchWrapper">
			<Rectangle class="Rectangle" />
			<div class="side-bar">
				<button id="edit" v-show="laps.length > 0" @click="editSubmitBtnClick">
					{{ getBtnTxt }}
				</button>
				<div v-show="isEditing" class="delete-all-container">
					<label for="deleteAll" id="deleteAllLabel">Delete All?</label>
					<input type="checkbox" name="deleteAll" id="deleteAll" />
				</div>

				<div :style="{ paddingTop: 9 + 'em' }">
					<LapBtn ref="lapInfo" @lap="lapBtn" />
					<ResetBtn @reset="resetBtn" />
				</div>
			</div>
		</div>
		<div @click="signOut" class="signOut">Logoff</div>
		<div id="divider">
			<LapContainer />
		</div>

		<div id="snackBar" text="toaster" v-show="toast === true">{{ text }}</div>
	</div>
</template>

<script>
	import Rectangle from "./Rectangle";

	import { mapState } from "vuex";
	import LapBtn from "./LapBtn.vue";
	import LapContainer from "./LapContainer.vue";
	import ResetBtn from "./ResetBtn.vue";

	export default {
		name: "StopWatchWrapper",
		components: {
			Rectangle,
			LapContainer,
			LapBtn,
			ResetBtn,
		},
		data() {
			return {
				lapIds: [],
			};
		},
		computed: {
			...mapState(["laps", "isEditing"]),
			getBtnTxt() {
				return this.isEditing ? "Submit" : "Edit";
			},
		},

		methods: {
			// bulkDeleteBtn() {
			// debugger;

			// this.$store.commit("toggleBulkDelete");

			// if (this.$store.state.bulkDeleteOn === false) {
			// this.$store.dispatch("bulkDelete");

			// this.$store.commit("clearCheckedIds");
			// }
			// },

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
				this.$store.commit("toggleIsEditing");
			},
			editBtn() {
				this.$store.commit("toggleIsEditing");
			},
			submitBtn() {},
			signOut() {
				this.$store.dispatch("logOut");
				//listener is currently not working, but I would want the isAuthed to equal false before pushing to the login screen
				this.$router.push("/");
			},
		},
	};
</script>
<style lang="scss" scoped>
	.side-bar {
		align-self: center;

		justify-items: start;

		grid-column-start: 1;
		display: flex;
		flex-direction: column;
	}
	#logo {
		text-align: left;
		font: normal normal bold 20px/25px Helvetica Neue;
		letter-spacing: 0px;
		color: #000000;
		opacity: 1;
		width: 143px;
		height: 24px;
	}
	#edit {
		background: #008aac7c 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #000000;
		border-radius: 4px;
		opacity: 1;
		width: 155px;
		height: 43px;
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
	#divider {
		background: #ffffff 0% 0% no-repeat padding-box;
		border: 1px solid #707070;
		opacity: 1;
		top: 261px;
		left: -22px;
		width: 1129px;
		height: 433px;
	}
	.signOut {
		color: blue;
		font-weight: bolder;
		cursor: pointer;
		align-self: flex-end;
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
