console.log('startups user pannet added')


const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const id = currentUser._id
console.log('current user', currentUser)


// social media form
const socialMediaForm = document.querySelector('#socialMediaForm')
console.log(socialMediaForm)

const loadCurrentUser = (id) => {
    console.log(id)
    fetch(`http://localhost:5000/user?id=${id}`)
        .then(res => res.json())
        .then(data => {
            displyStartUpsInformation(data[0])
            console.log('in function', data)
        })
    console.log('load called')
}



const displyStartUpsInformation = (data) => {
    console.log('disply data', data)
    const startupInfo = document.querySelector('#startupInfoList')
    startupInfo.innerHTML = `
     <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">
                                Unique ID:</strong> &nbsp;${data.id} </li>

                                 <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong>
                            &nbsp; ${data.data.phone_StartUp}</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong>
                            &nbsp; ${data.email}</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong>
                            &nbsp; ${data.data.state_StartUp} ,${data.data.City_StartUp}  </li>

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
                           <a class="btn btn-linkedin btn-simple mb-0 ps-1 pe-2 py-0" href="${data.socialMedalLink.linkdIn}">
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


// // social media link save and update

socialMediaForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(socialMediaForm)
    formData.delete('bussinesDoucument');
    const payload = Object.fromEntries(formData)
    console.log(payload)

    fetch(`http://localhost:5000/socialMedia?id=${id}`, {
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
            document.querySelector('.btn-linkedin').href = payload.linkdIn;
            document.querySelector('.btn-instagram').href = payload.instagram;

        })

})
loadCurrentUser(id)



// load all mentor
const loadAllmentor = () => {
    fetch('https://qstartup-server.vercel.app/admin/getAllStartUp?role=mentor')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayAllMentor(data)
        })
}
loadAllmentor()

// display mentor list 

const displayAllMentor = (mentors) => {
    const mentorTbody = document.querySelector('#tbody')
    console.log(mentorTbody)

    mentors.forEach(mentor => {
        const row = document.createElement('tr');
        row.innerHTML = ` 
                                            <td>${mentor.id}</td>
                                            <td> ${mentor.username}</td>
                                            <td> ${`status`}</td>
                                            <td> ${mentor.data.Phone_Mentor}</td>
                                            <td> ${mentor.data.email_Mentor}</td>
                                         
                                      

`
        mentorTbody.appendChild(row)
    });


}
