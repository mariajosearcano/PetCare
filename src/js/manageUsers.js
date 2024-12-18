// VARIABLES

//// PUT VARIABLES

////// PET OWNER
const putDocumentPetOwner = document.getElementById('putDocumentPetOwner');
const putNamePetOwner = document.getElementById('putNamePetOwner');
const putLastNamePetOwner = document.getElementById('putLastNamePetOwner');
const putEmailPetOwner = document.getElementById('putEmailPetOwner');
const putPasswordPetOwner = document.getElementById('putPasswordPetOwner');
const putPhoneNumberPetOwner = document.getElementById('putPhoneNumberPetOwner');

////// VETERINARIAN
const putDocumentVeterinarian = document.getElementById('putDocumentVeterinarian');
const putNameVeterinarian = document.getElementById('putNameVeterinarian');
const putLastNameVeterinarian = document.getElementById('putLastNameVeterinarian');
const putEmailVeterinarian = document.getElementById('putEmailVeterinarian');
const putPasswordVeterinarian = document.getElementById('putPasswordVeterinarian');
const putPhoneNumberVeterinarian = document.getElementById('putPhoneNumberVeterinarian');
const putSpecialtyVeterinarian = document.getElementById('putSpecialtyVeterinarian');


// POST LOGIC

//// POST PET OWNER
async function handlePostSubmitPetOwner() {
    const postFormPetOwner = document.getElementById('postFormPetOwner');

    if (!postFormPetOwner.checkValidity()) {
        postFormPetOwner.classList.add('was-validated');
        return;
    }

    let postFormDataPetOwner = {
        document: document.getElementById('postDocumentPetOwner').value,
        name: document.getElementById('postNamePetOwner').value,
        last_name: document.getElementById('postLastNamePetOwner').value,
        email: document.getElementById('postEmailPetOwner').value,
        password: document.getElementById('postPasswordPetOwner').value,
        phone_number: document.getElementById('postPhoneNumberPetOwner').value
    };

    await postPetOwner(postFormDataPetOwner);
}

async function postPetOwner(postFormDataPetOwner) {
    try {
        const response = await fetch('/postPetOwner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormDataPetOwner)
        });

        const responseData = await response.json();

        if (response.ok) {
            postAlert(responseData.message);
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            postErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error submitting form", error);
        postErrorAlert();
    }
}

//// POST VETERINARIAN

async function handlePostSubmitVeterinarian() {
    const postFormVeterinarian = document.getElementById('postFormVeterinarian');

    if (!postFormVeterinarian.checkValidity()) {
        postFormVeterinarian.classList.add('was-validated');
        return;
    }

    let postFormDataVeterinarian = {
        document: document.getElementById('postDocumentVeterinarian').value,
        name: document.getElementById('postNameVeterinarian').value,
        last_name: document.getElementById('postLastNameVeterinarian').value,
        email: document.getElementById('postEmailVeterinarian').value,
        password: document.getElementById('postPasswordVeterinarian').value,
        phone_number: document.getElementById('postPhoneNumberVeterinarian').value,
        specialty: document.getElementById('postSpecialtyVeterinarian').value
    };

    await postVeterinarian(postFormDataVeterinarian);
}

async function postVeterinarian(postFormDataVeterinarian) {
    try {
        const response = await fetch('/postVeterinarian', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormDataVeterinarian)
        });

        const responseData = await response.json();

        if (response.ok) {
            postAlert(responseData.message);
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

//// GET PET OWNERS
async function getPetOwners() {
    try {
        const response = await fetch('/getPetOwners');
        const data = await response.json();
    
        if (!response.ok) {
            console.error("Error: " + (data.error || "An error occurred"));
            getErrorAlert(data.error);
        }
    
        populateTablePetOwner(data);
        collapse();
    } catch (error) {
        console.error("Error getting Pet Owners", error);
        getErrorAlert();
    }
}

function createTableRowPetOwner(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.document}</th>
        <td>${data.name}</td>
        <td>${data.last_name}</td>
        <td>${data.email}</td>
        <td>${data.phone_number}</td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-info btn-lg edit-btn-pet-owner" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePutPetOwner" aria-expanded="false"
                    aria-controls="collapsePutPetOwner">
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

    addEventListenersPetOwner(data, row);

    return row;
}

