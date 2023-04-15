console.log('applicants js connected')

const LocalCurrentUser1 = JSON.parse(localStorage.getItem('currentUser'))
console.log(LocalCurrentUser1)
if (!LocalCurrentUser1 || LocalCurrentUser1.role !== 'admin') {
    window.location.href = '/index.html'
}


const loadAllApplicants = () => {
    fetch('https://qstartupserver.onrender.com/api/applicants')
        .then(res => res.json())
        .then(data => {
            console.log('data', data)
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
        row.setAttribute('data-id', applicant.email)
        row.innerHTML = `
    
   
                  <td >${applicant.name}</td>
                  <td >${applicant.email}</td>

              

                 <td  id="${applicant.resume}">

                 ${applicant.resume ? `<div>
                <span onClick="downloadPdf('${applicant.resume}','${applicant.email}')" > <i class="fa fa-download" aria-hidden="true"></i> </span>
                <span onClick="deletePdf('${applicant.resume}' ,'${applicant.email}')">  <i style="margin-left: 1rem;" class="fa fa-times" aria-hidden="true"></i> </span>
            </div>` : `<div> deleted</div>`}
              
                  </td>
                 <td  id="${applicant.cv}">

                 ${applicant.cv ? `<div>
                <span onClick="downloadPdf('${applicant.cv}','${applicant.email}')" > <i class="fa fa-download" aria-hidden="true"></i> </span>
                <span onClick="deletePdf('${applicant.cv}' ,'${applicant.email}')">  <i style="margin-left: 1rem;" class="fa fa-times" aria-hidden="true"></i> </span>
            </div>` : `<div> deleted</div>`}
              
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
            a.download = name + "_resume_cv" + '.pdf';
            a.click();
        });

}


const deletePdf = (resumePath, name) => {
    console.log('delte hit', resumePath)

    fetch(`https://qstartupserver.onrender.com/api/deletePdf?path=${resumePath}&&for=applicant`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        },

    })
        .then(res => res.json())
        .then(data => {

            const deletedRow = document.querySelector(`tr[data-id="${name}"]`)
            if (data.resumeDeleted === true) {
                const thirdTd = deletedRow.querySelector('td:nth-child(3)');
                thirdTd.textContent = 'deleted'
            }

            else if (data.DocDelete) {
                const deletedRow = document.querySelector(`tr[data-id="${name}"]`)
                deletedRow.remove()
            } else {
                const fourthTd = deletedRow.querySelector('td:nth-child(4)');
                fourthTd.textContent = 'deleted'
                console.log(data)

            }

            Toastify({
                text: data.message,
                className: "info",
                position: 'center',
                style: {
                    background: data.success === true ? "linear-gradient(to right, #00b09b, #96c93d)" : 'red',
                },
            }).showToast();

        })
}