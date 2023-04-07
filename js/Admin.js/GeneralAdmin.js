console.log('general connected')

const loadAllUser = () => {
    fetch('http://localhost:5000/user')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data) {


                let startUp = data.filter(user => user.role == 'startUp')
                console.log(startUp)

                let mentor = data.filter(user => user.role == 'mentor')
                console.log(mentor)

            }
        })
}
loadAllUser()