console.log('Admins edit connected')

let queryString = window.location.search;

let urlParams = new URLSearchParams(queryString)

let id = urlParams.get('id')

console.log(id)