console.log('js connected')
// firebaseTag


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

    const user = {
        username, email, password, confirmpassword
    }



    // Sign Up with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {

            const user = result.user;
            console.log('user', user);
            localStorage.setItem('email', user.email)
            form.reset()
            // window.location.href = '/index.html'
        })
        .catch((error) => {

            console.log(error)
        });

    // calling the logOUt function
    // calling the save user to database function
    // console.log(user)
    // saveUserToDatabase(user)
    //     .then(data => {
    //         console.log(data)
    //         localStorage.setItem('accessToken', data.token);

    //     })
    //     .catch(error => console.log(error))

}

// -save user to data base function
const saveUserToDatabase = async (user) => {
    const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data;
}


const loginBtn = document.getElementById("login")
console.log(loginBtn)
const logoutBtn = document.getElementById("logout")
const accessToken = localStorage.getItem('accessToken')
const LocalCurrentUser = localStorage.getItem('currentUser')
const email = localStorage.getItem('email')
console.log(accessToken)


const handleLogout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('currentUser')
            console.log('signOut')
        })
        .catch(error => { console.log(error) })
    console.log('clicked')
}

if (LocalCurrentUser) {
    logoutBtn.innerHTML = `<a  class="nav-item nav-link" id="login">Logout</a>`


} else {
    loginBtn.innerHTML = `<a  class="nav-item nav-link" id="login">Login</a>`
}
// loginBtn.addEventListener('click', handleLogout);
logoutBtn.addEventListener('click', handleLogout);

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('currentUser', currentUser)

// set current user
const unsubscribe = auth.onAuthStateChanged(currentUser => {
    console.log(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
});

// unsubscribe when component unmounts
() => unsubscribe();



const googleButton = document.getElementById('googleButton')
//use login by google
const loginWithEmail = () => {

    return signInWithPopup(auth, googleProvider)
}
googleButton.addEventListener('click', loginWithEmail)