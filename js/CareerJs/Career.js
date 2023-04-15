
console.log('career js connected')

const careerForm = document.querySelector('.careerForm');
console.log(careerForm)




// get the currently signed in user
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user)


const submitButton = document.getElementById('submitInput')
console.log(submitButton)

// submit handler
careerForm.addEventListener('submit', (event) => {
    event.preventDefault()


    submitButton.value = 'Applying...'


    const resume = event.target.resume.files[0]
    const cv = event.target.cv.files[0]

    const applicationFor = event.target.applicationFor.value;
    const FirstName = event.target.FirstName.value;
    const FamilyName = event.target.FamilyName.value;
    const citizenship = event.target.citizenship.value;
    const DateOfBirth = event.target.DateOfBirth.value;
    const address = event.target.address.value;
    const zipCode = event.target.zipCode.value;
    const city = event.target.city.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    console.log(resume, cv)
    const formData = new FormData()

    formData.append('resume', resume)
    formData.append('cv', cv)

    // const fields = Array.from(event.target.querySelectorAll('input:not([type="file"]), textarea, select'))
    // fields.forEach(field => {
    //     formData.append(field.name, field.value)
    // })
    formData.append('applicationFor', applicationFor)
    formData.append('FirstName', FirstName)
    formData.append('FamilyName', FamilyName)
    formData.append('citizenship', citizenship)
    formData.append('DateOfBirth', DateOfBirth)
    formData.append('address', address)
    formData.append('zipCode', zipCode)
    formData.append('city', city)
    formData.append('phone', phone)
    formData.append('email', email)




    // fetch(`https://qstartupserver.onrender.com/career`, {
    fetch(`https://qstartupserver.onrender.com/application`, {
        method: 'POST',

        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            submitButton.value = 'Submit application'
            Toastify({
                text: data.message,
                className: "info",
                position: 'center',
                style: {
                    background: data.success === true ? "linear-gradient(to right, #00b09b, #96c93d)" : 'red',
                },
            }).showToast();
            if (data.success === true) {

                careerForm.reset()
                submitButton.value = 'Applied'
            }
        })


});

