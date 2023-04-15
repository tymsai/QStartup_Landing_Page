console.log('users menetor pannel js connected')



const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const id = currentUser._id
const UniqueId = currentUser.id
console.log('current user', currentUser)


// social media form
const socialMediaForm = document.querySelector('#socialMediaForm')
// console.log(socialMediaForm)

const loadCurrentUser = (_id) => {
    // console.log(id)
    fetch(`https://qstartupserver.onrender.com/SingleUser?id=${id}&&role=mentor`)
        .then(res => res.json())
        .then(data => {
            if (data[0].data.status === 'active') {
                document.getElementById('MentorshipStatusCheckbox').checked = true;
            } else {
                document.getElementById('MentorshipStatusCheckbox').checked = false;

            }
            displyStartUpsInformation(data[0])
            console.log('in function', data[0].data.status)
        })
    // console.log('load called')
}



const displyStartUpsInformation = (data) => {
    //     console.log('disply data', data)
    const mentorInfo = document.querySelector('#mentorInfoList')

    let mentorBrief = document.querySelector('#mentorBrief')
    mentorBrief.textContent = data?.data?.Brief_Mentor
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
                            <a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.facebook}">
                                <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.twitter}">
                                <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.instagram}">
                                <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
                            </a>
                           <a class="btn btn-linkedin btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.linkedin}">
    <i class="fab fa-linkedin fa-lg" aria-hidden="true"></i>
</a>
                        </li>
    `

    // set default valu of social media link
    for (const prop in data.data) {


        const socialMediaForm = document.getElementsByName(prop)[0];

        // console.log(socialMediaForm, prop)
        if (socialMediaForm) {
            socialMediaForm.value = data.data[prop];
        }
    }
    // console.log(data)


    // set default value of userStartupEditForm

    for (const prop in data.data) {

        const userStartupEditInput = document.getElementsByName(prop)[0];
        // console.log(userStartupEditInput, prop)
        if (userStartupEditInput) {
            userStartupEditInput.value = data.data[prop]
        }


    }





}


//  social media link save and update

socialMediaForm.addEventListener('submit', (event) => {
    event.preventDefault()


    const facebook = event.target.facebook.value;
    const twitter = event.target.twitter.value;
    const linkedin = event.target.linkedin.value;
    const instagram = event.target.instagram.value;
    const businessDocument = event.target.businessDocument.files[0];
    console.log(businessDocument)
    console.log('cons', facebook, twitter, linkedin, instagram)

    const formData = new FormData()
    // formData.delete('businessDocument');
    // const payload = Object.fromEntries(formData)
    // console.log(payload)


    formData.append('businessFile', businessDocument)
    formData.append('facebook', facebook)
    formData.append('twitter', twitter)
    formData.append('linkedin', linkedin)
    formData.append('instagram', instagram)


    fetch(`https://qstartupserver.onrender.com/socialMedia?id=${id}`, {
        method: 'PUT',
        body: formData
    })


        .then(res => res.json())
        .then(data => {
            console.log('data', data)



            document.querySelector('#input-Business_Documents').value = ''
            document.querySelector('.btn-facebook').href = data?.data?.data?.facebook;
            document.querySelector('.btn-twitter').href = data?.data?.data?.twitter;
            document.querySelector('.btn-linkedin').href = data?.data?.data?.linkedin;
            document.querySelector('.btn-instagram').href = data?.data?.data?.instagram;


            // show toast 
            console.log(data.status)
            Toastify({
                text: data.message,
                className: "info",
                position: 'center',
                style: {
                    background: data.status === 200 ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #FF0000, #FF0000)",
                    font: 'bold'


                },

            }).showToast();

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
// console.log(mentorTbody)

const displayAllStartUp = (startUps) => {

    startUps.forEach(startUp => {
        // console.log(startUp)
        const row = document.createElement('tr');
        row.innerHTML = ` 
                                            <td>${startUp.id}</td>
                                            <td> ${startUp.username}</td>
                                           <td style="color: ${startUp?.data?.status === 'active' ? 'green' : 'red'}"> ${startUp?.data?.status}</td>
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
    // console.log('payload', payload)

    // console.log(usersMentorEditForm)

    fetch(`https://qstartupserver.onrender.com/EditUser?id=${UniqueId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // show toast 

            Toastify({
                text: data.message,
                className: "info",
                position: 'center',
                style: {
                    background: data.status === 200 ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #FF0000, #FF0000)",
                    font: 'bold'


                },

            }).showToast();
        })

})

// send message
const mentorMessageForm = document.getElementById('mentorMessageForm')
// console.log(mentorMessageForm, 'mentorMessageForm')

mentorMessageForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const form = event.target;
    const subject = form.subject.value;
    const uniqueId = form.uniqueId.value;
    const message = form.message.value;

    const senderId = currentUser.id
    const msgBody = {
        subject,
        uniqueId,
        message,
        senderId
    }
    console.log(msgBody)

    const res = await fetch('https://qstartupserver.onrender.com/api/sendMessage', {

        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(msgBody)
    })
    const data = await res.json()
    console.log(data)

})

// load message
const loadMessageByUniqueId = () => {
    fetch(`https://qstartupserver.onrender.com/api/getMessage?uniqueId=${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            console.log('message', data)
            displayMessage(data.data)
        })
}

loadMessageByUniqueId()

const displayMessage = (data) => {
    const messageCard = document.getElementById('messageCard')
    console.log('data', data)
    data.message.forEach(message => {
        const div = document.createElement('div')
        console.log(message)
        div.innerHTML = `
        
         <div class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                            <div class="avatar me-3">
                                <!--------------------------------- MENTOR LOGO------------------------------------->
                                <img src=${message.senderImage}
                                    alt="kal" class="border-radius-lg shadow">
                            </div>

                            <div class="d-flex align-items-start flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${message.name}</h6>
                                <p class="text-xxs">${message.senderId}</p>
                                <p class="mb-0 text-xs">${message.message}</p>
                            </div>
                        </div>
                        <hr>
        `
        messageCard.appendChild(div)
    })
}

// MentorshipStatusCheckbox handle
const MentorshipStatusCheckbox = document.getElementById('MentorshipStatusCheckbox')

MentorshipStatusCheckbox.addEventListener('click', () => {

    console.log(MentorshipStatusCheckbox.checked)
    let status = 'active'
    if (MentorshipStatusCheckbox.checked === false) {
        status = 'inActive'
    }
    console.log(status)

    const mentor = {
        status, id: currentUser.id
    }
    fetch('https://qstartupserver.onrender.com/api/updateMentorStatus', {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
})
