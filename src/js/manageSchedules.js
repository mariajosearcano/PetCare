//import { format } from "@formkit/tempo"
import { format } from 'https://cdn.jsdelivr.net/npm/@formkit/tempo@latest/dist/index.mjs';



// VARIABLES


// POST VARIABLES
var postForm = document.getElementById('postForm');
var datepair = new Datepair(postForm, {
    'defaultDateDelta': 5      // days
    // 'defaultTimeDelta': 7200000 // milliseconds
});

// PUT VARIABLES
var oldPutForm = {};
const formPutStartDay = document.getElementById('putStartDay');
const formPutEndDay = document.getElementById('putEndDay');
const formPutStartHour = document.getElementById('putStartHour');
const formPutEndHour = document.getElementById('putEndHour');



// EVENT LISTENERS

// document.addEventListener('DOMContentLoaded', function() {
//     const startDayInput = document.getElementById('postStartDay');
//     startDayInput.addEventListener('change', isMonday());
// });

document.addEventListener('DOMContentLoaded', function() {
    const visualizeButton = document.getElementById('btn-collapseGetSchedules');
    if (visualizeButton) {
        visualizeButton.addEventListener('click', function() {
            getSchedules();
        });
    }
});



//POST LOGIC

async function handlePostSubmit() {
    const postForm = document.getElementById('postForm');

    if (!postForm.checkValidity() || !isMonday()) {
        postForm.classList.add('was-validated');
        return;
    }

    const postFormData = {
        start_day: document.getElementById('postStartDay').value,
        end_day: document.getElementById('postEndDay').value,
        start_hour: document.getElementById('postStartHour').value,
        end_hour: document.getElementById('postEndHour').value
    };

    postSchedule(postFormData, postForm);
}

function isMonday() {
    const startDayInput = document.getElementById('postStartDay');
    const invalidFeedback = document.getElementById('postStartDayInvalidFeedback');

    var date = new Date(startDayInput.value + 'T00:00:00-05:00');
    var isValidMonday = date.getDay() === 1;

    if (!isValidMonday) {
        startDayInput.classList.add('is-invalid');
        // if (invalidFeedback) {
        //     invalidFeedback.style.display = 'block';
        // }
    } else {
        startDayInput.classList.remove('is-invalid');
        // if (invalidFeedback) {
        //     invalidFeedback.style.display = 'none';
        // }
    }

    return isValidMonday;
}

async function postSchedule(postFormData, postForm) {
    try {
        const response = await fetch('/postSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            body: JSON.stringify(postFormData)
        });

        const responseData = await response.json();

        if (response.ok) {
            postAlert(responseData.message);
            // postForm.reset();
            // postForm.classList.remove('was-validated');
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            postErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error submitting form", error);
        postErrorAlert();
    }
}



// GET LOGIC

async function getSchedules() {
    try {
        const response = await fetch('/getSchedules');
        const data = await response.json();
    
        if (!response.ok) {
            console.error("Error: " + (data.error || "An error occurred"));
            getErrorAlert(data.error);
        }
    
        const formatedData = formatData(data);
        populateTable(formatedData);
        collapse();
    } catch (error) {
        console.error("Error getting Schedules", error);
        getErrorAlert();
    }
}

function formatData(data){
    return data.map(item => ({
        ...item,
        start_day: format(new Date(item.start_day), 'YYYY-MM-DD'),
        end_day: format(new Date(item.end_day), 'YYYY-MM-DD'),
        start_hour: item.start_hour.substring(0, 5),  // Asegura formato HH:mm
        end_hour: item.end_hour.substring(0, 5)      // Asegura formato HH:mm
    }));
}

