<template>
	<div id="stopwatchContainer">
		<p>StopWatchApp</p>
		<div id="stopwatchWrapper">
			<Rectangle class="Rectangle" />
			<div class="side-bar">
				<button id="edit" v-show="laps.length > 0" @click="editing">
					Edit
				</button>
				<!-- <div @click="signOut" class="signOut">Logoff</div> -->
				<div>
					<LapBtn ref="lapInfo" @lap="lapBtn" />
					<ResetBtn @reset="resetBtn" />
				</div>
			</div>
		</div>

		<LapContainer />
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
				this.$store.commit("toggleRunning");
				this.$store.commit("clearTimeInterval");
				this.$store.commit("clear");
			},
			editing() {
				this.$store.commit("toggleIsEditing");
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
	.side-bar {
		row-gap: 10em;
		align-self: center;

		justify-items: start;

		grid-column-start: 1;
		display: flex;
		flex-direction: column;
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
	.signOut {
		color: blue;
		font-weight: bolder;
		cursor: pointer;
		align-self: flex-end;
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
