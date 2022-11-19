<template>
	<Suspense>
		<template #default>
			<StopWatchWrapper />
		</template>

		<template #fallback> Loading...</template>
	</Suspense>
</template>

<script>
	// @ is an alias to /src
	import StopWatchWrapper from "../components/StopwatchWrapper";
	import LoadingComp from "../components/LoadingComp.vue";
	export default {
		name: "Stopwatch",
		components: {
			StopWatchWrapper,
			LoadingComp,
		},
	};
</script>
<style scoped>
	#app {
		margin: auto;
		width: 50%;
	}
</style>
