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

		width: fit-content;
		padding: 1em;
	}
	#textWrapper {
		color: black;

		font-size: 115px;
		font-family: Helvetica Neue;
		font-weight: bold;
	}
	.rectangle-container {
		@include flex();
		width: 100%;
	}

	.rectangle p {
		margin: 0;
		padding-top: 0.5em;
	}
</style>
