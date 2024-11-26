import { format } from 'https://cdn.jsdelivr.net/npm/@formkit/tempo@latest/dist/index.mjs';



const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const selectSpecialty = document.getElementById('select-specialty');
const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');
const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

// agregar veterinarios al select
selectSpecialty.addEventListener('change', GetVets);

async function GetVets() {

    selectVeterinarian.innerHTML = '';  // limpiar select
    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    const urlString = (`/getVeterinarian/${specialty}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        data.forEach(vet => {
            AddVetOption(vet);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function AddVetOption(vet) {
    const option = document.createElement('option');
    option.textContent = vet.name;
    selectVeterinarian.appendChild(option);
}

selectVeterinarian.addEventListener('change', GetSchedules);

// agregar horarios al select
async function GetSchedules() {

    selectSchedule.innerHTML = '';  // limpiar select

    let name = selectVeterinarian.options[selectVeterinarian.selectedIndex].text;

    // fetch del veterinario para obtener el document
    const url2 = (`/getOneVeterinarian/${name}`).toString();

    try {
        const response = await fetch(url2);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        localStorage.setItem('vet_document', data[0].document);

    } catch (error) {
        console.error('Error:', error);
    }

    // fetch del horario segun el documento del vet
    let veterinarian_document = localStorage.getItem('vet_document');
    const urlString = (`getVetSchedule/${veterinarian_document}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        data.forEach(schedule => {
            AddScheduleOption(schedule);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function AddScheduleOption(schedule) {
    const option = document.createElement('option');
    option.textContent = (`${schedule.start_hour}-${schedule.end_hour}`).toString();
    selectSchedule.appendChild(option);
}

// agendar cita
// btnSchedule.addEventListener('click', ScheduleAppointment);

// async function ScheduleAppointment() {

//     let veterinarian_document = localStorage.getItem('vet_document');
//     let schedule = selectSchedule.options[selectSchedule.selectedIndex].text;

//     const data = {
//         veterinarian_document: veterinarian_document,
//         schedule: schedule
//     }

//     const url = '/scheduleAppointment';

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Error to get Pet Owners data');
//         }

//         alert('Appointment scheduled successfully');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }



// EVENT LISTENERS LOGIC

document.addEventListener('DOMContentLoaded', function() {
    collapse();

    const getButton = document.getElementById('getButton');
    getButton.addEventListener('click', getAppointmentsByDocument);

    const petFilter = document.getElementById('pet-filter');
    petFilter.addEventListener('change', filterTable);
});



// GET LOGIC

async function getAppointmentsByDocument() {
    try {
        const response = await fetch('/getAppointmentsByDocument');
        const data = await response.json();
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error: " + (errorData.message || "An error occurred"));
            getErrorAlert();
        }
    
        const formatedData = formatData(data);
        window.dataCache = formatedData;

        // Llenar el filtro de mascotas
        populatePetFilter(formatedData);

        populateTable(formatedData);
        collapse();
    } catch (error) {
        console.error("Error getting Appointments", error);
        getErrorAlert();
    }
}

function formatData(data){
    return data.map(item => ({
        ...item,
        day: format(new Date(item.day), 'YYYY-MM-DD'),
        start_hour: item.start_hour.substring(0, 5),  // Asegura formato HH:mm
        end_hour: item.end_hour.substring(0, 5)      // Asegura formato HH:mm
    }));
}

function populatePetFilter(data) {
    const petFilter = document.getElementById('pet-filter');
    petFilter.innerHTML = ''; // Limpiar opciones existentes

    // Agregar la opción "All" por defecto
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "All";
    defaultOption.value = "All";
    defaultOption.selected = true;
    petFilter.appendChild(defaultOption);

    // Extraer nombres únicos de mascotas
    // const petNames = [...new Set(data.map(pet => pet.name))];
    const petNames = data.map(pet => pet.name);

    // Agregar nombres de mascotas al filtro
    petNames.forEach(name => {
        const option = document.createElement('option');
        option.textContent = name;
        option.value = name;
        petFilter.appendChild(option);
    });
}

function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.appointment_id}</th>
        <td>${data.day}</td>
        <td>${data.start_hour}</td>
        <td>${data.end_hour}</td>
        <td>${data.name}</td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-danger btn-lg delete-btn" type="button" aria-expanded="false">
                    Cancel
                </button>
            </p>
        </td>
    `;

    addEventListeners(data, row);

    return row;
}

function addEventListeners(data, row){
    const deleteButton = row.querySelector('.delete-btn');
    //deleteButton.addEventListener('click', () => deleteUser(data));
    deleteButton.addEventListener('click', () => deleteCancelAlert(data));
}

function populateTable(data) {
    const id = 'getAppointmentTableBody';
    const tableBody = document.getElementById(id);
    const filterValue = document.getElementById("pet-filter").value;

    tableBody.innerHTML = '';

    data.forEach((item) => {
        const name = item.name;
        
        if (
            (filterValue === name) ||
            (filterValue === "All")
        ) {
            const row = createTableRow({
                appointment_id: item.appointment_id,
                day: item.day,
                start_hour: item.start_hour,
                end_hour: item.end_hour,
                name: item.name
            });
            tableBody.appendChild(row);
        }
    });
}

function filterTable() {
    if (window.dataCache) {
        populateTable(window.dataCache);
    }
}



// DELETE LOGIC

async function deleteAppointment(data) {
    try {
        const response = await fetch('/deleteAppointment', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            body: JSON.stringify({
                appointment_id: data.appointment_id
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
        console.error('Error deleting Appointment', error);
        deleteErrorAlert();
    }
}



// COLLAPSE LOGIC

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



// ALERTS

//// GET ALERTS

function getErrorAlert(){
    Swal.fire({
        icon: "error",
        title: "Error getting Appointments"
    });
};

//// DELETE ALERTS

function deleteAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "Appointment has been canceled",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function deleteCancelAlert(data){
    Swal.fire({
        title: "Are you sure you want to delete the Appointment?",
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            deleteAppointment(data);
        };
    });
};

function deleteErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error deleting Appointment",
        allowOutsideClick: false
    });
};


