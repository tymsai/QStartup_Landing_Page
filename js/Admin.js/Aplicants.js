console.log('applicants js connected')

const loadAllApplicants = () => {
    fetch('http://localhost:5000/api/applicants')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayApplicants(data)
        })
        .catch(error => {
            console.log(error)
        })
}
loadAllApplicants()

const displayApplicants = (applicants) => {
    console.log(applicants)

    const aplicantTbody = document.querySelector('#aplicantTbody')

    const row = document.createElement('tr')

    row.innerHTML = `
    
   
                  <td>Sai</td>
                  <td>
                    <i class="fa fa-download" aria-hidden="true"></i>
                    <i style="margin-left: 1rem;" class="fa fa-times" aria-hidden="true"></i>
                  </td>
                  <td>Frontend Developer</td>
                  <td>25/12/1991</td>
               
              
    `

    aplicantTbody.appendChild(row)
    console.log(aplicantTbody)

}