// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from ("firebase-functions");

import * as admin from ("firebase-admin");

admin.initializeApp({
	apiKey: "AIzaSyAwrPlYMo3d6tn4R44Z4jMzQoQ3fbbskPU",
	authDomain: "stopwatch-backend.firebaseapp.com",
	projectId: "stopwatch-backend",
});

exports.bulkDelete = functions.https.onCall((data, context) => {
	debugger;
	const docRef = collection(db, "users", context.uid, "Laps");

	while (data.selectedArray > 0) {
		deleteDoc(doc(docRef, data.selectedArray));
	}
});
