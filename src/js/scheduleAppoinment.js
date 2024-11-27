import { format } from 'https://cdn.jsdelivr.net/npm/@formkit/tempo@latest/dist/index.mjs';



const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const selectSpecialty = document.getElementById('select-specialty');
const selectDate = document.getElementById('select-date');
const selectPet = document.getElementById('select-pet');

const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');

// agregar mascotas al select
btnCollapseSchedule.addEventListener('click', () => {
    fillSelectPet();
});

async function GetPets() {

    const urlString = (`/getPet`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fillSelectPet() {

    // limpiar el select
    selectPet.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Pet *';
    selectPet.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const pets = await GetPets();
        pets.forEach(pet => {
            const option = document.createElement('option');
            option.textContent = (`${pet.name}`).toString();
            selectPet.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// guardar pet_id
selectPet.addEventListener('change', async () => {
    try {
        const petId = await GetPetId(); // Espera el resultado de la promesa
        localStorage.setItem('pet_id', petId);
    } catch (error) {
        console.error('Error al obtener el pet_id:', error);
    }
});

async function GetPetId() {
    let pet = selectPet.options[selectPet.selectedIndex].text;

    const urlString = (`/getPetId/${pet}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet id');
        }

        return data.pet_id;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// agregar dias al select
selectSpecialty.addEventListener('change', () => {
    fillSelectDate();
});

async function GetDates() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    const urlString = (`/getDayBySpecialty/${specialty}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fillSelectDate() {

    // limpiar el select
    selectDate.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Date *';
    selectDate.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const dates = await GetDates();
        dates.forEach(date => {
            const option = document.createElement('option');
            option.textContent = date.day.split("T")[0];
            selectDate.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// agregar horarios al select
selectDate.addEventListener('change', () => {
    fillSelectSchedule();
});

async function GetSchedules() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    let day = selectDate.options[selectDate.selectedIndex].text;

    const urlString = (`/getScheduleByDay/${specialty}/${day}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        localStorage.setItem('end_hour', data[0].end_hour);

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fillSelectSchedule() {

    // limpiar el select
    selectSchedule.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Schedule *';
    selectSchedule.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const schedules = await GetSchedules();
        schedules.forEach(schedule => {
            const option = document.createElement('option');
            option.textContent = (`${schedule.start_hour}`).toString();
            selectSchedule.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

// agregar veterinarios al select
selectSchedule.addEventListener('change', () => {
    fillSelectVeterinarian();
});

async function GetVeterinarians() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    let day = selectDate.options[selectDate.selectedIndex].text;

    let start_hour = selectSchedule.options[selectSchedule.selectedIndex].text;

    const urlString = (`/getVeterinarian/${specialty}/${day}/${start_hour}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        localStorage.setItem('available_id', data[0].available_id);

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fillSelectVeterinarian() {

    // limpiar el select
    selectVeterinarian.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Veterinarian *';
    selectVeterinarian.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const veterinarians = await GetVeterinarians();
        veterinarians.forEach(veterinarian => {
            const option = document.createElement('option');
            option.textContent = (`${veterinarian.name} ${veterinarian.last_name}`).toString();
            selectVeterinarian.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

// agendar cita
btnSchedule.addEventListener('click', async (event) => {
    if (await Postvalidation(event) == false) {
        return;
    }
    postAppointment();
});

async function Postvalidation(event) {
    event.preventDefault();  // Evita que se envíe el formulario por defecto
    const form = document.getElementById('register-form');

    if (form.checkValidity()) {
        return true;
    } else {
        form.classList.add('was-validated');  // Agrega la clase para mostrar los errores
        return false;
    }
}

async function postAppointment() {

    let day = selectDate.options[selectDate.selectedIndex].text;
    let start_hour = selectSchedule.options[selectSchedule.selectedIndex].text;
    let end_hour = localStorage.getItem('end_hour');
    let pet_id = localStorage.getItem('pet_id');
    let available_id = localStorage.getItem('available_id');

    const data = {
        day,
        start_hour,
        end_hour,
        pet_id,
        available_id
    }

    const urlString = ('/postAppointment').toString();

    try {
        const response = await fetch(urlString, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error to schedule appointment');
        }

        postAlert();
    } catch (error) {
        console.error('Error:', error);
    }
}

// alerts
function postAlert() {
    Swal.fire({
        icon: "success",
        title: "The appointment has been scheduled"
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(true);
        }
    });
};

// cerrar collapse

btnCancel.addEventListener('click', () => {
    selectPet.selectedIndex = 0;
    selectSpecialty.selectedIndex = 0;
    selectDate.selectedIndex = 0;
    selectSchedule.selectedIndex = 0;
    selectVeterinarian.selectedIndex = 0;

    const form = document.getElementById('register-form');
    form.classList.remove('was-validated');

    // cerrar collapse
    const collapseElement = document.getElementById('collapse-schedule-appointment');
    const collapse = bootstrap.Collapse.getInstance(collapseElement);
    collapse.hide();
});

// EVENT LISTENERS LOGIC

document.addEventListener('DOMContentLoaded', function() {
    collapse();

    const getButton = document.getElementById('getButton');
    getButton.addEventListener('click', getAppointmentsByPetOwner);

    const petFilter = document.getElementById('pet-filter');
    petFilter.addEventListener('change', filterTable);
});



// GET LOGIC

async function getAppointmentsByPetOwner() {
    try {
        const response = await fetch('/getAppointmentsByPetOwner');
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
