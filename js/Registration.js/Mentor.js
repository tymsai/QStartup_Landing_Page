console.log('registration js connected')
const form = document.querySelector('.form');
const imgbbKey = 'a95a8e5bfa79deda8fe4df67e21b4f26';
const fileInput = document.querySelector('input[type="file"]');

let imageurl;
console.log(imageurl)

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    formData.delete('Photo');
    const payload = Object.fromEntries(formData)
    const mentor = { ...payload, imageurl }


    console.log(imageurl, mentor)




});
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // handle response data here
            imageurl = data.data.url;
        })
        .catch(error => {
            console.error(error);
            // handle error here
        });
});
// ----------------------------------------------



// const imageUpload = async () => {

//     const file = fileInput.files[0];
//     const formData = new FormData();
//     formData.append('image', file);

//     fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // handle response data here
//         })
//         .catch(error => {
//             console.error(error);
//             // handle error here
//         });
// }


// const formData = new FormData(form)
    // const data = Object.fromEntries(formData)
    // console.log(data)


    // const apiKey = 'a95a8e5bfa79deda8fe4df67e21b4f26';

    // const url = 'https://api.imgbb.com/1/upload';

    // const file = formData.get('Photo');
    // console.log(file)
    // const blob = file.slice(0, file.size, file.type);



    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${apiKey}`
    //     },
    //     body: blob
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data); // the uploaded image data
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });


    // // Rest of your code here
    // const mentorName = document.querySelector('input[name="FirstName"]').value;
    // // const email = document.querySelector('input[name="Email"]').value;
    // const phone = document.querySelector('input[name="Phone"]').value;
    // const state = document.querySelector('input[name="Citizenship"]').value;
    // const city = document.querySelector('input[name="City"]').value;
    // const linkedin = document.querySelector('input[name="Linkedin URL"]').value;
    // const activeMonths = document.querySelector('input[name="activeMonths"]').value;
    // const brief = document.querySelector('input[name="Brief"]').value;
    // const industry = document.querySelector('input[name="industry"]').value;
    // const sector = document.querySelector('input[name="Sector"]').value;
    // const interests = document.querySelector('input[name="interests"]').value;
    // const companyLogo = document.querySelector('select[name="compnyLogo"]').value;
    // const startupStage = document.querySelector('select[name="startupStage"]').value;
    // const network = document.querySelector('select[name="network"]').value;
    // const tieEmail = document.querySelector('input[name="tieEmail"]').value;
    // const tiePassword = document.querySelector('input[name="tiePassword"]').value;
    // const startupName = document.querySelector('input[name="startup Name"]').value;
    // const startupURL = document.querySelector('input[name="startup URL"]').value;
    // const briefTagline = document.querySelector('input[name="briefTagline"]').value;
    // const mentor = {
    //     mentorName, phone, state, city, linkedin, activeMonths, brief, industry, sector,
    //     interests, companyLogo, startupStage, network, tieEmail, tiePassword, startupName, startupURL,
    //     briefTagline
    // }

    // console.log(mentor)