
// onclick functions

async function getUsers(url) {
    const urlString = (url).toString();

    try {
      const response = await fetch(urlString);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Error to get Pet Owner data');
      }
  
      populateTable(data, urlString);
      collapse();
    } catch (error) {
      console.error('Error:', error);
    }
}

// function chooseUrl(rol){
//     if (rol == 'Pet Owner'){
//         return ('/getPetOwners').toString(); // Replace with your actual endpoint URL
//     } else {
//         return ('/getVeterinarians').toString(); // Replace with your actual endpoint URL
//     }
// }

// other functions

    // Function to create a new table row
function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.document}</th>
        <td>${data.name}</td>
        <td>${data.last_name}</td>
        <td>${data.email}</td>
        <td>${data.phone_number}</td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-info btn-lg edit-btn" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePutUser" aria-expanded="false"
                    aria-controls="collapsePutUser">
                    Edit
                </button>
            </p>
        </td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-danger btn-lg" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseVisualizeVeterinarians" aria-expanded="false"
                    aria-controls="collapseVisualizeVeterinarians">
                    Delete
                </button>
            </p>
        </td>
    `;

    const editButton = row.querySelector('.edit-btn');
    editButton.addEventListener('click', () => populateForm(data));

    return row;
}

    // Function to populate the table
function populateTable(data, url) {
    const id = chooseId(url);
    const table = chooseTable(url);

    const tableBody = document.getElementById(id);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = createTableRow({
            document: item.document,
            name: item.name,
            last_name: item.last_name,
            email: item.email,
            phone_number: item.phone_number,
            table: table
        });
        tableBody.appendChild(row);
    });
}

function chooseId(url){
    if (url == '/getPetOwners'){
        return ('petOwnerTableBody').toString();
    } else {
        return ('veterinarianTableBody').toString();
    }
}

function chooseTable(url) {
    if (url == '/getPetOwners'){
        return ('pet_owner').toString();
    } else {
        return ('veterinarian').toString();
    }
}

function populateForm(data){
    const putDocument = document.getElementById('putDocument');
    const putName = document.getElementById('putName');
    const putLastName = document.getElementById('putLastName');
    const putEmail = document.getElementById('putEmail');
    const putPhoneNumber = document.getElementById('putPhoneNumber');

    putDocument.value = data.document;
    putName.value = data.name;
    putLastName.value = data.last_name;  
    putEmail.value = data.email;
    putPhoneNumber.value = data.phone_number;
}



document.addEventListener('DOMContentLoaded', function() {
    collapse();
});

function collapse() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
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
}



// collapseButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Obtener el ID del colapso que se va a abrir
//         var targetId = this.getAttribute('data-bs-target');

//         // Cerrar otros colapsos
//         collapseButtons.forEach(btn => {
//             var otherTargetId = btn.getAttribute('data-bs-target');
//             if (otherTargetId !== targetId) {
//                 var collapseElement = document.querySelector(otherTargetId);
//                 var collapse = bootstrap.Collapse.getInstance(collapseElement);
//                 if (collapse) {
//                     collapse.hide(); // Cerrar el colapso
//                 }
//             }
//         });
//     });
// });




// const create = document.getElementById('create');

// create.addEventListener('click', () => {
//     // Obtener los valores del formulario
//     const doc = document.getElementById('floatingDocument').value;
//     const name = document.getElementById('floatingUserName').value;
//     const lastName = document.getElementById('floatingUserLastName').value;
//     const rol = document.getElementById('selectRole').value;
//     const email = document.getElementById('floatingUserEmail').value;
//     const password = document.getElementById('floatingUserPassword').value;
//     const phone = document.getElementById('floatingUserPhone').value;

//     // Enviar una solicitud al servidor para crear un nuevo usuario
//     createUser(doc, name, lastName, rol, email, password, phone);
// });

// async function createUser(document, name, lastName, rol, email, password, phoneNumber) {
//     const url = chooseUrl(rol);
    
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json' // Set appropriate content type
//         },
//         body: JSON.stringify({ // Send data as JSON
//           document,
//           name,
//           lastName, // Use camelCase for consistency
//           email,
//           password,
//           phoneNumber
//         })
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error creating user: ${response.statusText}`);
//       }
  
//       const data = await response.json(); // Parse response as JSON if applicable
//       console.log(data.message); // Example: "New user inserted with ID: ..."
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   }

// async function chooseUrl(rol){
//     if (rol == 'Veterinarian'){
//         return '/veterinarian/create'; // Replace with your actual endpoint URL
//     } else {
//         return '/petowner/create'; // Replace with your actual endpoint URL
//     }
// }

// // Función para obtener todas las personas
// function readUser() {
//     fetch('/person/read/:document')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la petición');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Personas:', data);
//             displayPersons(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// // Función para mostrar las personas en una tabla
// function displayPersons(persons) {
//     const tableBody = document.getElementById('personsTable');
//     tableBody.innerHTML = ''; // Limpiar tabla

//     persons.forEach(person => {
//         const row = `
//             <tr>
//                 <td>${person.document}</td>
//                 <td>${person.name}</td>
//                 <td>${person.last_name}</td>
//                 <td>${person.email}</td>
//                 <td>${person.password}</td>
//                 <td>${person.phone_number}</td>
//                 <td>
//                     <button onclick="editPerson(${person.id})">Editar</button>
//                     <button onclick="deletePerson(${person.id})">Eliminar</button>
//                 </td>
//             </tr>
//         `;
//         tableBody.innerHTML += row;
//     });
// }