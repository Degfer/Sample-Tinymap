let vue = new Vue({
    el: '#app',
    data: {
        authStatus: 'signIn',
    },

    methods: {
        signIn: function () {
            let email = document.getElementById('emailSignIn').value;
            let password = document.getElementById('passwordSignIn').value;

            firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => { return error; });          
        },

        signUp: function () {
            let email = document.getElementById('emailReg').value;
            let password = document.getElementById('passwordReg').value;
            let login = document.getElementById('loginReg').value;

            firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => { return error; });

            db.collection("users").doc(`${email}`).set({
                login: login,
                email: email
            }).catch((error) => { return error; });
        }, 
    }
})

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        location.href = "index.html";
    }
});