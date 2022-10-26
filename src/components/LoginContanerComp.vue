<template>
	<div class="loginContainer">
		<div class="boxDesign">
			<p id="logo">StopWatchApp</p>
		</div>
		<div class="loginWrapper">
			<div class="loginForm">
				<input type="email" id="email" v-model="email" placeholder="Email" />
				<div class="passwordWrapper">
					<input
						type="password"
						id="password"
						v-model="password"
						placeholder="Password"
					/>
					<i class="fa-solid fa-eye"></i>
				</div>
				<button type="submit" @click="login">Login</button>
			</div>
			<div class="enrollLink" @click="enroll">First Time User, Enroll Now!</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "loginContainer",
		data() {
			return {
				email: "",
				password: "",
			};
		},
		methods: {
			login() {
				debugger;
				this.$router.push("/Loading");
				this.$store.dispatch("login", {
					email: this.email,
					password: this.password,
				});

				// if (
				// 	this.$store.state.users[0].uuid === this.$store.state.currentUserId &&
				// 	this.$store.state.users[0].isAuthed === true
				// ) {
				// 	this.$router.push("/Homescreen");
				// } else {
				// 	this.$router.push("/");
				// }
			},
			enroll() {
				this.$router.push("/Enroll");
			},
		},
	};
</script>

<style scoped lang="scss">
	.loginContainer .logginWrapper::v-deep .loginForm {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
	.loginContainer {
		display: grid;
		grid-template-columns: repeat(2, 400px);
		& .boxDesign {
			border-color: black;
			background: rgb(215, 215, 215);
		}
	}

	::v-deep .loginWrapper {
		display: flex;
		flex-direction: column;
	}
	::v-deep .loginForm {
		display: flex;
		flex-direction: column;
		padding-bottom: 10em;
	}
	.loginWrapper {
		box-shadow: 0 4px 8px 0 rgb(0 0 0 / 7%), 0 6px 20px 0 rgb(0 0 0 / 7%);
		background: #f5f5f5;
		padding-top: 5em;
		padding-left: 5em;
		padding-right: 5em;
		border: solid thin;
		border-color: #dfdddaeb;
	}
	.enrollLink {
		margin-bottom: 5em;
		color: blue;
	}
	.enrollLink:hover {
		cursor: pointer;
	}
	button {
		margin-top: 3em;
	}
	#email {
		margin-top: 10em;
	}

	.passwordWrapper {
		margin-top: 0.5em;
		& i {
			position: relative;

			padding-top: 0.1em;
		}
	}
	#app {
		display: flex;
		justify-content: flex-start;
	}
	#logo {
		font-family: Helvetica, Neue;
		font-weight: bold;
		font-size: 20px;
		color: #000000;
		letter-spacing: 0;
		display: flex;
		justify-content: center;
	}
</style>