function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.schedule_id}</th>
        <td>${data.start_day}</td>
        <td>${data.end_day}</td>
        <td>${data.start_hour}</td>
        <td>${data.end_hour}</td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-info btn-lg edit-btn" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePutUser" aria-expanded="false"
                    aria-controls="collapsePutSchedule">
                    Edit
                </button>
            </p>
        </td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-danger btn-lg delete-btn" type="button" aria-expanded="false">
                    Delete
                </button>
            </p>
        </td>
    `;

    addEventListeners(data, row);

    return row;
}

function addEventListeners(data, row){
    const editButton = row.querySelector('.edit-btn');
    editButton.addEventListener('click', () => populateForm(data));
    const deleteButton = row.querySelector('.delete-btn');
    //deleteButton.addEventListener('click', () => deleteUser(data));
    deleteButton.addEventListener('click', () => deleteCancelAlert(data));
}

function populateTable(data) {

    const tableBody = document.getElementById('scheduleTableBody');
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = createTableRow({
            schedule_id: item.schedule_id,
            start_day: item.start_day,
            end_day: item.end_day,
            start_hour: item.start_hour,
            end_hour: item.end_hour
        });
        tableBody.appendChild(row);
    });
}



// PUT LOGIC

function populateForm(data){
    formPutStartDay.value = data.start_day;
    formPutEndDay.value = data.end_day;
    formPutStartHour.value = data.start_hour;
    formPutEndHour.value = data.end_hour;

    oldPutForm = {
        putScheduleId: data.schedule_id,
        putStartDay: data.start_day,
        putEndDay: data.end_day,
        putStartHour: data.start_hour,
        putEndHour: data.end_hour
    }
}

async function handlePutSubmit() {
    const putForm = document.getElementById('putForm');

    if (!putForm.checkValidity()) {
        putForm.classList.add('was-validated');
        return;
    }

    const putFormData = {
        start_day: formPutStartDay.value,
        end_day: formPutEndDay.value,
        start_hour: formPutStartHour.value,
        end_hour: formPutEndHour.value
    };

    putUser(putFormData, putForm);
}

async function putUser(putFormData, putForm) {
    try {
        const response = await fetch('/putSchedule', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            body: JSON.stringify({
                oldPutForm,
                putFormData
            })
        });

        const responseData = await response.json();
    
        if (response.ok) {
            putAlert(responseData.message);
            // putForm.reset();
            // putForm.classList.remove('was-validated');
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            putErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error updating Schedule", error);
        putErrorAlert();
    }
}



// DELETE LOGIC

async function deleteUser(data) {
    const url = chooseDeleteUrlByTable(data.table);

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            body: JSON.stringify({
                document: data.document
            })
        });

        const responseData = await response.json();
    
        if (response.ok) {
            deleteAlert(responseData.message);
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            deleteErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error('Error deleting user', error);
        deleteErrorAlert();
    }
}

function chooseDeleteUrlByTable(table){
    if (table == 'pet_owner'){
        return ('/deletePetOwner').toString(); 
    } else {
        return ('/deleteVeterinarian').toString(); 
    }
}



// COLLAPSE LOGIC

document.addEventListener('DOMContentLoaded', function() {
    collapse();
});

function collapse() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');

            collapseButtons.forEach(btn => {
                const otherTargetId = btn.getAttribute('data-bs-target');
                if (otherTargetId !== targetId) {
                    const collapseElement = document.querySelector(otherTargetId);
                    const collapse = bootstrap.Collapse.getInstance(collapseElement);
                    if (collapse) {
                        collapse.hide();
                    }
                }
            });
        });
    });
}



// JQUERY LOGIC

$('.form .date').datepicker({
    'format': 'yyyy-mm-dd',
    'autoclose': true,
    'startDate': '+1d',
    'daysOfWeekDisabled': [0, 2, 3, 4, 5, 6],
    'daysOfWeekHighlighted': [1]
})

$('.form .time').timepicker({
    // 'showDuration': true,
    'timeFormat': 'H:i',
    'step': 60
    // 'forceRoundTime': true
});



// ALERTS


//// POST ALERTS

function postAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "Schedule has been created",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function postCancelAlert(){
    Swal.fire({
        title: "The creation of a schedule was cancelled",
        allowOutsideClick: false
    });
};

function postErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error creating schedule",
        allowOutsideClick: false
    });
};


//// GET ALERTS

function getErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error getting Schedules",
        allowOutsideClick: false
    });
};


//// PUT ALERTS

function putAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "Schedule has been updated",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function putCancelAlert(){
    Swal.fire({
        title: "The update of a Schedule was cancelled",
        allowOutsideClick: false
    });
};

function putErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error updating Schedule",
        allowOutsideClick: false
    });
};


//// DELETE ALERTS

function deleteAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "Schedule has been deleted",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function deleteCancelAlert(data){
    Swal.fire({
        title: "Are you sure you want to delete the Schedule?",
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUser(data);
        };
    });
};

function deleteErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error deleting Schedule",
        allowOutsideClick: false
    });
};