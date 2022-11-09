<template>
	<button class="edit-btn" @click="$emit('edit')">
		{{ getBtnTxt }}
	</button>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "EditBtn",
		computed: {
			...mapState(["isEditing"]),
			getBtnTxt() {
				return this.isEditing ? "Submit" : "Edit";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit-btn {
		background: #008aac7c 0% 0% no-repeat padding-box;
		box-shadow: 6px 4px 3px #00000029;
		border: 1px solid #000000;
		border-radius: 4px;
		opacity: 1;
		width: 155px;
		height: 43px;
		cursor: pointer;
	}
</style>
