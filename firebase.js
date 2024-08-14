const firebaseConfig = {
  apiKey: "AIzaSyAMvoRw7CKiyhzT_P_18LPBNS20tq5FfoA",
  authDomain: "realtime-puzzle.firebaseapp.com",
  projectId: "realtime-puzzle",
  storageBucket: "realtime-puzzle.appspot.com",
  messagingSenderId: "491146621508",
  appId: "1:491146621508:web:db9c4dd02f6d33b99a8211",
  measurementId: "G-RZC3JZ2XE4",
};
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
window.firestoreDB = firebase.firestore();
