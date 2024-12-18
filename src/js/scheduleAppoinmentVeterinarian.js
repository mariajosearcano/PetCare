import { format } from 'https://cdn.jsdelivr.net/npm/@formkit/tempo@latest/dist/index.mjs';



// EVENT LISTENERS LOGIC

document.addEventListener('DOMContentLoaded', function() {
    collapse();

    const getButton = document.getElementById('getButton');
    getButton.addEventListener('click', getAppointmentsByVeterinarian);

    const petFilter = document.getElementById('pet-filter');
    petFilter.addEventListener('change', filterTable);
});



// GET LOGIC

async function getAppointmentsByVeterinarian() {
    try {
        const response = await fetch('/getAppointmentsByVeterinarian');
        const data = await response.json();
    
        if (!response.ok) {
            console.error("Error: " + (data.message || "An error occurred"));
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

    const petIds = [...new Set(data.map(pet => pet.pet_id))];

    petIds.forEach(pet_id => {
        const option = document.createElement('option');
        option.textContent = pet_id;
        option.value = pet_id;
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
        <td>${data.pet_id}</td>
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
        const pet_id = item.pet_id;
        
        if (
            (filterValue == pet_id) ||
            (filterValue === "All")
        ) {
            const row = createTableRow({
                appointment_id: item.appointment_id,
                day: item.day,
                start_hour: item.start_hour,
                end_hour: item.end_hour,
                pet_id: item.pet_id,
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
            },
            body: JSON.stringify({
                appointment_id: data.appointment_id
            })
        });

        const responseData = await response.json();
    
        if (response.ok) {
            deleteAlert(responseData.message);
        }
        else {
            // Si hay un error, maneja el mensaje según la lógica del backend
            console.error("Error: " + responseData.error);
            if (responseData.error.includes("Cancellation must be made no more than 24 hours")) {
                HoursAlert();
            } else {
                deleteErrorAlert(responseData.error);
            }
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
