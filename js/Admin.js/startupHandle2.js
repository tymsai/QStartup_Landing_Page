
const LocalCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(LocalCurrentUser)
if (!LocalCurrentUser || LocalCurrentUser.role !== 'admin') {
    window.location.href = '/index.html'
}


// Fetch data from backend
fetch('https://qstartupserver.onrender.com/admin/getAllStartUp?role=startUp')
    .then(response => response.json())
    .then(data => {
        // Get table body element
        console.log(data)
        const tbody = document.querySelector('#tbody');

        // Loop through data and create table rows
        data.forEach((startUp, index) => {
            // Create new row element
            const row = document.createElement('tr');
            row.setAttribute('data-id', startUp?.id);

            // Create and append cells to the row
            const indexCell = document.createElement('td');
            indexCell.textContent = index + 1;
            row.appendChild(indexCell);
            const idCell = document.createElement('td');
            idCell.textContent = startUp?.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = startUp?.data?.startupName
                ;
            row.appendChild(nameCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = startUp?.data.phone_StartUp;
            row.appendChild(phoneCell);



            const emailCell = document.createElement('td');
            emailCell.textContent = startUp?.email;
            row.appendChild(emailCell);



            // Create the actions cell
            const actionsCell = document.createElement('td');

            // Set the inner HTML content of the actions cell
            actionsCell.innerHTML = `
    <a id="editButton" onClick="handleEdit('${startUp?._id}')" class="">
        <i class="fa fa-edit"></i>
    </a>
    <span class="text-danger" id="delete" onclick="handleDelete('${startUp?.id}')">
        <i class="fa fa-remove"></i>
    </span>
`;

            row.appendChild(actionsCell)
            // Append the new row to the table body
            tbody.appendChild(row);
        });

        // Initialize the DataTable
        $('#fresh-table').bootstrapTable('destroy').bootstrapTable({
            classes: 'table table-hover table-striped',
            toolbar: '.toolbar',
            search: true,
            showRefresh: true,
            showToggle: true,
            showColumns: true,
            pagination: true,
            striped: true,
            sortable: true,
            pageSize: 8,
            pageList: [8, 10, 25, 50, 100],



            // -----------
            // other options...
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            paginationPreText: 'Previous',
            paginationNextText: 'Next',
            paginationHAlign: 'right',
            paginationDetailHAlign: 'left',
            paginationShowPageGo: true,
            paginationTrimType: 'middle',
            showPaginationSwitch: true,
            // --------


            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return ''
            },
            formatRecordsPerPage: function (pageNumber) {
                return pageNumber + ' rows visible'
            }
        });
    })
    .catch(error => console.error(error));




window.operateEvents = {
    'click #editButton': function (e, value, row, index) {


    },
    'click .edit': function (e, value, row, index) {

    },
    'click #delete': function (e, value, row, index) {

    }
}

function operateFormatter(value, row, index) {
    return [
        ` <a id="editButton"  onClick="handleEdit('${row.id}')" >
              <i class="fa fa-edit"></i>
           </a>
           <span class="text-danger" id="delete" onclick="handleDelete('${row?.id}')" >
              <i class="fa fa-remove"></i>
           </span>`
    ].join('')
}



const handleEdit = (id) => {
    console.log(id)
    window.location.href = `/admin/Edit.html?id=${id}`
}


const handleDelete = (id) => {
    console.log('delete clicked', id)
    fetch(`https://qstartupserver.onrender.com/userDelete/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },

    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const deletedRow = document.querySelector(`tr[data-id="${id}"]`)
            if (deletedRow) {
                deletedRow.remove()
            }

        })


}