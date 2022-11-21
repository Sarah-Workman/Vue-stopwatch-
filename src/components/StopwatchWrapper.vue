<template>
	<div class="stopwatch-container">
		<div class="stopwatch-logo-container">
			<p id="logo">StopWatchApp</p>
			<div @click="signOut" class="signOut">Logoff</div>
		</div>

		<div class="stopwatch-wrapper">
			<Rectangle class="Rectangle" />
		</div>
		<div class="toast-container">
			<Toast />
		</div>
		<div id="divider" :class="{ lapScroll: laps.length > 8 }">
			<Suspense>
				<LapContainer />
				<template #fallback> Loading... </template>
			</Suspense>
		</div>
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
		computed: {
			...mapState(["laps"]),
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
		margin: 0em 2em 2em 2em;
		padding: 0em 2em 2em 2em;
		height: 190px;
		width: 1100px;
	}
	.lapScroll {
		overflow-y: scroll;
	}
	.toast-container {
		display: flex;
		justify-content: center;
	}
	.stopwatch-logo-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		& .signOut {
			color: blue;
			font-weight: bolder;
			cursor: pointer;
			justify-content: center;
			margin-top: 1.5em;
		}
	}
</style>
