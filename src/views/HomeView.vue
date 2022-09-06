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
		computed: {
			seconds() {
				return store.state.countSeconds;
			},
		},
	};
</script>
<style scoped>
	#app {
		margin: auto;
		width: 50%;
	}
</style>
