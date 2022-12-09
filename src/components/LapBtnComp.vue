<template>
	<button @click="$emit('lap')" class="lap-btn">Lap</button>
</template>
<script>
	export default {
		name: "LapBtnComp",
	};
</script>
<style lang="scss" scoped>
	.lap-btn {
		background: #a6ac006f 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #000000;
		border-radius: 4px;
		opacity: 1;
		width: 155px;
		height: 43px;
		cursor: pointer;
	}
</style>
