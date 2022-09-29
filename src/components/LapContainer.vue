<template>
	<div class="lap-container">
		<div
			v-for="(lap, index) in laps"
			:key="index"
			class="lap-wrapper"
			ref="lap"
		>
			<input
				v-if="lapId === index"
				:placeholder="lapTime"
				@keyup.self="$emit('submit-edit')"
			/>
			<p v-else>{{ lap }}</p>

			<i @click.self="$emit('delete-one')" class="fa-solid fa-trash"></i>
			<i @click.self="editOne(index)" class="fa-solid fa-pen" ref="edit"></i>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "LapContainer",

		methods: {
			editOne(index) {
				let id = index;
				this.$emit("edit-one", id);
			},
		},

		computed: {
			...mapState(["laps", "lapTime", "editLapTime", "lapId"]),
		},

		emits: ["delete-one", "edit-one", "submit-edit", "v-check"],
	};
</script>

<style scoped lang="scss">
	$fontStyle: Arial, Helvetica, sans-serif;
	@mixin flex {
		justify-content: center;
		align-content: center;
		display: flex;
	}

	.lap-container {
		@include flex();

		margin: auto;

		align-content: flex-start;
		flex-direction: column;
		margin-top: 1em;

		& p {
			color: black;
			text-align: left;
			font-size: 20px;
			font-family: $fontStyle;

			margin: 0em;
		}
	}

	.lap-container::v-deep .lap-wrapper {
		padding: 1em;
		display: grid;

		grid-template-columns: repeat(3, 1fr);
		& p {
			margin-left: 4em;
			margin-right: 4em;
		}
		& input {
			margin-left: 4em;
			margin-right: 4em;
		}
	}
</style>
