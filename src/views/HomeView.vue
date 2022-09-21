<template>
	<StopWatchWrapper />
</template>

<script>
	// @ is an alias to /src
	import StopWatchWrapper from "../components/StopwatchWrapper";
	export default {
		name: "Stopwatch",
		components: {
			StopWatchWrapper,
		},
		mounted() {
			this.$store.dispatch("getData");
		},
	};
</script>
<style scoped>
	#app {
		margin: auto;
		width: 50%;
	}
</style>
