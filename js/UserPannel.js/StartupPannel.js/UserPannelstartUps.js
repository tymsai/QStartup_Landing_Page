console.log('startups user pannet added')


const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const id = currentUser._id
const UniqueId = currentUser.id
// console.log('id', id)
console.log('current user', currentUser)


// social media form
const socialMediaForm = document.querySelector('#socialMediaForm')
// console.log(socialMediaForm)

const loadCurrentUser = (id) => {
    console.log(id)
    fetch(`https://qstartupserver.onrender.com/SingleUser?id=${id}&&role=startUp`) //https://qstartupserver.onrender.com/SingleUser?id=${id}&&role=startUp
        .then(res => res.json())
        .then(data => {
            if (data[0].data.status === 'active') {
                document.getElementById('MentorshipStatusCheckbox').checked = true;
            } else {
                document.getElementById('MentorshipStatusCheckbox').checked = false;

            }
            console.log('in function', data)
            displyStartUpsInformation(data[0])
        })
    // console.log('load called')
}

loadCurrentUser(id)

const displyStartUpsInformation = (data) => {
    console.log('disply data', data)
    const startupInfo = document.querySelector('#startupInfoList')
    const startupBrief = document.querySelector('#startupBrief')
    startupBrief.textContent = data?.data.Brief_StartUp

    startupInfo.innerHTML = `
     <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">
                                Unique ID:</strong> &nbsp;${data?.id} </li>

                                 <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong>
                            &nbsp; ${data?.data?.phone_StartUp}</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong>
                            &nbsp; ${data?.email}</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong>
                            &nbsp; ${data?.data?.state_StartUp} ,${data?.data?.City_StartUp}  </li>

                        <li class="list-group-item border-0 ps-0 pb-0">
                            <strong class="text-dark text-sm">Social:</strong> &nbsp;
                          ${data?.data?.facebook ? `  <a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.facebook}">
                                <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
                            </a>`: ""}
                           ${data?.data?.twitter ? `<a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.twitter}">
        <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>

                            </a >`: ""}


                           ${data?.data?.instagram ? ` <a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.instagram}">
                                <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
                            </a>`: ""}
                           <a class="btn btn-linkedin btn-simple mb-0 ps-1 pe-2 py-0" href="${data?.data?.linkdIn}">
    <i class="fab fa-linkedin fa-lg" aria-hidden="true"></i>
</a>
                        </li>
    `



    // set default valu of social media link
    for (const prop in data?.data) {


        const socialMediaForm = document.getElementsByName(prop)[0];

        // console.log(socialMediaForm, prop)
        if (socialMediaForm) {
            socialMediaForm.value = data.data[prop];
        }
    }
    console.log(data)


    // set default value of userStartupEditForm

    for (const prop in data?.data) {

        const userStartupEditInput = document.getElementsByName(prop)[0];
        // console.log(userStartupEditInput, prop)
        if (userStartupEditInput) {
            userStartupEditInput.value = data?.data[prop]
        }


    }





}


// // social media and business document link save and update

socialMediaForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const facebook = event.target.facebook.value;
    const twitter = event.target.twitter.value;
    const linkdIn = event.target.linkdIn.value;
    const instagram = event.target.instagram.value;
    const businessDocument = event.target.businessDocument.files[0];
    console.log(businessDocument)
    console.log('cons', facebook, twitter, linkdIn, instagram)

    const formData = new FormData()
    // formData.delete('businessDocument');
    const payload = Object.fromEntries(formData)
    console.log(payload)


    formData.append('businessFile', businessDocument)
    formData.append('facebook', facebook)
    formData.append('twitter', twitter)
    formData.append('linkdIn', linkdIn)
    formData.append('instagram', instagram)


    fetch(`https://qstartupserver.onrender.com/socialMedia?id=${id}`, {
        method: 'PUT',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log('respons', data.data.data)



            document.querySelector('#input-Business_Documents').value = ''
            document.querySelector('.btn-facebook').href = data?.data?.data?.facebook;
            document.querySelector('.btn-twitter').href = data?.data?.data?.twitter;
            document.querySelector('.btn-linkedin').href = data?.data?.data?.linkdIn;
            document.querySelector('.btn-instagram').href = data?.data?.data?.instagram;

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




// load all mentor
const loadAllmentor = () => {
    fetch('https://qstartupserver.onrender.com/admin/getAllStartUp?role=mentor')
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
    // console.log(mentorTbody)

    mentors.forEach(mentor => {
        const row = document.createElement('tr');
        row.innerHTML = ` 
                                            <td>${mentor?.id}</td>
                                            <td> ${mentor?.username}</td>
                                            <td style="color: ${mentor?.data?.status === 'active' ? 'green' : 'red'}"> ${mentor?.data?.status}</td>
                                           <td> ${mentor?.data.Phone_Mentor}</td>
                                            <td> ${mentor?.data.email_Mentor}</td>
                                         
                                      

`
        mentorTbody.appendChild(row)
    });


}


// Save the users startup edit details

const userStartupEditForm = document.querySelector('#userStartupEditForm')

userStartupEditForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(userStartupEditForm)
    formData.delete('bussinesDoucument');
    const payload = Object.fromEntries(formData)
    console.log(payload)

    console.log(userStartupEditForm)

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
const startUpmessageForm = document.getElementById('startUpmessageForm')
console.log(startUpmessageForm, 'startUpmessageForm')

startUpmessageForm.addEventListener('submit', async (event) => {
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
            console.log(data)
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
