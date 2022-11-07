<template>
	<button @click="$emit('reset')" id="ResetBtn">Reset</button>
</template>
<script>
	export default {
		name: "ResetBtn",
		props: {
			text: String,
		},
	};
</script>
<style lang="scss" scoped>
	#ResetBtn {
		background: #f8a075 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #000000;
		border-radius: 4px;
		opacity: 1;
		width: 155px;
		height: 43px;
	}
</style>
