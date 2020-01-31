import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyD1i2OgMLC25VIVvr1B0WpmPgFUwiW9fek",
    authDomain: "todo-58c47.firebaseapp.com",
    databaseURL: "https://todo-58c47.firebaseio.com",
    projectId: "todo-58c47",
    storageBucket: "todo-58c47.appspot.com",
    messagingSenderId: "151357029285",
    appId: "1:151357029285:web:2847d9830970e2754e864c"
});

export { firebaseConfig as firebase };