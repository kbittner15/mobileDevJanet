import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAS_v-QVi_3v84VFOnkF4nJ0-g0Ye4OwSk",
    authDomain: "cliqd-19df5.firebaseapp.com",
    databaseURL: "https://cliqd-19df5-default-rtdb.firebaseio.com",
    projectId: "cliqd-19df5",
    storageBucket: "cliqd-19df5.appspot.com",
    messagingSenderId: "440529118050",
    appId: "1:440529118050:web:1788a1ed3477f50664423b",
    measurementId: "G-DB5HZKE6DP"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.firestore();

  export default database;