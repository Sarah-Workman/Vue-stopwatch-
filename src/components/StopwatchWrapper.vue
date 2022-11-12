<template>
	<div class="stopwatch-container">
		<p id="logo">StopWatchApp</p>

		<div @click="signOut" class="signOut">Logoff</div>

		<div class="stopwatch-wrapper">
			<Rectangle class="Rectangle" />
		</div>

		<div id="divider">
			<LapContainer />
		</div>

		<div id="snackBar" text="toaster" v-show="toast === true">{{ text }}</div>
	</div>
</template>

<script>
	import Rectangle from "./Rectangle";

	import { mapState } from "vuex";

	import LapContainer from "./LapContainer.vue";

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

		methods: {
			// bulkDeleteBtn() {
			// debugger;

			// this.$store.commit("toggleBulkDelete");

			// if (this.$store.state.bulkDeleteOn === false) {
			// this.$store.dispatch("bulkDelete");

			// this.$store.commit("clearCheckedIds");
			// }
			// },

			signOut() {
				this.$store.dispatch("logOut");
				//listener is currently not working, but I would want the isAuthed to equal false before pushing to the login screen
				this.$router.push("/");
			},
		},
	};
</script>
<style lang="scss" scoped>
	#logo {
		text-align: left;
		font: normal normal bold 20px/25px Helvetica Neue;
		letter-spacing: 0px;
		color: #000000;
		opacity: 1;
		width: 143px;
		height: 24px;
	}

	.stopwatch-wrapper {
		border-radius: 8px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.stopwatch-container {
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
