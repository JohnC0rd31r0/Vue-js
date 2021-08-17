import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCsUFKOQy2A3lueXOGJaUkrgYYEuRVsOI",
  authDomain: "vue-firebase-b33eb.firebaseapp.com",
  projectId: "vue-firebase-b33eb",
  storageBucket: "vue-firebase-b33eb.appspot.com",
  messagingSenderId: "154929656670",
  appId: "1:154929656670:web:fa8063396a7c9515e955cf",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const profileCollection = db.collection("profile");
const tasksCollection = db.collection("tasks");

export { db, auth, profileCollection, tasksCollection };
