<template>
	<div class="enrollmentContainer">
		<div class="enrollmentForm">
			<input v-model="email" placeholder="Email" id="email" type="email" />
			<input
				v-model="password"
				placeholder="Password"
				id="password"
				type="password"
			/>
			<div class="btnContainer">
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

<style lang="scss">
	.enrollmentForm {
		display: flex;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		grid-column-start: 2;
	}
	.btnContainer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1em;
		margin-top: 5em;
	}
	.enrollmentContainer {
		padding-top: 12em;

		padding-bottom: 12em;

		border: solid thin;
		border-color: rgba(223, 221, 218, 0.9215686275);
		display: flex;
		justify-content: center;
	}
	#email {
		margin-bottom: 0.5em;
	}
</style>
