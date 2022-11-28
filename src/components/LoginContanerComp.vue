<template>
	<div class="login-container">
		<div class="box-design">
			<p class="logo">StopWatchApp</p>
		</div>
		<div class="login-wrapper">
			<div class="login-form">
				<input type="email" id="email" v-model="email" placeholder="Email" />

				<div class="login-password-container">
					<input
						:type="isPasswordVisable ? 'text' : 'password'"
						id="password"
						v-model="password"
						placeholder="Password"
						@keyup.enter="login"
					/>

					<i
						:class="
							isPasswordVisable ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
						"
						@click="visablePassword"
					>
					</i>
				</div>

				<button type="submit" @click="login">Login</button>
				<div v-if="isLoginFailed" class="invalid-login-msg">
					Invalid Email or Password
				</div>
			</div>

			<div class="enrollLink" @click="enroll">First Time User, Enroll Now!</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapState } from "vuex";
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

				this.$store.dispatch("login", {
					email: this.email,
					password: this.password,
				});
			},
			enroll() {
				this.$router.push("/Enroll");
				if (this.$store.state.isLoginFailed) {
					this.$store.commit("toggleIsLoginFailed");
				}
			},
			visablePassword() {
				this.$store.commit("toggleIsPasswordVisable");
			},

			...mapMutations(["toggleIsLoginFailed"]),
		},
		computed: {
			...mapState(["isPasswordVisable", "isLoginFailed"]),
		},
	};
</script>

<style scoped lang="scss">
	.login {
		&-container {
			display: grid;
			grid-template-columns: repeat(2, 400px);
			& .box-design {
				border-color: black;
				background: rgb(215, 215, 215);
				& p {
					font-family: Helvetica, Neue;
					font-weight: bold;
					font-size: 20px;
					color: #000000;
					letter-spacing: 0;
					display: flex;
					justify-content: center;
				}
			}
		}
		&-wrapper {
			display: flex;
			flex-direction: column;
			padding-bottom: 5em;
			box-shadow: 0 4px 8px 0 rgb(0 0 0 / 7%), 0 6px 20px 0 rgb(0 0 0 / 7%);
			background: #f5f5f5;
			padding-top: 5em;
			padding-left: 5em;
			padding-right: 5em;
			border: solid thin;
			border-color: #dfdddaeb;
			align-items: center;
			& .enrollLink {
				margin-bottom: 5em;
				color: blue;
			}
			&.enrollLink:hover {
				cursor: pointer;
			}
		}
		&-form {
			display: flex;
			flex-direction: column;
			padding-bottom: 13em;
			padding-top: 5em;

			& button {
				margin-top: 3em;
				cursor: pointer;
			}
			& .invalid-login-msg {
				color: red;
				font-weight: bold;
				font-size: 20px;
				font-family: Helvetica, Neue;
				border: thick red;
				background: rgba(235, 105, 105, 0.507);
			}
		}
		&-password-container {
			margin-top: 0.5em;
			display: flex;
			& i {
				cursor: pointer;
				display: flex;
				justify-content: flex-start;
			}

			& .fa-solid .fa-eye-slash {
				z-index: 3;
			}
			& .fa-solid .fa-eye {
				position: absolute;
				z-index: 2;
				padding-top: 0.1em;
			}
		}
	}
</style>
