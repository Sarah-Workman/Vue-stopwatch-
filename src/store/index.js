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
		laps: [
			{
				lapHour: undefined,
				lapMinute: undefined,
				lapSecond: undefined,
			},
		],
		lapTime: "",
		isRunning: false,

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
		},

		toggleRunning(state) {
			state.isRunning = !state.isRunning;
		},

		createP(state) {
			var [{ lapHour, lapMinute, lapSecond }] = state.laps;
			lapHour = state.outputhours;
			lapMinute = state.outputminutes;
			lapSecond = state.outputseconds;
			state.lapTime = `${lapHour}:${lapMinute}:${lapSecond}`;

			let lastItem = state.laps[state.laps.length - 1];
			let currentItem = state.lapTime;

			if (currentItem !== lastItem) {
				state.laps.push(state.lapTime);
				console.log(state.lapTime);
				console.log(state.laps);
			}
		},
		clearLaps(state) {
			while (state.laps.length > 1) {
				state.laps.pop();
			}
		},
	},
	actions: {},
	modules: {},
});
