const startupForm = document.querySelector('.startupForm');
console.log(startupForm)
const imgbbKey = 'a95a8e5bfa79deda8fe4df67e21b4f26';
const fileInput = document.querySelector('#sturtupFile');

let imageurl;
startupForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(startupForm)
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