// insert
const inputName = document.getElementById('floatingName');
const selectSpecies = document.getElementById('select-species');
const inputAge = document.getElementById('floatingAge');
const inputWeight = document.getElementById('floatingWeight');
const inputPhoto = document.getElementById('pet-photo');
const inputPetOwnerDocument = document.getElementById('floating-pet-owner-document');
const selectNames = document.getElementById('select-name');

// buttons
const registerButton = document.getElementById('btnRegisterPet');

// validacion de campos
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

// INSERT

registerButton.addEventListener('click', async function(event) {
    event.preventDefault();  // Evita que se envíe el formulario si el botón no tiene tipo submit
    const form = document.getElementById('register-form');
    
    // Verifica si el formulario es válido antes de proceder con el registro
    if (form.checkValidity()) {
        // Llama a la función para registrar la mascota
        await InsertPet();
    } else {
        form.classList.add('was-validated');  // Agrega la clase para mostrar los errores
    }
});

async function InsertPet() {
    let pets = {    // los atributos deben coincidir con los nombres de las columnas en la tabla
        name: inputName.value,
        species: selectSpecies.options[selectSpecies.selectedIndex].text,
        age: inputAge.value,
        weight: inputWeight.value,
        photo: inputPhoto.value,    // modificarlo para que sea un archivo
        pet_owner_document: inputPetOwnerDocument.value
    };

    const urlString = ('/postPet').toString();  // url de router.js

    try {
        const response = await fetch(urlString, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pets)
        });

        if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        postAlert();

    } catch (error) {
        console.error('Error:', error);
        alert('There was no possible to register the pet');
    }
}

// control collapse
document.addEventListener('DOMContentLoaded', function () {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');

    collapseButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Obtener el ID del colapso que se va a abrir
            const targetId = this.getAttribute('data-bs-target');

            // Cerrar otros colapsos
            collapseButtons.forEach(btn => {
                const otherTargetId = btn.getAttribute('data-bs-target');
                if (otherTargetId !== targetId) {
                    const collapseElement = document.querySelector(otherTargetId);
                    const collapse = bootstrap.Collapse.getInstance(collapseElement);
                    if (collapse) {
                        collapse.hide(); // Cerrar el colapso
                    }
                }
            });
        });
    });
});


// collapse 2 (para el manage pet)
function collapse() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');

    collapseButtons.forEach(button => {
        button.addEventListener('click', function () {
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



// VARIABLES

//// UPDATE
var oldPutForm = {};
const formName = document.getElementById('name-update');
const formSpecies = document.getElementById('select-species-update');
const formAge = document.getElementById('age-update');
const formWeight = document.getElementById('weight-update');
const formPhoto = document.getElementById('photo-update');



//UPDATE LOGIC

async function getPetsAndPetOwners(url) {
    const urlString = (url).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            console.error("Error: " + (data.error || "An error occurred"));
            getPetsAndPetOwnersErrorAlert(data.error);
        }

        populateTable(data, urlString);
        collapse();
    } catch (error) {
        console.error("Error getting pets and pet owners", error);
        getPetsAndPetOwnersErrorAlert();
    }
}

function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.pet_id}</th>
        <td>${data.name}</td>
        <td>${data.species}</td>
        <td>${data.age}</td>
        <td>${data.weight}</td>
        <td></td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-info btn-lg edit-btn" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseUpdatePet" aria-expanded="false"
                    aria-controls="collapseUpdatePet">
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

function addEventListeners(data, row) {
    const editButton = row.querySelector('.edit-btn');
    editButton.addEventListener('click', () => populateForm(data));
    const deleteButton = row.querySelector('.delete-btn');
    //deleteButton.addEventListener('click', () => deleteUser(data));
    deleteButton.addEventListener('click', () => deleteCancelAlert(data));
}

function populateTable(data, url) {
    const id = 'tbody-update-pet';

    const tableBody = document.getElementById(id);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = createTableRow({
            pet_id: item.pet_id,
            name: item.name,
            species: item.species,
            age: item.age,
            weight: item.weight
            //photo: item.photo
        });
        tableBody.appendChild(row);
    });
}

function populateForm(data) {
    formName.value = data.name;
    formSpecies.value = data.species;
    formAge.value = data.age;
    formWeight.value = data.weight;
    //formPhoto.value = data.photo;

    oldPutForm = {
        putPetId: data.pet_id,
        putName: data.name,
        putSpecies: data.species,
        putAge: data.age,
        putWeight: data.weight,
        //putPhoto: data.photo,
        pet_owner_document: data.pet_owner_document
    }
}

async function handlePutSubmit() {
    const putForm = document.getElementById('putForm');

    if (!putForm.checkValidity()) {
        putForm.classList.add('was-validated');
        return;
    }

    const putFormData = {
        name: formName.value,
        species: formSpecies.value,
        age: formAge.value,
        weight: formWeight.value,
        //photo: formPhoto.value
    };

    putPet(putFormData, putForm);
}

async function putPet(putFormData, putForm) {
    try {
        const response = await fetch('/putPet', {
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
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            putErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error updating pet", error);
        putErrorAlert();
    }
}



// DELETE LOGIC

async function deletePet(data) {
    const url = '/deletePet';

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            body: JSON.stringify({
                pet_id: data.pet_id
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
        console.error('Error deleting pet', error);
        deleteErrorAlert();
    }
}



// ALERTS

//// GET ALERTS

function getPetsAndPetOwnersErrorAlert(message) {
    Swal.fire({
        icon: "error",
        title: message || "Error getting pets and pet owners",
        allowOutsideClick: false
    });
};

//// PUT ALERTS

function putAlert(message) {
    Swal.fire({
        icon: "success",
        title: message || "Pet has been updated",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(true);
        }
    });
};

function putCancelAlert() {
    Swal.fire({
        title: "The update of a pet was cancelled",
        allowOutsideClick: false
    });
};

function putErrorAlert(error) {
    Swal.fire({
        icon: "error",
        title: error || "Error updating pet",
        allowOutsideClick: false
    });
};

//// DELETE ALERTS

function deleteAlert(message) {
    Swal.fire({
        icon: "success",
        title: message || "Pet has been deleted",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function deleteCancelAlert(data) {
    Swal.fire({
        title: "Are you sure you want to delete the pet?",
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            deletePet(data);
        };
    });
};

function deleteErrorAlert(error) {
    Swal.fire({
        icon: "error",
        title: error || "Error deleting pet",
        allowOutsideClick: false
    });
};

// post

function postAlert() {
    Swal.fire({
        icon: "success",
        title: "Pet has been created"
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(true);
        }
    });
};
