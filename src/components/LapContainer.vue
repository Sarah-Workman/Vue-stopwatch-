<template>
	<div class="lap-container">
		<div v-for="lap in laps" :key="lap.id" class="lap-wrapper" ref="lap">
			<input
				v-if="lap.id === lapId"
				:placeholder="placeHolder"
				@keyup.self="$emit('submit-edit')"
				:class="{ editing: lap.id === lapId }"
			/>
			<p v-else>{{ lap.time }}</p>

			<i @click.self="$emit('delete-one')" class="fa-solid fa-trash"></i>
			<i @click.self="editOne(lap.id)" class="fa-solid fa-pen" ref="edit"></i>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from "vuex";

	export default {
		name: "LapContainer",

		methods: {
			...mapMutations(["setId"]),

			editOne(lapId) {
				let lapToEdit = this.getLapById(lapId);
				this.$store.commit("setId", lapToEdit);
				this.$store.dispatch("getPlaceholder");
			},
		},

		computed: {
			...mapState([
				"laps",
				"lapTime",
				"editLapTime",
				"lapId",
				"placeHolder",
				"fireBaseId",
				"editing",
			]),
			...mapGetters({
				getLapById: "getUniqueLapId",
			}),
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

	.lap-container::v-deep .editing {
		border-bottom-style: groove;
		border-bottom-color: black;
		border-top: none;
		border-left: none;
		border-right: none;
		background-image: none;
		background-color: transparent;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}
</style>