function addEventListenersPetOwner(data, row){
    const editButton = row.querySelector('.edit-btn-pet-owner');
    editButton.addEventListener('click', () => populateFormPetOwner(data));
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteCancelAlertPetOwner(data));
}

function populateTablePetOwner(data) {
    const tableBody = document.getElementById('petOwnerTableBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = createTableRowPetOwner({
            document: item.document,
            name: item.name,
            last_name: item.last_name,
            email: item.email,
            phone_number: item.phone_number
        });

        tableBody.appendChild(row);
    });
}

//// GET VETERINARIANS
async function getVeterinarians() {
    try {
        const response = await fetch('/getVeterinarians');
        const data = await response.json();

        if (!response.ok) {
            console.error("Error: " + (data.error || "An error occurred"));
            getErrorAlert(data.error);
        }

        populateTableVeterinarian(data);
        collapse();
    } catch (error) {
        console.error("Error getting Veterinarians", error);
        getErrorAlert();
    }
}

function createTableRowVeterinarian(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.document}</th>
        <td>${data.name}</td>
        <td>${data.last_name}</td>
        <td>${data.email}</td>
        <td>${data.phone_number}</td>
        <td>${data.specialty}</td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-info btn-lg edit-btn-veterinarian" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePutVeterinarian" aria-expanded="false"
                    aria-controls="collapsePutVeterinarian">
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

    addEventListenersVeterinarian(data, row);

    return row;
}

function addEventListenersVeterinarian(data, row){
    const editButton = row.querySelector('.edit-btn-veterinarian');
    editButton.addEventListener('click', () => populateFormVeterinarian(data));
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteCancelAlertVeterinarian(data));
}

function populateTableVeterinarian(data) {
    const tableBody = document.getElementById('veterinarianTableBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = createTableRowVeterinarian({
            document: item.document,
            name: item.name,
            last_name: item.last_name,
            email: item.email,
            phone_number: item.phone_number,
            specialty: item.specialty
        });

        tableBody.appendChild(row);
    });
}


// PUT LOGIC

//// PUT PET OWNER
function populateFormPetOwner(data){
    putDocumentPetOwner.value = data.document;
    putNamePetOwner.value = data.name;
    putLastNamePetOwner.value = data.last_name;
    putEmailPetOwner.value = data.email;
    putPhoneNumberPetOwner.value = data.phone_number;

    let putFormDataPetOwner = {
        oldDocument: data.document
    }

    addEventListenerPetOwner(putFormDataPetOwner);
}

function addEventListenerPetOwner(putFormDataPetOwner) {
    const editButton = document.getElementById('edit-btn-pet-owner');
    editButton.addEventListener('click', () => handlePutSubmitPetOwner(putFormDataPetOwner));
}

async function handlePutSubmitPetOwner(putFormDataPetOwner) {
    const putFormPetOwner = document.getElementById('putFormPetOwner');

    if (!putFormPetOwner.checkValidity()) {
        putFormPetOwner.classList.add('was-validated');
        return;
    }

    putFormDataPetOwner.document = putDocumentPetOwner.value;
    putFormDataPetOwner.name = putNamePetOwner.value;
    putFormDataPetOwner.last_name = putLastNamePetOwner.value;
    putFormDataPetOwner.email = putEmailPetOwner.value;
    putFormDataPetOwner.password = putPasswordPetOwner.value;
    putFormDataPetOwner.phone_number = putPhoneNumberPetOwner.value;

    await putPetOwner(putFormDataPetOwner);
}

