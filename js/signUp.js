console.log('js connected')
// firebaseTag


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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



    // Sign the user up with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            console.log("Signed up successfully with UID:", user.uid);
        })
        .catch((error) => {
            // Handle errors here
            console.log(error)
        });









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

// login, logout  button get by Id
const loginBtn = document.getElementById("login")
const logoutBtn = document.getElementById("logout")

const accessToken = localStorage.getItem('accessToken')
console.log(accessToken)


// conditional rendering of login and log out button
{
    loginBtn.innerHTML = accessToken ? `<a onClick="handleLogout()" class="nav-item nav-link" id="login">Logout</a>`
        :
        `<a onClick="handleLogout()" class="nav-item nav-link" id="login">Login</a>`
}

// handle logout function.
const handleLogout = () => {
    localStorage.removeItem('accessToken')
    console.log('clicked')
}