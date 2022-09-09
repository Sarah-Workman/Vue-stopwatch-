<template>
<p id="timerTextWrapper">
{{ inputHours }}:{{ inputMinutes }}:{{ inputSeconds }}</template>
</p>

<script>
	export default {
		name: "TimerRectangle",

        computed: {
			...mapState(["inputHours", "inputMinutes", "inputSeconds"]),
		},
	};
</script>

<style></style>
