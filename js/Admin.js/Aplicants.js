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



    applicants.forEach(applicant => {
        const row = document.createElement('tr')

        row.innerHTML = `
    
   
                  <td >${applicant.name}</td>
                  <td>
                   <span onClick="downloadPdf('${applicant.resume}','${applicant.name}')" > <i class="fa fa-download" aria-hidden="true"></i> </span>
                   
                   
                  <span onClick="deletePdf('${applicant.resume}')">  <i style="margin-left: 1rem;" class="fa fa-times" aria-hidden="true"></i> </span>
                  </td>
                 
                  <td>${applicant.applicationFor}</td>
                  <td>${applicant.date}</td>
               
              
    `
        aplicantTbody.appendChild(row)
        console.log(aplicantTbody)




    });

}

const downloadPdf = (path, name) => {


    console.log(path)

    fetch(`https://qstartupserver.onrender.com/downloadPdf?path=${path}`, {
        method: "GET",
        credentials: "include"
    })
        .then(response => response.blob())
        .then(blob => {
            console.log(blob)
            const url = URL.createObjectURL(blob);
            console.log(url)
            const a = document.createElement('a');
            a.href = url;
            a.download = name + "_resume" + '.pdf';
            a.click();
        });

}


const deletePdf = (resumePath) => {
    console.log('delte hit', resumePath)

    fetch(`http://localhost:5000/api/deletePdf?path=${resumePath}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        },

    })
}