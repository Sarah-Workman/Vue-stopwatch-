<template>
	<div class="lap-container">
		<p v-for="(lap, index) in laps" :key="index">
			{{ lap }}
		</p>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "LapContainer",
		methods: {},

		computed: {
			...mapState(["laps"]),
		},
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
			background-color: rgb(132, 130, 130);
			color: white;
			text-align: left;
			font-size: 20px;
			font-family: $fontStyle;
			padding-left: 10em;

			margin: 0em;
		}
	}
</style>
