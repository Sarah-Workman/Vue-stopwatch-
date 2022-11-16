// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

const functions = require("firebase-functions");

var admin = require("firebase-admin");
//var serviceAccount = require("../src/dot/stopwatch-backend-firebase-adminsdk-d61kq-87ec7b957b.json");
admin.initializeApp({
	apiKey: "AIzaSyAwrPlYMo3d6tn4R44Z4jMzQoQ3fbbskPU",
	authDomain: "stopwatch-backend.firebaseapp.com",
	projectId: "stopwatch-backend",
	//	credential: admin.credential.cert(serviceAccount),
});

exports.bulkDelete = functions.https.onCall(async (data, context) => {
	store = admin.firestore();
	const userId = context.auth.uid;
	const selectedArray = data.selectedArray;
	for (let index = 0; index < selectedArray.length; index++) {
		const userRef = store.doc(`Users/${userId}/Laps/${selectedArray[index]}`);

		const deleteDoc = await userRef.delete();
		console.log("your deleteDoc deleted: " + selectedArray[index]);
	}
	return null;
});
