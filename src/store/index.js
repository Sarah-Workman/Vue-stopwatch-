import { createStore } from "vuex";
import {
	collection,
	getDocs,
	setDoc,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

import { db } from "@/firebase";
import router from "@/router";

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
		toastTimeout: "",
		lapTime: "",
		toast: "",
		editValue: {},

		currentUser: "",
		isRunning: false,
		isPasswordVisable: false,
		isEditing: false,
		editing: false,
		isUpdating: false,
		isSelecting: false,
		isSelectActive: false,
		bulkDeleteOn: false,
		currentSelected: false,
		isToasting: false,
		checked: false,
		isLoginFailed: false,
		isDeleting: false,
		fireBaseIds: [],
		selectedObj: [],
		selectedIds: [],
		formErrors: [],
		lapId: "",
		interval: undefined,
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
		checkSeconds(state) {
			const outputSeconds =
				state.seconds < 10 ? "0" + state.seconds : state.seconds;
			return outputSeconds;
		},
		checkMinutes(state) {
			const outputminutes =
				state.minutes < 10 ? "0" + state.minutes : state.minutes;
			return outputminutes;
		},
		checkHours(state) {
			const outputHours = state.hours < 10 ? "0" + state.hours : state.hours;
			return outputHours;
		},

		getUniqueLapId: (state) => (lapId) =>
			state.fireBaseIds.find((id) => id === lapId),

		getIsLapSelected: (state) => (lapId) => state.selectedIds.includes(lapId),
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
			debugger;
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
		clearSelected(state) {
			state.selectedObj = [];
			state.selectedIds = [];
		},

		toggleRunning(state) {
			state.isRunning = !state.isRunning;
		},
		toggleIsEditing(state) {
			state.isEditing = !state.isEditing;
		},

		toggleBulkDelete(state) {
			state.bulkDeleteOn = !state.bulkDeleteOn;
		},
		toggleIsPasswordVisable(state) {
			state.isPasswordVisable = !state.isPasswordVisable;
		},

		toggleToast(state) {
			state.isToasting = !state.isToasting;
		},
		toggleIsUpdating(state) {
			state.isUpdating = !state.isUpdating;
		},
		toggleIsSelecting(state) {
			state.isSelecting = !state.isSelecting;
		},
		toggleChecked(state) {
			state.checked = !state.checked;
		},
		toggleEdit(state) {
			state.editing = !state.editing;
		},
		toggleIsLoginFailed(state) {
			state.isLoginFailed = !state.isLoginFailed;
		},
		toggleIsDeleting(state) {
			state.isDeleting = !state.isDeleting;
		},

		setLapTime(state, payload) {
			state.lapTime = {
				id: payload.lapId,
				time: payload.time,
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
		clearLaps(state) {
			state.laps = [];
		},
		clearErrors(state) {
			state.formErrors = [];
		},
		setErrors(state, payload) {
			debugger;
			if (state.formErrors.find((string) => string.error === payload.error)) {
				return;
			} else {
				state.formErrors.push(payload);
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

		setToastMsg(state, payload) {
			debugger;
			state.toast = payload;
		},

		setCurrentUser(state, payload) {
			state.currentUser = payload;
		},
		setSelected(state, payload) {
			debugger;
			state.selectedObj.push(payload);
			state.selectedIds.push(payload.id);
		},
		removeSelected(state, payload) {
			state.selectedIds.splice(
				state.selectedIds.findIndex((object) => object.id === payload.id),
				1
			);
			state.selectedObj.splice(
				state.selectedObj.findIndex(
					(object) => object.id === payload.id && object.time === payload.time
				),
				1
			);
		},
	},
	actions: {
		toastTimeout({ commit }, time) {
			setTimeout(() => {
				commit("toggleToast");
			}, time);
		},
		async addData({ state, commit }) {
			const snapShot = doc(db, "Users", state.currentUser.uid);
			let lapTime = {
				lapHour: state.outputhours,
				lapMinute: state.outputminutes,
				lapSecond: state.outputseconds,
			};
			try {
				const response = await addDoc(collection(snapShot, "Laps"), {
					lapTime,
					timestamp: serverTimestamp(),
				});

				commit("setLapTime", {
					lapId: response.id,
					time: `${lapTime.lapHour}:${lapTime.lapMinute}:${lapTime.lapSecond}`,
					timestamp: serverTimestamp(),
				});

				commit("setDbId", response.id);
			} catch {}
			//
		},

		async getData({ commit }, user) {
			const snapShot = collection(db, "Users", user.uid, "Laps");
			if (snapShot !== null) {
				try {
					const querySnapshot = await getDocs(snapShot);

					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, " => ", doc.data());

						let lapHour = doc.data().lapTime.lapHour;

						let lapMinute = doc.data().lapTime.lapMinute;

						let lapSecond = doc.data().lapTime.lapSecond;

						commit("setLaps", {
							id: doc.id,
							time: `${lapHour}:${lapMinute}:${lapSecond}`,
							timestamp: doc.timestamp,
						});
						commit("setDbId", doc.id);
					});
				} catch {}
			} //maybe a toaster to add data?
		},
		async deleteOne({ state }, payload) {
			const docRef = collection(db, "Users", state.currentUser.uid, "Laps");

			deleteDoc(doc(docRef, payload.lapId));
		},

		async updateLap({ state, commit }, payload) {
			const querySnapshot = doc(
				db,
				"Users",
				state.currentUser.uid,
				"Laps",
				payload.lapId
			);

			let lapTime = {
				lapHour: state.lapHour,
				lapMinute: state.lapMinute,
				lapSecond: state.lapSecond,
			};
			try {
				await updateDoc(querySnapshot, {
					lapTime,
				});
			} catch {}
			commit("updateLaps", {
				time: `${lapTime.lapHour}:${lapTime.lapMinute}:${lapTime.lapSecond}`,

				id: payload.lapId,
			});
		},

		async bulkDelete({ state, commit }) {
			debugger;
			const functions = getFunctions();
			const bulkDelete = httpsCallable(functions, "bulkDelete");
			bulkDelete({
				selectedArray: state.selectedIds,
				uid: state.currentUser.uid,
			});

			for (let index = 0; index < state.selectedObj.length; index++) {
				commit("replaceLaps", {
					id: state.selectedObj[index].id,
					time: state.selectedObj[index].time,
				});
			}
		},

		async enroll({ commit }, payload) {
			const auth = getAuth();
			createUserWithEmailAndPassword(
				auth,
				payload.email,
				payload.password
			).then(async (userCredential) => {
				const user = userCredential.user;
				try {
					await setDoc(doc(db, "Users", user.uid), { email: user.email });
					commit("setCurrentUser", user);
				} catch {}
			});
		},
		async login({ commit, dispatch, state }, payload) {
			const auth = getAuth();
			signInWithEmailAndPassword(auth, payload.email, payload.password)
				.then((userCredential) => {
					//to do make api call to get laps for a user
					//after api call then set laps in state
					debugger;
					const user = userCredential.user;
					commit("setCurrentUser", user);
					dispatch("getData", user);

					router.push("/Homescreen");
					if (state.isLoginFailed) {
						commit("toggleIsLoginFailed");
					}
				})
				.catch((error) => {
					commit("toggleIsLoginFailed");
				});
		},
		async loginChange({ commit, dispatch }) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
				} else {
					//user is signed out

					const isAuthed = false;
				}
			});
		},
		logOut({ commit, state }) {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					commit("clearLaps");
					commit("clear");
					commit("clearSelected");

					if (state.isPasswordVisable) {
						commit("toggleIsPasswordVisable");
					}
					if (state.isEditing) {
						commit("toggleIsEditing");
					}
				})
				.catch((error) => {
					//An error happened.
					console.log("error on sign out");
				});
		},
	},
	modules: {},
});
