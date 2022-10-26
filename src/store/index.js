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
	query,
	where,
} from "firebase/firestore";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import router from "./router";
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
		toaster: "",
		editValue: {},
		users: [{ uuid: "gJBO7SzdNsOl6nzfSd2ylJc68Ly2", isAuthed: true }],
		currentUserId: "gJBO7SzdNsOl6nzfSd2ylJc68Ly2",
		isRunning: false,
		editing: false,
		bulkDeleteOn: false,
		checked: false,
		deletePath: false,
		toast: false,
		fireBaseIds: [],
		bulkDeleteIds: [],
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

		getUser: (state) => (uuid) => state.users.find((userId) => userId === uuid),
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
		toggleBulkDelete(state) {
			state.bulkDeleteOn = !state.bulkDeleteOn;
		},
		toggleChecked(state) {
			state.checked = !state.checked;
		},
		toggleDeletePath(state) {
			state.deletePath = !state.deletePath;
		},
		toggleToast(state) {
			state.toast = !state.toast;
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

			if (lastItem !== undefined) {
				if (currentItem !== lastItem.time) {
					state.laps.push(state.lapTime);
				}
			} else {
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
			debugger;
			state.laps.splice(
				state.laps.findIndex(
					(object) => object.id == payload.id && object.time == payload.time
				),
				1
			);
		},
		deletePath(state, payload) {
			debugger;
			state.laps.splice(
				state.laps.findIndex((object) => object.id == payload.id),
				1
			);
		},
		bulkDeleteIds(state, payload) {
			state.bulkDeleteIds.push(payload);
		},
		toasterMsg(state, payload) {
			state.toaster = payload;
		},
		createUser(state, payload) {
			state.users.push({ uuid: payload.uuid, isAuthed: payload.isAuthed });
		},
		updateUser(state, payload) {
			let user = state.users.find((user) => user.uuid == payload.uuid);
			user.isAuthed = payload.isAuthed;
		},
		storeCurrentUserId(state, payload) {
			state.currentUserId = payload;
		},
	},
	actions: {
		async addData({ state, commit }) {
			debugger;

			const response = await addDoc(collection(db, "Laps"), {
				lapHour: state.outputhours,
				lapMinute: state.outputminutes,
				lapSecond: state.outputseconds,
			});

			commit("setLapTime", { lapId: response.id });
			commit("setDbId", response.id);
			commit("toasterMsg", "Lap Added");
			commit("toggleToast");
			setTimeout(commit("toggleToast"), 3000);

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
		async deleteOne({ state }, payload) {
			debugger;
			await getDocs(collection(db, "Laps"));

			deleteDoc(doc(db, "Laps", payload.lapId));
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
		async getDeletedData({ commit, state }, payload) {
			debugger;
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
				if (state.deletePath === true && doc.id === payload.id) {
					commit("deletePath", { id: payload.id });
				}
			});
		},
		async bulkDelete({ state, commit, dispatch }) {
			debugger;
			let i = 0;
			const lapRef = collection(db, "Laps");

			const q = query(lapRef, where("id", "==", state.bulkDeleteIds[0]));
			const snapShot = await getDocs(q);
			snapShot.forEach(async (doc) => {
				console.log(snapShot);
				await deleteDoc(lapRef, doc.id);
			});
		},

		// if (state.bulkDeleteIds !== undefined) {
		// commit("toggleDeletePath");
		// } else {
		// commit("toggleDeletePath");
		// }
		// dispatch("getDeletedData", { id: state.bulkDeleteIds.id });
		// },

		async enroll({ commit }, payload) {
			debugger;
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, payload.email, payload.password)
				.then((userCredential) => {
					const user = userCredential.user;

					const isAuthed = true;
					commit("createUser", { uuid: user.uid, isAuthed: isAuthed });
					console.log("user created");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log("error occured in enroll");
				});
		},
		async login({ state }, payload) {
			debugger;
			const auth = getAuth();
			signInWithEmailAndPassword(auth, payload.email, payload.password)
				.then((userCredential) => {
					debugger;
					//to do make api call to get laps for a user
					//after api call then set laps in state
					const user = userCredential.user;
					router.push("/Homescreen");
					console.log("user login");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log("error on login");
				});
		},
		async loginChange({ commit }) {
			debugger;
			const auth = getAuth();
			await onAuthStateChanged(auth, (user) => {
				if (user) {
					//user is signed in
					const uid = user.uid;
					const isAuthed = true;
					commit("updateUser", { uuid: uid, isAuthed: isAuthed });
					commit("storeCurrentUserId", uid);
					console.log("listener updated condition to true based on uuid");
				} else {
					//user is signed out

					const isAuthed = false;
					commit("updateUser", { uuid: uid, isAuthed: isAuthed });
					console.log("listener updated condition to false based on uuid");
				}
			});
		},
		logOut({ commit }) {
			debugger;
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					//sign-out sucessful
					console.log("user signed out");
				})
				.catch((error) => {
					//An error happened.
					console.log("error on sign out");
				});
		},
	},
	modules: {},
});
