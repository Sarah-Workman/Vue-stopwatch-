import { createStore } from "vuex";

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
		lapTime: [],
		isRunning: false,
		isClicked: true,
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
		},

		toggleRunning(state) {
			state.isRunning = !state.isRunning;
		},
		toggleClicked(state) {
			state.isClicked = !state.isClicked;
		},

		createP(state) {
			state.lapTime = `${state.outputhours}:${state.outputminutes}:${state.outputseconds}`;
			let lapContainer = document.getElementById("lapContainer");
			const para = document.createElement("p");
			para.innerText = state.lapTime;
			state.laps = Array.from(
				document.getElementById("lapContainer").childNodes
			).map((node) => node.textContent);
			let lastItem = state.laps[state.laps.length - 1];
			let currentItem = state.lapTime;

			if (currentItem !== lastItem) {
				lapContainer.appendChild(para);
			}
		},
		clearLaps() {
			const container = document.getElementById("lapContainer");
			while (container.hasChildNodes()) {
				container.removeChild(container.firstChild);
			}
		},
	},
	actions: {
		incrementSeconds(context) {
			context.commit("countSeconds");
		},
		incrementMinutes(context) {
			context.commit("countMinutes");
		},
		incrementHours(context) {
			context.commit("countHours");
		},
		addPlaceholderSeconds(context) {
			context.commit("placeholderSeconds");
		},
	},
	modules: {},
});
