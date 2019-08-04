import * as firebase from 'firebase';

//insert config from firebase
const config = {
    apiKey: "AIzaSyDiAQEwq-iKq-UecchCftCcAQKh-07BOO4",
    authDomain: "coffe-system-yiakpd.firebaseapp.com",
    databaseURL: "https://coffe-system-yiakpd.firebaseio.com",
    projectId: "coffe-system-yiakpd",
    storageBucket: "coffe-system-yiakpd.appspot.com",
    messagingSenderId: "866699626201",
    appId: "1:866699626201:web:79aff8c94677f5d9"
};
firebase.initializeApp(config);

export default firebase;
