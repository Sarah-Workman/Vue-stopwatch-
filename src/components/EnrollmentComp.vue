<template>
	<div class="enrollment-container">
		<div class="enrollment-form">
			<input v-model="email" placeholder="Email" class="email" type="email" />
			<input
				v-model="password"
				placeholder="Password"
				id="password"
				type="password"
			/>
			<div class="enrollment-btn-container">
				<button @click="enroll">Submit</button>
				<button @click="backBtn">Back</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "EnrollmentComp",
		data() {
			return { password: "", email: "" };
		},
		methods: {
			backBtn() {
				this.$router.push("/");
			},
			enroll() {
				this.$store.dispatch("enroll", {
					email: this.email,
					password: this.password,
				});
				this.$router.push("/Homescreen");
			},
		},
	};
</script>

<style scoped lang="scss">
	.enrollment {
		&-container {
			padding-top: 12em;
			padding-bottom: 12em;
			border: solid thin;
			border-color: rgba(223, 221, 218, 0.9215686275);
			display: flex;
			justify-content: center;
		}
		&-form {
			display: flex;
			align-content: center;
			justify-content: center;
			flex-direction: column;
			grid-column-start: 2;
			& .email {
				margin-bottom: 0.5em;
			}
		}
		&-btn-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1em;
			margin-top: 5em;
		}
	}
</style>
