console.log('login js connected')

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";



const firebaseConfig = {
    apiKey: "AIzaSyCG2qEVagEiVy-F5BWey2LZ_X6flcznqbk",
    authDomain: "q-startups-pvt-ltd.firebaseapp.com",
    projectId: "q-startups-pvt-ltd",
    storageBucket: "q-startups-pvt-ltd.appspot.com",
    messagingSenderId: "943287081104",
    appId: "1:943287081104:web:52a231d94931978cc76015",
    measurementId: "G-H7LJWC49HQ"
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()


// onsubmit of login form
document.getElementById('loginForm').onsubmit = ((event) => {
    event.preventDefault()

    const form = event.target
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    if (!email) {
        return
    }
    // login with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            // Signed in 
            const user = result.user;
            console.log(user)

            localStorage.setItem('currentUser', JSON.stringify(user));

        })
        .catch((error) => {
            console.log(error)
        });





})
// onsubmit end.

// login with gmail start
const loginWithEmail = () => {
    signInWithPopup(auth, googleProvider)
        .then(result => {
            const user = result.user
            const currentUser = {
                username: user.displayName,
                email: user.email
            }
            if (user) {
                fetch(`http://localhost:5000/signup`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
            }

        })
        .catch(error => { console.log(error) })

}
const googleButton = document.getElementById('googleButton')
googleButton.addEventListener('click', loginWithEmail)
// login with gmail end

// forget password function emplement
const handleResetPassword = () => {
    const email = document.getElementById('email').value;
    if (!email) {
        alert('please enter email')
        return
    } else if (email) {
        console.log('reset clicked')
        sendPasswordResetEmail(auth, email)
            .then(() => {

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            });
    }

}
// forget password button and eventlistener
const resetbtn = document.getElementById('resetPass')

resetbtn.addEventListener('click', handleResetPassword)
console.log('login clicked')