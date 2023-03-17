console.log('startupHandle.js')


const loadStartUp = () => {


    fetch('http://localhost:5000/admin/getAllStartUp?role=startUp')
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
        row.innerHTML = `
                  <td >${index}</td>
                  <td>${startUp.data.startupName}</td>
                  <td>${startUp.data.sturtupPhone}</td>
                  <td>${startUp.username}</td>
                  <td>${startUp.data.sturtupPhone}</td>
                  <td>${startUp.data.sturtupPhone}</td>
                  <td class=''> 
                    <a rel="tooltip" title="Like" class="table-action like" href="javascript:void(0)" title="Like">
                         <i class="fa fa-heart"></i>
                    </a>
                    <a rel="tooltip" title="Edit" class="table-action edit" href="javascript:void(0)" title="Edit">
                          <i class="fa fa-edit"></i>
                    </a>
                    <a rel="tooltip" title="Remove" class="table-action remove" href="javascript:void(0)" title="Remove">
                           <i class="fa fa-remove"></i>
                     </a>
                 </td>
        `
        tbody.appendChild(row)

        // console.log(startUp.data.Address)
        // let row = tbody.insertRow();
        // let serial = row.insertCell();
        // let startUpName = row.insertCell();
        // let seria = row.insertCell();
        // let phone = row.insertCell();
        // let email = row.insertCell();
        // let usernametd = row.insertCell();
        // let Industry = row.insertCell();
        // let city = row.insertCell();
        // // let serial = row.insertCell();
        // serial.innerHTML = `${index}`
        // startUpName.innerHTML = `${startUp.data.startupName}`
        // phone.innerHTML = `${startUp.data.sturtupPhone}`
        // email.innerHTML = `${startUp.data.email}`
        // usernametd.innerHTML = `${startUp.username}`


    })
    console.log(startUpData)


}
// calling the loadStartUp function.
loadStartUp()

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

$('#sharrreTitle').sharrre({
    share: {
        twitter: true,
        facebook: true
    },
    template: '',
    enableHover: false,
    enableTracking: true,
    render: function (api, options) {
        $("#sharrreTitle").html('Thank you for ' + options.total + ' shares!')
    },
    enableTracking: true,
    url: location.href
})

$('#twitter').sharrre({
    share: {
        twitter: true
    },
    enableHover: false,
    enableTracking: true,
    buttons: { twitter: { via: 'CreativeTim' } },
    click: function (api, options) {
        api.simulateClick()
        api.openPopup('twitter')
    },
    template: '<i class="fa fa-twitter"></i> {total}',
    url: location.href
})

$('#facebook').sharrre({
    share: {
        facebook: true
    },
    enableHover: false,
    enableTracking: true,
    click: function (api, options) {
        api.simulateClick()
        api.openPopup('facebook')
    },
    template: '<i class="fa fa-facebook-square"></i> {total}',
    url: location.href
})