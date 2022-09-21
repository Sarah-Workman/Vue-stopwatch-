<template>
	<div class="lap-container">
		<div v-for="(lap, index) in laps" :key="index" class="lap-wrapper">
			<p>
				{{ lap }}
			</p>
			<LapControlComp />
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import LapControlComp from "./LapControlComp";
	export default {
		name: "LapContainer",
		methods: {},

		computed: {
			...mapState(["laps"]),
		},
		components: LapControlComp,
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
			padding-left: 9.75em;

			margin: 0em;
		}
	}

	.lap-container::v-deep .lap-wrapper {
		width: 100%;
		padding: 1em;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		& p {
			padding-left: 4em;
			padding-right: 4em;
		}
	}
</style>
