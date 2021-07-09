import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCwEUXCSbeZiBgssaL1M1Oh8ll00KGyxiQ",
	authDomain: "chat-app-65bc6.firebaseapp.com",
	databaseURL: "https://chat-app-65bc6-default-rtdb.firebaseio.com",
	projectId: "chat-app-65bc6",
	storageBucket: "chat-app-65bc6.appspot.com",
	messagingSenderId: "1019178832734",
	appId: "1:1019178832734:web:e872d347ab18d8da31f5cf",
	measurementId: "G-WQKH9L01MR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
