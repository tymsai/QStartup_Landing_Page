console.log('users menetor pannel js connected')



const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const id = currentUser._id
console.log('current user', currentUser)


// social media form
const socialMediaForm = document.querySelector('#socialMediaForm')
console.log(socialMediaForm)

const loadCurrentUser = (_id) => {
    console.log(id)
    fetch(`https://qstartupserver.onrender.com/SingleUser?id=${id}&&role=mentor`)
        .then(res => res.json())
        .then(data => {
            displyStartUpsInformation(data[0])
            console.log('in function', data)
        })
    console.log('load called')
}



const displyStartUpsInformation = (data) => {
    //     console.log('disply data', data)
    const mentorInfo = document.querySelector('#mentorInfoList')
    mentorInfo.innerHTML = `
     <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">
                                Unique ID:</strong> &nbsp;${data.id} </li>

                                 <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong>
                            &nbsp; ${data.data.Phone_Mentor}</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong>
                            &nbsp; ${data.email}</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong>
                            &nbsp; ${data.data.state_Mentor} ,${data.data.City_Mentor}  </li>

                        <li class="list-group-item border-0 ps-0 pb-0">
                            <strong class="text-dark text-sm">Social:</strong> &nbsp;
                            <a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="${data.socialMedalLink.facebook}">
                                <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="${data.socialMedalLink.twitter}">
                                <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="${data.socialMedalLink.instagram}">
                                <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
                            </a>
                           <a class="btn btn-linkedin btn-simple mb-0 ps-1 pe-2 py-0" href="${data.socialMedalLink.linkedin}">
    <i class="fab fa-linkedin fa-lg" aria-hidden="true"></i>
</a>
                        </li>
    `

    // set default valu of social media link
    for (const prop in data.socialMedalLink) {


        const socialMediaForm = document.getElementsByName(prop)[0];

        console.log(socialMediaForm, prop)
        if (socialMediaForm) {
            socialMediaForm.value = data.socialMedalLink[prop];
        }
    }
    console.log(data)


    // set default value of userStartupEditForm

    for (const prop in data.data) {

        const userStartupEditInput = document.getElementsByName(prop)[0];
        console.log(userStartupEditInput, prop)
        if (userStartupEditInput) {
            userStartupEditInput.value = data.data[prop]
        }


    }





}


//  social media link save and update

socialMediaForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(socialMediaForm)
    formData.delete('bussinesDoucument');
    const payload = Object.fromEntries(formData)
    console.log(payload)

    fetch(`https://qstartupserver.onrender.com/socialMedia?id=${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('.btn-facebook').href = payload.facebook;
            document.querySelector('.btn-twitter').href = payload.twitter;
            document.querySelector('.btn-linkedin').href = payload.linkedin;
            document.querySelector('.btn-instagram').href = payload.instagram;

        })

})
loadCurrentUser(id)



// load all mentor
const loadAllmentor = () => {
    fetch('https://qstartupserver.onrender.com/admin/getAllStartUp?role=startUp')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayAllStartUp(data)
        })
}
loadAllmentor()

// display mentor list 
const mentorTbody = document.querySelector('#tbody')
console.log(mentorTbody)

const displayAllStartUp = (startUps) => {

    startUps.forEach(startUp => {
        console.log(startUp)
        const row = document.createElement('tr');
        row.innerHTML = ` 
                                            <td>${startUp.id}</td>
                                            <td> ${startUp.username}</td>
                                            <td> ${`status`}</td>
                                            <td> ${startUp.data.phone_StartUp}</td>
                                            <td> ${startUp.data.email_StartUp}</td>



`
        mentorTbody.appendChild(row)
    });


}


// Save the users mentor edit details

const usersMentorEditForm = document.querySelector('#usersMentorEditForm')


usersMentorEditForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('clicked')
    const formData = new FormData(usersMentorEditForm)
    formData.delete('Photo');
    const payload = Object.fromEntries(formData)
    console.log('payload', payload)

    console.log(usersMentorEditForm)

    fetch('https://qstartupserver.onrender.com/registration', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

})