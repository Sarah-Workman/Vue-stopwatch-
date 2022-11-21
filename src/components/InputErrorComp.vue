<template>
	<div v-for="formError in formErrors" :key="formError.id">
		<p v-show="formErrors.length > 0" class="lap-input-form-errors">
			{{ formError.error }}
		</p>
		<i class="fa-duotone fa-circle-x" @click="$emit('errorClose')"></i>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "inputErrorComp",
		computed: {
			...mapState(["formErrors"]),
		},

		emited: ["errorClose"],
	};
</script>

<style lang="scss" scoped>
	.lap-input-form-errors {
		color: white;
		background: red;
		opacity: 0.75;
		position: absolute;
	}
</style>
