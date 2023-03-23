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
loadCurrentUser(id)

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
                            <a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                                <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                                <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                                <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
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
}


// // social media form
// const socialMediaForm = document.querySelector('#socialMediaForm')
// console.log(socialMediaForm)
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
        })

})