import { createStore, mapGetters } from "vuex";
import { collection, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";

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
		laps: [],
		lapTime: "",
		isRunning: false,
		editLapTime: false,
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
			state.editLapTime = !state.editLapTime;
		},

		setLapTime(state) {
			let [lapHour, lapMinute, lapSecond] = [0, 0, 0];
			lapHour = state.outputhours;
			lapMinute = state.outputminutes;
			lapSecond = state.outputseconds;
			state.lapTime = `${lapHour}:${lapMinute}:${lapSecond}`;

			let lastItem = state.laps[state.laps.length - 1];
			let currentItem = state.lapTime;

			if (currentItem !== lastItem) {
				state.laps.push(state.lapTime);
			}
		},
		clearLaps(state) {
			while (state.laps.length > 0) {
				state.laps.pop();
			}
		},
		setLaps(state, lapTimeString) {
			state.laps.push(lapTimeString);
		},
		setId(state, lapId) {
			state.lapId = lapId;
		},
	},
	actions: {
		async addData(state) {
			// Add a new document with a generated id.
			const docRef = await addDoc(collection(db, "Laps"), {
				lapHour: state.state.outputhours,
				lapMinute: state.state.outputminutes,
				lapSecond: state.state.outputseconds,
			});
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

				commit("setLaps", `${lapHour}:${lapMinute}:${lapSecond}`);
			});
		},
		async deleteOne(state) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				state.state.lapId = doc.id;
			});
			deleteDoc(doc(db, "Laps", state.state.lapId));
		},
		async getCurrentId(state) {
			const querySnapshot = await getDocs(collection(db, "Laps"));
			querySnapshot.forEach((doc) => {
				state.state.lapId = doc.id;
			});
		},
	},
	modules: {},
});
