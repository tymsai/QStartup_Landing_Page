
console.log('career js connected')

const careerForm = document.querySelector('.careerForm');
console.log(careerForm)




// get the currently signed in user
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user)




// submit handler
careerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const resume = event.target.resume.files[0]
    const cv = event.target.cv.files[0]
    console.log(resume, cv)
    const formData = new FormData()

    formData.append('resume', resume)
    formData.append('cv', cv)


    // fetch(`http://localhost:5000/career`, {
    fetch(`http://localhost:5000/application`, {
        method: 'POST',

        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })


});

