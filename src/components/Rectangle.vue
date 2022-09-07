<template>
	<div class="rectangle-container">
		<div class="rectangle">
			<p id="textWrapper">
				{{ outputhours }}:{{ outputminutes }}:{{ outputseconds }}
			</p>
		</div>
	</div>
</template>
<script>
	import { mapState } from "vuex";
	export default {
		name: "Rectangle",

		computed: {
			...mapState(["outputseconds", "outputminutes", "outputhours"]),
		},
	};
</script>
<style lang="scss" scoped>
	$fontStyle: Arial, Helvetica, sans-serif;
	@mixin flex {
		justify-content: center;
		align-content: center;
		display: flex;
	}
	.rectangle {
		display: flex;
		justify-content: center;
		align-content: flex-end;
		background-color: rgb(92, 91, 91);
		margin-top: 1em;
		height: 2em;
		width: fit-content;
		padding: 1em;
	}
	#textWrapper {
		color: white;

		font-size: larger;
		font-family: $fontStyle;
	}
	.rectangle-container {
		@include flex();
		width: 100%;
	}
	#timerTextWrapper span {
		color: white;
		font-size: 70px;
		font-family: $fontStyle;
	}
	.rectangle p {
		margin: 0;
		padding-top: 0.5em;
	}
</style>
