console.log('startups user pannet added')


const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const id = currentUser._id
console.log('current user', currentUser)

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
    console.log(data)
    const startupInfo = document.querySelector('#startupInfoList')
    startupInfo.innerHTML = `
     <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">
                                Unique ID:</strong> &nbsp; </li>

                                 <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong>
                            &nbsp; 987654321</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong>
                            &nbsp; xyz@gmail.com</li>

                        <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong>
                            &nbsp; State & City</li>

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


    console.log(data)
}