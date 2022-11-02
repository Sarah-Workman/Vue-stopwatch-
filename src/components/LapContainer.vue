<template>
	<div class="lap-container">
		<div v-for="lap in laps" :key="lap.id" class="lap-wrapper">
			<input
				v-if="lap.id === lapId && editing === false"
				:placeholder="placeHolderHour"
				:class="{ editing: lap.id === lapId }"
				@keyup.enter="update(lap.id)"
				v-model="inputHours"
			/>
			<input
				v-if="lap.id === lapId && editing === false"
				:placeholder="placeHolderMinute"
				:class="{ editing: lap.id === lapId }"
				@keyup.enter="update(lap.id)"
				v-model="inputMinutes"
			/>
			<input
				v-if="lap.id === lapId && editing === false"
				:placeholder="placeHolderSecond"
				:class="{ editing: lap.id === lapId && editing === false }"
				@keyup.enter="update(lap.id)"
				v-model="inputSeconds"
			/>
			<p v-else>
				{{ lap.time }}
			</p>

			<i @click.self="deleteOne(lap.id, lap.time)" class="fa-solid fa-trash"></i
			><i @click.self="editOne(lap.id)" class="fa-solid fa-pen"></i>
			<input
				v-show="bulkDeleteOn"
				type="checkbox"
				v-model="checked"
				class="checkboxs"
				@click="checkedIds(lap.id)"
			/>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

	export default {
		name: "LapContainer",
		data() {
			return {
				inputHours: "",
				inputMinutes: "",
				inputSeconds: "",
			};
		},
		methods: {
			...mapMutations(["setId", "setInputValues"]),
			...mapActions([
				"getPlaceholder",
				"updateLap",
				"updateApp",
				"deleteOne",
				"getDeletedData",
				"bulkDelete",
			]),

			editOne(lapId) {
				this.$store.state.editing = false;

				let lapToEdit = this.getLapById(lapId);

				this.$store.commit("setId", lapToEdit);
				this.$store.dispatch("getPlaceholder");
			},
			update(id) {
				debugger;
				this.$store.commit("setInputValues", {
					lapHour: this.inputHours,
					lapMinute: this.inputMinutes,
					lapSecond: this.inputSeconds,
				});

				this.$store.getters.nullInputs;

				this.$store.dispatch("updateLap", {
					lapId: id,
				});

				this.$store.state.editing = true;
			},
			deleteOne(id, time) {
				console.log(id);
				this.$store.dispatch("deleteOne", { lapId: id });
				this.$store.state.editing = true;

				this.$store.dispatch("getDeletedData", { lapId: id, time: time });
			},
			checkedIds(id) {
				debugger;
				this.$emit("store-checked-ids", id);
			},
			add(uid) {
				this.$store.commit("currentUser", uid);
			},
		},

		computed: {
			...mapState([
				"laps",
				"lapTime",
				"editLapTime",
				"lapId",
				"placeHolderHour",
				"placeHolderSecond",
				"placeHolderMinute",
				"fireBaseId",
				"editing",
				"bulkDeleteOn",
			]),
			...mapGetters({
				getLapById: "getUniqueLapId",
			}),
			...mapGetters(["nullInputs"]),
		},

		emits: ["store-checked-ids"],
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

		align-content: flex-start;
		flex-direction: column;
		margin-top: 1em;
		& .lap-wrapper {
			align-content: center;

			& p {
				color: black;
				text-align: left;
				font-size: 20px;
				font-family: $fontStyle;

				margin: 0em;
			}
		}
	}

	.lap-container::v-deep .lap-wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		padding: 0em;
	}
	.lap-container::v-deep .lap-wrapper .checkboxs {
		grid-column-start: 1;
		grid-row-start: 1;
	}

	.lap-container::v-deep .editing {
		border-bottom-style: groove;
		border-bottom-color: black;
		border-top: none;
		border-left: none;
		border-right: none;
		background-image: none;
		background-color: transparent;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		width: 25%;
		margin: 0em;
	}
</style>
