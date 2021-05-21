import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBsnRVGwxLq0DfXULXdcS8atKIBVavSBLg",
    authDomain: "covid-ee23d.firebaseapp.com",
    databaseURL: "https://covid-ee23d-default-rtdb.firebaseio.com",
    projectId: "covid-ee23d",
    storageBucket: "covid-ee23d.appspot.com",
    messagingSenderId: "130383075739",
    appId: "1:130383075739:web:f4c2b3feab118d0817693e"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.database();