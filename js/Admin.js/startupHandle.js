console.log('startupHandle.js')

const LocalCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(LocalCurrentUser)
if (!LocalCurrentUser || LocalCurrentUser.role !== 'admin') {
    window.location.href = '/index.html'
}



const loadStartUp = () => {


    fetch('https://qstartupserver.onrender.com/admin/getAllStartUp?role=startUp')
        .then(res => res.json())
        .then(data => {
            disPlayStartUp(data)
            console.log(data)
        })

}


const disPlayStartUp = (startUpData) => {
    const tbody = document.querySelector('#tbody')
    tbody.innerHTML = ``;
    // console.log(startUpData)
    startUpData.forEach((startUp, index) => {

        const row = document.createElement('tr');
        row.setAttribute('data-id', startUp._id)
        row.innerHTML = `
                  <td >${index}</td>
                  <td style="width: 50px">${startUp.data.startupName}</td>

                  <td>${startUp.data.sturtupPhone}</td>
                  <td data-searchable="true">${startUp.data.email}</td>
                  <td>${startUp.username}</td>
                  <td class='text-center'>

                    <a id="editButton" onClick="handleEdit('${startUp._id}')"  class="">
                          <i class="fa fa-edit"></i>
                    </a>
                    <span  class="text-danger" id="delete"  onclick="handleDelete('${startUp._id}')" >
                           <i class="fa fa-remove"></i>
                     </span>
                 </td>
        `
        tbody.appendChild(row)


    })
    console.log(startUpData)


}

// delete functionality here
const deleteButton = document.querySelector("#delete");
console.log(deleteButton)
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


// calling the loadStartUp function.
loadStartUp()

// edit functionality here

const handleEdit = (id) => {
    console.log('edit clicked', id)
    window.location.href = "Edit.html?id=" + id
}






// // _________sort by name____________

// // Function to handle sorting by startup name
// const handleNameSort = () => {
//     const nameHeader = freshTable.querySelector('[data-field="startupName"]');
//     nameHeader.addEventListener('click', () => {
//         const sortedData = startupData.sort((a, b) => {
//             const aName = a.data.startupName.toLowerCase();
//             const bName = b.data.startupName.toLowerCase();
//             return aName.localeCompare(bName);
//         });
//         disPlayStartUp(sortedData);
//     });
// }












// $(document).ready(function () {
//     $('#fresh-table').DataTable();
// });

var $table = $('#fresh-table')
var $alertBtn = $('#alertBtn')

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row))
        console.log(value, row, index)
    },
    'click .edit': function (e, value, row, index) {
        alert('You click edit icon, row: ' + JSON.stringify(row))
        console.log(value, row, index)
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

function operateFormatter(value, row, index) {
    return [
        '<a rel="tooltip" title="Like" class="table-action like" href="javascript:void(0)" title="Like">',
        '<i class="fa fa-heart"></i>',
        '</a>',
        '<a rel="tooltip" title="Edit" class="table-action edit" href="javascript:void(0)" title="Edit">',
        '<i class="fa fa-edit"></i>',
        '</a>',
        '<a rel="tooltip" title="Remove" class="table-action remove" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-remove"></i>',
        '</a>'
    ].join('')
}

$(function () {
    $table.bootstrapTable({
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

        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return ''
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rows visible'
        }
    })

    $alertBtn.click(function () {
        alert('You pressed on Alert')
    })
})

