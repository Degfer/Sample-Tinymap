let firebaseConfig = {
    apiKey: "AIzaSyCBF_nNjUmnG9cLwlQcCZtDUBY3WlZB4EU",
    authDomain: "tinywalks-1943f.firebaseapp.com",
    projectId: "tinywalks-1943f",
    storageBucket: "tinywalks-1943f.appspot.com",
    messagingSenderId: "397658780145",
    appId: "1:397658780145:web:954ac1db0b2446b3f49450",
    measurementId: "G-YLM0H2FD92"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();