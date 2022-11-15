// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
	apiKey: "AIzaSyAwrPlYMo3d6tn4R44Z4jMzQoQ3fbbskPU",
	authDomain: "stopwatch-backend.firebaseapp.com",
	projectId: "stopwatch-backend",
	storageBucket: "stopwatch-backend.appspot.com",
	messagingSenderId: "567301687826",
	appId: "1:567301687826:web:6e183344a74a3ddd7266cb",
	measurementId: "G-438P4LZW8V",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Initialize Firebase Authentication and get a reference to the service.
const auth = getAuth(app);

//Initialize functions
const functions = getFunctions(app);

export { db };
