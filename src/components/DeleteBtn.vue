<template>
	<button @click="$emit('deleteOne')" id="DeleteBtn">
		<img src="../assets/delete.png" />
	</button>
</template>

<script>
	export default {
		name: "DeleteBtn",
	};
</script>

<style></style>
