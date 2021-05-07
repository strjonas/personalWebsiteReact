import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDhvUyJlrplZ7VqaOIvjg0VVuQEI8NLI2Q",
  authDomain: "react-local-website.firebaseapp.com",
  projectId: "react-local-website",
  storageBucket: "react-local-website.appspot.com",
  messagingSenderId: "747004295309",
  appId: "1:747004295309:web:1c98dd8ca820c961f18ac4",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