async function putPetOwner(putFormDataPetOwner) {
    try {
        const response = await fetch('/putPetOwner', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putFormDataPetOwner)
        });

        const responseData = await response.json();

        if (response.ok) {
            putAlert(responseData.message);
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            putErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error updating Pet Owner", error);
        putErrorAlert();
    }
}

//// PUT VETERINARIAN
function populateFormVeterinarian(data){
    putDocumentVeterinarian.value = data.document;
    putNameVeterinarian.value = data.name;
    putLastNameVeterinarian.value = data.last_name;
    putEmailVeterinarian.value = data.email;
    putPhoneNumberVeterinarian.value = data.phone_number;
    putSpecialtyVeterinarian.value = data.specialty;

     let putFormDataVeterinarian = {
        oldDocument: data.document
    }

    addEventListenerVeterinarian(putFormDataVeterinarian);
}

function addEventListenerVeterinarian(putFormDataVeterinarian) {
    const editButton = document.getElementById('edit-btn-veterinarian');
    editButton.addEventListener('click', () => handlePutSubmitVeterinarian(putFormDataVeterinarian));
}

async function handlePutSubmitVeterinarian(putFormDataVeterinarian) {
    const putFormVeterinarian = document.getElementById('putFormVeterinarian');

    if (!putFormVeterinarian.checkValidity()) {
        putFormVeterinarian.classList.add('was-validated');
        return;
    }

    putFormDataVeterinarian.document = putDocumentVeterinarian.value;
    putFormDataVeterinarian.name = putNameVeterinarian.value;
    putFormDataVeterinarian.last_name = putLastNameVeterinarian.value;
    putFormDataVeterinarian.email = putEmailVeterinarian.value;
    putFormDataVeterinarian.password = putPasswordVeterinarian.value;
    putFormDataVeterinarian.phone_number = putPhoneNumberVeterinarian.value;
    putFormDataVeterinarian.specialty = putSpecialtyVeterinarian.value;

    await putVeterinarian(putFormDataVeterinarian);
}

async function putVeterinarian(putFormDataVeterinarian) {
    try {
        const response = await fetch('/putVeterinarian', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putFormDataVeterinarian)
        });

        const responseData = await response.json();

        if (response.ok) {
            putAlert(responseData.message);
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            putErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error updating Veterinarian", error);
        putErrorAlert();
    }
}


// DELETE LOGIC

//// DELETE PET OWNER
async function deletePetOwner(data) {
    try {
        const response = await fetch('/deletePetOwner', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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
        console.error('Error deleting Pet Owner', error);
        deleteErrorAlert();
    }
}

//// DELETE VETERINARIAN
async function deleteVeterinarian(data) {
    try {
        const response = await fetch('/deleteVeterinarian', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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


// collapse buttons logic

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



// ALERTS


//// POST ALERTS

function postAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "User has been created",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function postCancelAlert(){
    Swal.fire({
        title: "The creation of a user was cancelled",
        allowOutsideClick: false
    });
};

function postErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error creating user",
        allowOutsideClick: false
    });
};


//// GET ALERTS

function getErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error getting users",
        allowOutsideClick: false
    });
};


//// PUT ALERTS

function putAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "User has been updated",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function putCancelAlert(){
    Swal.fire({
        title: "The update of a user was cancelled",
        allowOutsideClick: false
    });
};

function putErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error updating user",
        allowOutsideClick: false
    });
};


//// DELETE ALERTS

function deleteAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "User has been deleted",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function deleteCancelAlertPetOwner(data){
    Swal.fire({
        title: "Are you sure you want to delete the Pet Owner?",
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            deletePetOwner(data);
        };
    });
};

function deleteCancelAlertVeterinarian(data){
    Swal.fire({
        title: "Are you sure you want to delete the Veterinarian?",
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            deleteVeterinarian(data);
        };
    });
};

function deleteErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error deleting user",
        allowOutsideClick: false
    });
};


