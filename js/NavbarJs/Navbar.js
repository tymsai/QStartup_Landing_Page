console.log('navbar js connected')

const LocalCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(LocalCurrentUser)
if (LocalCurrentUser) {
    document.querySelector('#logout').style.display = 'block'

}

else {
    document.querySelector('#login').style.display = 'block'

}

if (LocalCurrentUser.role == 'mentor' || 'startup') {
    document.querySelector('#Register').style.display = 'none'
}
if (LocalCurrentUser.role === 'mentor' || 'startup' || 'mentor') {
    document.querySelector('#dashboard').style.display = 'block'
}

const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/login.html'

}

const handleDashboard = () => {
    if (LocalCurrentUser.role == 'user') {
        window.location.href = '/registration.html'
    }
    if (LocalCurrentUser.role == 'startUp') {
        window.location.href = '/userPanel/startupPanel/index.html'
    } else if (LocalCurrentUser.role == 'mentor') {
        window.location.href = '/userPanel/mentorPanel/index.html'
    } else if (LocalCurrentUser.role == 'admin') {
        window.location.href = '/admin/index.html'
    }
}