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
		<Toast />
	</div>
</template>

<script>
	import Rectangle from "./Rectangle";

	import { mapState } from "vuex";

	import LapContainer from "./LapContainer.vue";
	import Toast from "./ToastComp.vue";

	export default {
		name: "StopWatchWrapper",
		components: {
			Rectangle,
			LapContainer,
			Toast,
		},
		data() {
			return {
				lapIds: [],
			};
		},

		activated() {
			console.log("isActivated");
		},
		methods: {
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
</style>
