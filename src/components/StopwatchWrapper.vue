<template>
	<div id="stopwatchContainer">
		<p>StopWatchApp</p>
		<div id="stopwatchWrapper">
			<Rectangle class="Rectangle" />
			<div class="side-bar">
				<button id="edit" v-show="laps.length > 0">Edit</button>
				<div @click="signOut" class="signOut">Logoff</div>
			</div>
		</div>

		<LapContainer @store-checked-ids="someEvent" ref="lapInfo" />
		<div id="snackBar" text="toaster" v-show="toast === true">{{ text }}</div>
	</div>
</template>

<script>
	import Rectangle from "./Rectangle";
	import LapContainer from "./LapContainer";
	import { mapState } from "vuex";

	export default {
		name: "StopWatchWrapper",
		components: {
			Rectangle,
			LapContainer,
		},
		data() {
			return {
				lapIds: [],
			};
		},
		computed: {
			...mapState(["laps"]),
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
	.side-bar {
		display: flex;
		flex-direction: column;
		grid-column-start: 1;
		row-gap: 1em;
		align-self: center;
		border: thin black;
	}
	#edit {
		align-self: flex-start;
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
