// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

const functions = require("firebase-functions");

var admin = require("firebase-admin");

//routes

var serviceAccount = require("../src/dot/stopwatch-backend-firebase-adminsdk-d61kq-87ec7b957b.json");

admin.initializeApp({
	apiKey: "AIzaSyAwrPlYMo3d6tn4R44Z4jMzQoQ3fbbskPU",
	authDomain: "stopwatch-backend.firebaseapp.com",
	projectId: "stopwatch-backend",
	credential: admin.credential.cert(serviceAccount),
});

exports.bulkDelete = functions.https.onCall(async (data, context) => {
	const userId = context.auth.uid;

	if (!userId) return { status: "error", code: 401, message: "Not signed in!" };
	const { selectedArray } = data;
	const store = admin.firestore();

	for (let index = 0; index < selectedArray.length; index++) {
		const userRef = store
			.collection("Users")
			.doc(`/${userId}/`)
			.collection("Laps")
			.doc(`/${selectedArray[index]}`);

		userRef.delete();
	}
});
