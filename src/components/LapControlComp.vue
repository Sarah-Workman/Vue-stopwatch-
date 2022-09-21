<template>
	<div>
		<DeleteBtn @click="$emit('deleteOne')" />
	</div>
</template>

<script>
	import DeleteBtn from "./DeleteBtn";
	export default {
		name: "LapControlComp",
		components: DeleteBtn,
	};
</script>

<style scoped lang="scss"></style>
