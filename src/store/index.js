import { createStore } from "vuex";
import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
	onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";

export const getterTypes = Object.freeze({
	SECOND_LENGTH: `secondLength`,
});

export default createStore({
	state: {
		hours: 0,
		minutes: 0,
		seconds: 0,

		outputseconds: "00",
		outputminutes: "00",
		outputhours: "00",
		lapHour: "",
		lapMinute: "",
		lapSecond: "",
		laps: [],
		placeHolderHour: "",
		placeHolderMinute: "",
		placeHolderSecond: "",
		lapTime: "",
		editValue: {},
		isRunning: false,
		editing: false,
		fireBaseIds: [],
		lapId: "",
		interval: null,
	},
	getters: {
		secondLength(state) {
			return state.seconds.toString.length;
		},
		minuteLength(state) {
			return state.minutes.toString.length;
		},
		hourLength(state) {
			return state.hours.toString.length;
		},
		outputSeconds(state) {
			const outputSeconds =
				state.seconds < 10 ? "0" + state.seconds : state.seconds;
			return outputSeconds;
		},
		outputMinutes(state) {
			const outputminutes =
				state.minutes < 10 ? "0" + state.minutes : state.minutes;
			return outputminutes;
		},
		outputHours(state) {
			const outputHours = state.hours < 10 ? "0" + state.hours : state.hours;
			return outputHours;
		},
		nullInputs(state) {
			//need to replace with validation
			state.lapSecond === ""
				? (state.lapSecond = state.lapSecond)
				: (state.lapSecond = state.lapSecond);
			state.lapMinute === ""
				? (state.lapMinute = state.lapMinute)
				: (state.lapMinute = state.lapMinute);
			state.lapHour === ""
				? (state.lapHour = state.lapHour)
				: (state.lapHour = state.lapHour);

			state.lapHour.length < 2
				? (state.lapHour = `0${state.lapHour}`)
				: (state.lapHour = state.lapHour);
			state.lapMinute.length < 2
				? (state.lapMinute = `0${state.lapMinute}`)
				: (state.lapMinute = state.lapMinute);
			state.lapSecond.length < 2
				? (state.lapSecond = `0${state.lapSecond}`)
				: (state.lapSecond = state.lapSecond);
		},
		getUniqueLapId: (state) => (lapId) =>
			state.fireBaseIds.find((id) => id === lapId),
	},
	mutations: {
		countSeconds(state) {
			state.seconds++;
		},
		countMinutes(state) {
			state.minutes++;
		},
		countHours(state) {
			state.hours++;
		},
		setOutputSeconds(state, outputseconds) {
			state.outputseconds = outputseconds;
		},
		setOutputMinutes(state, outputminutes) {
			state.outputminutes = outputminutes;
		},
		setOutputHours(state, outputhours) {
			state.outputhours = outputhours;
		},

		clearSeconds(state) {
			state.outputseconds = "00";
			state.seconds = 0;
		},
		clearMinutes(state) {
			state.outputminutes = "00";
			state.minutes = 0;
		},

		clearTimeInterval(state) {
			clearInterval(state.interval);
		},

		clear(state) {
			state.outputseconds = "00";
			state.outputminutes = "00";
			state.outputhours = "00";
			state.seconds = 0;
			state.minutes = 0;
			state.hours = 0;
		},

		toggleRunning(state) {
			state.isRunning = !state.isRunning;
		},
		toggleEditLapTime(state) {
			state.editing = !state.editing;
		},

		setLapTime(state, payload) {
			let [lapHour, lapMinute, lapSecond] = [0, 0, 0];
			lapHour = state.outputhours;
			lapMinute = state.outputminutes;
			lapSecond = state.outputseconds;
			state.lapTime = {
				id: payload.lapId,
				time: `${lapHour}:${lapMinute}:${lapSecond}`,
			};

			let lastItem = state.laps[state.laps.length - 1];
			let currentItem = state.lapTime.time;

			if (currentItem !== lastItem.time) {
				state.laps.push(state.lapTime);
			}
		},

		setLaps(state, lapTimeString) {
			state.laps.push(lapTimeString);
		},
		setId(state, id) {
			state.lapId = id;
		},
		setDbId(state, dbId) {
			state.fireBaseIds.push(dbId);
		},
		setPlaceholderHour(state, placeholder) {
			state.placeHolderHour = placeholder;
		},
		setPlaceholderMinute(state, placeholder) {
			state.placeHolderMinute = placeholder;
		},
		setPlaceholderSecond(state, placeholder) {
			state.placeHolderSecond = placeholder;
		},

		setInputValues(state, payload) {
			state.lapHour = payload.lapHour;
			state.lapMinute = payload.lapMinute;
			state.lapSecond = payload.lapSecond;
		},
		updateLaps(state, payload) {
			let lap = state.laps.find((lap) => lap.id == payload.id);
			lap.time = payload.time;
		},
		replaceLaps(state, payload) {
			state.laps.splice(state.laps.indexOf(payload.time), 1);
		},
	},
	actions: {
		async addData({ state, commit }) {
			// Add a new document with a generated id.
			const docRef = await addDoc(collection(db, "Laps"), {
				lapHour: state.outputhours,
				lapMinute: state.outputminutes,
				lapSecond: state.outputseconds,
			});
			commit("setLapTime", { lapId: docRef.id });
			commit("setDbId", docRef.id);
			console.log("Document written with ID: ", docRef.id);
		},
		async getData({ commit }) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());

				let lapHour = doc.data().lapHour;

				let lapMinute = doc.data().lapMinute;

				let lapSecond = doc.data().lapSecond;

				commit("setLaps", {
					id: doc.id,
					time: `${lapHour}:${lapMinute}:${lapSecond}`,
				});
				commit("setDbId", doc.id);
			});
		},
		async deleteOne({ state }) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				state.lapId = doc.id;
			});
			deleteDoc(doc(db, "Laps", state.lapId));
		},

		async getPlaceholder({ state, commit }) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());

				let lapHour = doc.data().lapHour;

				let lapMinute = doc.data().lapMinute;

				let lapSecond = doc.data().lapSecond;

				if (doc.id === state.lapId) {
					commit("setPlaceholderHour", lapHour);
					commit("setPlaceholderMinute", lapMinute);
					commit("setPlaceholderSecond", lapSecond);
				}
			});
		},

		async updateLap({ state }, payload) {
			const querySnapshot = doc(db, "Laps", payload.lapId);

			await updateDoc(querySnapshot, {
				lapHour: state.lapHour,
				lapMinute: state.lapMinute,
				lapSecond: state.lapSecond,
			});
		},
		async updateApp({ commit }, payload) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				let lapHour = doc.data().lapHour;

				let lapMinute = doc.data().lapMinute;

				let lapSecond = doc.data().lapSecond;

				if (doc.id === payload.lapId) {
					commit("updateLaps", {
						id: payload.lapId,
						time: `${lapHour}:${lapMinute}:${lapSecond}`,
					});
				}
			});
		},
		async getDeletedData({ commit }, payload) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log("new data:" + doc.id, " => ", doc.data());

				let lapHour = doc.data().lapHour;

				let lapMinute = doc.data().lapMinute;

				let lapSecond = doc.data().lapSecond;

				if (doc.id === payload.lapId) {
					commit("replaceLaps", {
						id: payload.lapId,
						time: `${lapHour}:${lapMinute}:${lapSecond}`,
					});
				}
			});
		},
	},
	modules: {},
});
