console.log('general connected')
const LocalCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(LocalCurrentUser)
if (!LocalCurrentUser || LocalCurrentUser.role !== 'admin') {
    window.location.href = '/index.html'
}

const AllSignUp = document.getElementById('signUp')
const AllStartUp = document.getElementById('startUp')
const AllMentor = document.getElementById('mentor')
const registerd = document.getElementById('registerd')
const Allsubscribed = document.getElementById('subscribed')

const copyText = document.getElementById('copyText')

const loadAllUser = () => {
    fetch('https://qstartupserver.onrender.com/user')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data) {


                let startUp = data.filter(user => user.role == 'startUp')
                console.log(startUp)

                let mentor = data.filter(user => user.role == 'mentor')
                console.log(mentor)
                let subscribedUsers = data.filter(user => user.subscribe === true)
                console.log('subscribedUsers', subscribedUsers)

                AllSignUp.textContent = data.length;
                AllStartUp.textContent = startUp.length;
                AllMentor.textContent = mentor.length;
                registerd.textContent = mentor.length + startUp.length;
                Allsubscribed.textContent = subscribedUsers.length;

                // subscribedUsers.map(subscribedUser => {
                //     copyText.textContent = subscribedUser.email
                // })

                const emails = data.map(user => user.email)
                const emailString = emails.join(", ")
                copyText.textContent = emailString

            }
        })
}
loadAllUser()