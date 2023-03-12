console.log('js connected')
// firebaseTag


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

document.getElementById('form').onsubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmPassword.value;

    const createdUser = {
        username, email
    }



    // Sign Up with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {

            const user = result.user;
            console.log('user', user);
            localStorage.setItem('email', user.email)
            //   2. Update Name

            updateProfile(auth.currentUser, {
                displayName: username,

            })

            // saveUserToDatabase
            fetch(`http://localhost:5000/signup`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(createdUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            form.reset()
            // window.location.href = '/index.html'
        })
        .catch((error) => {

            console.log(error)
        });



}




const loginBtn = document.getElementById("login")

const logoutBtn = document.getElementById("logout")
const accessToken = localStorage.getItem('accessToken')
const LocalCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
const email = localStorage.getItem('email')
console.log(LocalCurrentUser)



// logout function
const handleLogout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('currentUser')
            console.log('signOut')
        })
        .catch(error => { console.log(error) })
    console.log('clicked')
}

// conditional rendering of login and logout button
if (LocalCurrentUser?.uid) {
    logoutBtn.innerHTML = `<a  class="nav-item nav-link cursor-pointer" id="login">Logout</a>`

} else {
    loginBtn.innerHTML = `<a  class="nav-item nav-link cursor-pointer" id="login">Login</a>`
}

logoutBtn.addEventListener('click', handleLogout);



const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('currentUser', currentUser)

// set current user to local strorage
const unsubscribe = auth.onAuthStateChanged(currentUser => {
    console.log(currentUser);
    if (currentUser?.uid) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
});
() => unsubscribe();


//user login by google
const googleButton = document.getElementById('googleButton')

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
googleButton.addEventListener('click', loginWithEmail)