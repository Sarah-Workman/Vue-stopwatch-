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
