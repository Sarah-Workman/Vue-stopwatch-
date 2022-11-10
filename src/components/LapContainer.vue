<template>
	<div v-show="isEditing" class="delete-all-container">
		<label for="deleteAll" id="deleteAllLabel">Delete All?</label>
		<input type="checkbox" @click="deleteAll" name="deleteAll" id="deleteAll" />
	</div>
	<div class="lap-container">
		<div
			v-for="lap in laps"
			:key="lap.id"
			class="lap-wrapper"
			:class="{
				'lap-editing': isEditing,
				'lap-selected': getIsLapSelected(lap.id) && isEditing,
			}"
			@click="selectLap(lap.id)"
		>
			<!-- @click="isEditing ? bulkDelete(lap.id) : null" -->
			<div
				v-if="lap.id === lapId && editing === false"
				class="lap-input-wrapper"
			>
				<input
					required=""
					:placeholder="placeHolderHour"
					@keyup.enter="update(lap.id)"
					v-model="inputHours"
				/>:
				<input
					required=""
					:placeholder="placeHolderMinute"
					@keyup.enter="update(lap.id)"
					v-model="inputMinutes"
				/>:
				<input
					required=""
					:placeholder="placeHolderSecond"
					@keyup.enter="update(lap.id)"
					v-model="inputSeconds"
				/>
			</div>
			<p v-else>
				{{ lap.time }}
			</p>

			<i
				@click.self="deleteOne(lap.id, lap.time)"
				class="fa-solid fa-x"
				v-if="isEditing"
			></i
			><i
				@click.self="editOne(lap.id)"
				class="fa-solid fa-pen"
				v-if="isEditing"
			></i>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

	export default {
		name: "LapContainer",
		data() {
			debugger;
			return {
				inputHours: "",
				inputMinutes: "",
				inputSeconds: "",
			};
		},
		methods: {
			...mapMutations(["setId", "setInputValues", "setSelectedIds"]),
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
				this.$store.commit("toggleIsUpdating");
				this.$store.dispatch("getPlaceholder");
			},
			update(id) {
				//to do dual event
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
				this.$store.commit("toggleIsUpdating");
			},
			deleteOne(id, time) {
				console.log(id);
				this.$store.dispatch("deleteOne", { lapId: id });
				this.$store.state.editing = true;

				this.$store.dispatch("getDeletedData", { lapId: id, time: time });
			},

			add(uid) {
				this.$store.commit("currentUser", uid);
			},
			// bulkDelete(id) {
			// debugger;
			// console.log(`${id} was selected`);
			// this.$store.commit("setSelectedIds", id);
			// },
			selectLap(id) {
				debugger;

				if (this.getIsLapSelected(id)) {
					this.$store.commit("removeSelected", id);
				} else {
					this.$store.commit("setSelected", id);
				}
			},
			deleteAll() {
				debugger;
				if (!this.isSelecting) {
					this.$store.commit("toggleIsSelecting");
					for (let index = 0; index < this.$store.state.laps.length; index++) {
						this.$store.commit("setSelected", this.$store.state.laps[index].id);
					}
				} else {
					this.$store.commit("toggleIsSelecting");
					for (let index = 0; index < this.$store.state.laps.length; index++) {
						this.$store.commit(
							"removeSelected",
							this.$store.state.laps[index].id
						);
					}
				}
				console.log("selected: " + this.$store.state.selected);
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
				"isEditing",
				"selectedLaps",
				"isUpdating",
				"isSelecting",
				"selected",
				"currentSelected",
			]),
			...mapGetters({
				getLapById: "getUniqueLapId",
				nullInputs: "nullInputs",
				getIsLapSelected: "getIsLapSelected",
			}),
		},

		emits: ["store-checked-ids"],
	};
</script>

<style scoped lang="scss">
	$fontStyle: Arial, Helvetica, sans-serif;
	@mixin flex {
	}

	.lap {
		&-container {
			justify-content: flex-start;
			display: flex;
			margin: auto;
			align-content: flex-start;
			flex-direction: row;
			margin-top: 1em;
			flex-wrap: wrap;
			gap: 1em;
			font: normal normal normal 30px/47px Roboto;
			letter-spacing: 0.54px;
			color: #000;
		}

		&-wrapper {
			background: #e2e2e2 0% 0% no-repeat padding-box;
			box-shadow: 6px 4px 3px #00000029;
			border: 1px solid #000000;
			border-radius: 4px;

			width: 230px;
			height: 67px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			gap: 0.25em;
			cursor: pointer;

			& p {
				text-align: center;

				width: 119px;
				height: 39px;
			}
			& .fa-x {
				color: red;
			}
		}

		&-input-wrapper {
			display: flex;
			flex-direction: row;

			text-align: center;

			width: 119px;
			height: 39px;

			& input {
				width: 1em;
				border-top: none;
				border-left: none;
				border-right: none;
				background-image: none;
				background-color: transparent;
				-webkit-box-shadow: none;
				-moz-box-shadow: none;
				box-shadow: none;
				border-bottom-style: groove;
				border-bottom-color: black;
			}
		}

		&-editing {
			background: #ffffff 0% 0% no-repeat padding-box;
		}

		&-selected {
			border: 3px solid #008aac;
		}
	}

	input {
		padding-left: 1em;
		padding-top: 0em;
		padding-bottom: 0em;
		padding-right: 1em;
		margin: 0em;
	}
	.delete-all-container {
		align-content: center;
	}
</style>
