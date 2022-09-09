<template>
	<div id="lapContainer" class="lap-container"></div>
</template>

<script>
	export default {
		name: "LapContainer",
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
		width: 50%;
		align-content: flex-start;
		flex-direction: column;
		margin-top: 2em;

		padding-left: 2em;
	}

	#lapContainer p {
		background-color: rgb(132, 130, 130);
		color: white;
		text-align: center;
		font-size: 20px;
		font-family: $fontStyle;
		padding-left: 13em;
		padding-right: 13em;
		margin: 0em;
	}
</style>
