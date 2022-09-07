const state = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	outputseconds: "00",
	outputminutes: "00",
	outputhours: "00",
	laps: [],
	isRunning: false,
	interval: null,
};
const getters = {
	secondLength(state) {
		return state.seconds.toString.length;
	},
	minuteLength(state) {
		return state.minutes.toString.length;
	},
	hourLength(state) {
		return state.hours.toString.length;
	},
};
const mutations = {
		clearTimeInterval(state) {
			clearInterval(state.interval);
		},
		start: (state, seconds) => (state.seconds = seconds),

		countMinutes(state) {
			state.minutes++;
		},
		countHours(state) {
			state.hours++;
		},
		placeholderSeconds(state) {
			state.outputseconds = "0" + state.seconds;
		},
		placeholderMinutes(state) {
			state.outputminutes = "0" + state.minutes;
		},
		placeholderHours(state) {
			state.outputhours = "0" + state.hours;
		},
		clear(state) {
			state.outputseconds = "00";
			state.outputminutes = "00";
			state.outputhours = "00";
		},
		IsRunning(state) {
			state.isRunning = true;
		},
		NotRunning(state) {
			state.isRunning = false;
		},
	},
	actions = {
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
		async setInterval(state, seconds) {
			state.interval = setInterval(() => {
				state.seconds++;
			}, 1000);
			commit("start", seconds);
		},
	};

export default {
	state,
	getters,
	actions,
	mutations,
};
