// insert
const inputName = document.getElementById('floatingName');
const selectSpecies = document.getElementById('select-species');
const inputAge = document.getElementById('floatingAge');
const inputWeight = document.getElementById('floatingWeight');
const inputPhoto = document.getElementById('pet-photo');
const inputPetOwnerDocument = document.getElementById('floating-pet-owner-document');
const selectNames = document.getElementById('select-name');

// update and delete
const selectNameUpdate = document.getElementById('select-name-update');
const inputNameUpdate = document.getElementById('floating-name-update');
const selectSpeciesUpdate = document.getElementById('select-species-update');
const inputAgeUpdate = document.getElementById('floating-age-update');
const inputWeightUpdate = document.getElementById('floating-weight-update');
const inputPhotoUpdate = document.getElementById('pet-photo-update');
const inputPetOwnerDocumentUpdate = document.getElementById('floating-pet-owner-document-update');

// buttons
const collapseButtonVisualize = document.getElementById('btn-collapse-visualize');
const collapseButtonUpdate = document.getElementById('btn-collapse-update');
const registerButton = document.getElementById('btnRegisterPet');
const deleteButton = document.getElementById('btn-delete-pet');
const updateButton = document.getElementById('btn-update-pet');

const tableBody = document.querySelector('#tbody-visualize-pet');

// INSERT
registerButton.addEventListener('click', InsertPet);

async function InsertPet() {
    let pets = {    // los atributos deben coincidir con los nombres de las columnas en la tabla
        name: inputName.value,
        species: selectSpecies.options[selectSpecies.selectedIndex].text,
        age: inputAge.value,
        weight: inputWeight.value,
        photo: inputPhoto.value,    // modificarlo para que sea un archivo
        pet_owner_document: inputPetOwnerDocument.value
    };

    const urlString = ('/getPets').toString();

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
        alert('Pet registered successfully');
    } catch (error) {
        console.error('Error:', error);
        alert('There was no possible to register the pet');
    }

    inputName.value = '';
    selectSpecies.selectedIndex = 0;
    inputAge.value = '';
    inputWeight.value = '';
    inputPhoto.value = '';
    inputPetOwnerDocument.value = '';
}

// filter pet by name
collapseButtonVisualize.addEventListener('click', GetNames(selectNames));
collapseButtonUpdate.addEventListener('click', GetNames(selectNameUpdate));

async function GetNames(selectElement) {

    const urlString = ('/getPets').toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach(pet => {
            AddPetOption(pet, selectElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function AddPetOption(pet, selectElement) {
    const option = document.createElement('option');
    option.textContent = pet.name;
    selectElement.appendChild(option);
}

// READ
collapseButtonVisualize.addEventListener('click', VisualizeData);

async function VisualizeData() {
    const urlString = ('/getPets').toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach(pet => {
            AddPetRow(pet);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function AddPetRow(pet) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${pet.pet_id}</td>
    <td>${pet.name}</td> 
    <td>${pet.species}</td> 
    <td>${pet.age}</td> 
    <td>${pet.weight}</td> 
    <td>${pet.photo}</td>   
    <td>${pet.pet_owner_document}</td>
    `;
    tableBody.appendChild(row);
}

// selectNameUpdate.addEventListener('change', updateForm);

// function updateForm() {
//     let name = selectNameUpdate.options[selectNameUpdate.selectedIndex].text;

//     fetch(`http://localhost:3007/pet/read/${name}`)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('Network error: ' + res.statusText);
//             }
//             return res.json();
//         })
//         .then(data => {

//             // update form
//             inputNameUpdate.value = data.name;
//             inputAgeUpdate.value = data.age;
//             inputWeightUpdate.value = data.weight;
//             inputPetOwnerDocumentUpdate.value = data.pet_owner_document;

//             // store pet_id de la mascota seleccionada
//             localStorage.setItem('pet_id', data.pet_id.toString());

//             // update select
//             const speciesValue = data.species;

//             // Encuentra la opción en el select que tiene el valor correspondiente
//             const options = selectSpeciesUpdate.options;
//             for (let i = 0; i < options.length; i++) {
//                 if (options[i].value === speciesValue) {
//                     selectSpeciesUpdate.selectedIndex = i;
//                     break;
//                 }
//             }
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//             console.error('There was no possible to fetch the pet');
//         });
// }

// // UPDATE
// updateButton.addEventListener('click', UpdatePet);

// function UpdatePet() {
//     let pets = {
//         name: inputNameUpdate.value,
//         species: selectSpeciesUpdate.options[selectSpeciesUpdate.selectedIndex].text,
//         age: inputAgeUpdate.value,
//         weight: inputWeightUpdate.value,
//         photo: inputPhotoUpdate.value,   // revisar
//         pet_owner_document: inputPetOwnerDocumentUpdate.value
//     };

//     console.log(pets);

//     let pet_id = parseInt(localStorage.getItem('pet_id'));
//     console.log(pet_id);

//     fetch(`http://localhost:3007/pet/put/${pet_id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(pets)
//     })
//         .then(res => {
//             console.log('Respuesta del servidor:', res);
//             if (!res.ok) {
//                 throw new Error('Network error: ' + res.statusText);
//             }
//             return res.json();
//         })
//         .then(data => {
//             console.log(data);
//             alert('Pet updated successfully');
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//             alert('There was no possible to update the pet');
//         });
// }

// // DELETE
deleteButton.addEventListener('click', DeletePet);

async function DeletePet() {
    const urlString = ('/delePets').toString();

    try {
        const confirm = prompt('Please type "yes" to confirm the deletion of the pet');

        if (confirm !== 'yes') {
            return;
        }

        let name = selectNameUpdate.options[selectNameUpdate.selectedIndex].text;

        const res = await fetch(`${urlString}/${name}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }

        const data = await res.json();
        console.log(data);
        alert('Pet deleted successfully');
        await GetNames(selectNames);
        await GetNames(selectNameUpdate);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was no possible to delete the pet');
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
