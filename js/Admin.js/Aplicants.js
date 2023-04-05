console.log('applicants js connected')

const loadAllApplicants = () => {
    fetch('http://localhost:5000/api/applicants')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
}
loadAllApplicants()