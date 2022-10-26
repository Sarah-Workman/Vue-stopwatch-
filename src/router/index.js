import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: LoginView,
	},
	{
		path: "/Enroll",
		name: "Enroll",
		component: () => import("../views/EnrollView.vue"),
	},
	{
		path: "/Homescreen",
		name: "stopwatch",
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/Loading",
		name: "Loading",
		component: () => import("../views/Loading.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
