<template>
	<button @click="$emit('stop')" id="StopBtn">{{ text }}</button>
</template>
<script>
	export default {
		name: "StopBtn",
		props: {
			text: String,
		},
	};
</script>
<style lang="scss" scoped>
	$shadows: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	$fontStyle: Arial, Helvetica, sans-serif;
	@mixin stopwatchBtns {
		background-color: #0ff4c6;
		box-shadow: $shadows;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		font-size: 20px;
		font-family: $fontStyle;
	}

	#StopBtn {
		@include stopwatchBtns();
		grid-row-start: 1;
		grid-column-start: 2;
	}
</style>
