const inputName = document.getElementById('floatingName');
const selectSpecies = document.getElementById('selectSpecies');
const inputAge = document.getElementById('floatingAge');
const inputWeight = document.getElementById('floatingWeight');
const inputPhoto = document.getElementById('pet-photo');
const inputPetOwnerDcoument = document.getElementById('floating-pet-owner-document');

const registerButton = document.getElementById('btnRegisterPet');
const collapseButtonVisualize = document.getElementById('btn-collapse-visualize');
const deleteButton = document.getElementById('btn-delete-pet');

const tableBody = document.querySelector('#tbody-visualize-pet');

registerButton.addEventListener('click', InsertPet);

// INSERT
function InsertPet() {

    let pets = {    // los atributos deben coincidir con los nombres de las columnas en la tabla
        name: inputName.value,
        species: selectSpecies.options[selectSpecies.selectedIndex].text,
        age: inputAge.value,
        weight: inputWeight.value,
        photo: inputPhoto.value,
        pet_owner_document: inputPetOwnerDcoument.value
    };

    fetch('http://localhost:3007/pet/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pets)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    inputName.value = '';
    selectSpecies.selectedIndex = 0;
    inputAge.value = '';
    inputWeight.value = '';
    inputPhoto.value = '';
    inputPetOwnerDcoument.value = '';
}

// READ
collapseButtonVisualize.addEventListener('click', VisualizeData);

function VisualizeData() {
    fetch('http://localhost:3007/pet/read')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(pet => {
            AddPetRow(pet);
        });
        AddPetRow(data);
    });
}

function AddPetRow(pet) {
    const row = document.createElement('tr'); row.innerHTML = `
    <td>${pet.name}</td> 
    <td>${pet.species}</td> 
    <td>${pet.age}</td> 
    <td>${pet.weight}</td> 
    <td>${pet.photo}</td>
    <td>${pet.pet_owner_document}</td>
    `;
    tableBody.appendChild(row);
}

// DELETE
deleteButton.addEventListener('click', DeletePet);

function DeletePet() {
    let petName = inputName.value;

    fetch(`http://localhost:3007/pet/delete/${petName}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const row = document.querySelector(`
        #personasTable tr td:first-child:contains(${petName})`
        ).parentNode; 
        row.remove();
    });
}

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('personaForm');
//     const tableBody = document.querySelector('#personasTable tbody');

//     // Cargar todas las personas 
//     fetch('bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com:3306/person')
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(persona => {
//                 agregarPersonaATabla(persona);
//             });
//         });
        
//     // Guardar o actualizar persona 
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//         const id = document.getElementById('id').value;
//         const nombre = document.getElementById('nombre').value; const apellido = document.getElementById('apellido').value; const correo = document.getElementById('correo').value; const telefono = document.getElementById('telefono').value;
//         const persona = { nombre, apellido, correo, telefono };
//         if (id) {
//             // Actualizar persona 
//             fetch(`bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com:3306/personas/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(persona)
//             })
//                 .then(res => res.json())
//                 .then(() => {
//                     actualizarPersonaEnTabla(id, persona);
//                 } });
//     form.reset();
// });
//     } else {
//     // Crear nueva persona 
//     fetch('bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com:3306/personas', {
//     method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(persona)
// })
//         .then(res => res.json())
//     .then(persona => {
//         agregarPersonaATabla(persona);
//         form.reset();
//     });
// // Funciones para actualizar la tabla 
// function agregarPersonaATabla(persona) {
//     const row = document.createElement('tr'); row.innerHTML = `
//     <td>${persona.id}</td> <td>${persona.nombre}</td> <td>${persona.apellido}</td> <td>${persona.correo}</td> <td>${persona.telefono}</td> <td>
//     <button onclick="editarPersona(${persona.id})">Editar</button>
//     <button onclick="eliminarPersona(${persona.id})">Eliminar</button>
//     </td> `;
//     tableBody.appendChild(row);
// }
// function actualizarPersonaEnTabla(id, persona) {
//     const filas = tableBody.querySelectorAll('tr'); filas.forEach(fila => {
//         if (fila.firstElementChild.textContent == id) {
//             fila.children[1].textContent = persona.nombre; fila.children[2].textContent = persona.apellido; fila.children[3].textContent = persona.correo; fila.children[4].textContent = persona.telefono;
//         }
//     });
// }
    
//     });
// function editarPersona(id) {
//     fetch(`bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com:3306/personas/${id}`)
//         .then(res => res.json())
//         .then(persona => {
//             document.getElementById('id').value = persona.id; document.getElementById('nombre').value = persona.nombre; document.getElementById('apellido').value = persona.apellido; document.getElementById('correo').value = persona.correo; document.getElementById('telefono').value = persona.telefono;
//         });
// }
// function eliminarPersona(id) {
//     fetch(`bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com:3306/personas/${id}`, {
//         method: 'DELETE'
//     })
//         .then(() => {
//             const fila = document.querySelector(`#personasTable tr
//     td:first-child:contains(${id})`).parentNode; fila.remove();
//         });
// }
