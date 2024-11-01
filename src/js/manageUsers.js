const create = document.getElementById('create-user');

create.addEventListener('click', () => {
    // Obtener los valores del formulario
    const document = document.getElementById('floatingDocument').value;
    const name = document.getElementById('floatingUserName').value;
    const lastName = document.getElementById('floatingUserLastName').value;
    const rol = document.getElementById('selectRole').value;
    const email = document.getElementById('floatingUserEmail').value;
    const password = document.getElementById('floatingUserPassword').value;
    const phone = document.getElementById('floatingUserPhone').value;

    // Enviar una solicitud al servidor para crear un nuevo usuario
    createUser(document, name, lastName, rol, email, password, phone);
});

async function createUser(document, name, lastName, rol, email, password, phoneNumber) {
    const url = chooseUrl(rol);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set appropriate content type
        },
        body: JSON.stringify({ // Send data as JSON
          document,
          name,
          lastName, // Use camelCase for consistency
          email,
          password,
          phoneNumber
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }
  
      const data = await response.json(); // Parse response as JSON if applicable
      console.log(data.message); // Example: "New user inserted with ID: ..."
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

async function chooseUrl(rol){
    if (rol == 'Veterinarian'){
        return '/veterinarian/create'; // Replace with your actual endpoint URL
    } else {
        return '/Pet Owner/create'; // Replace with your actual endpoint URL
    }
}

const documentInput = document.getElementById('floatingDocument');
const nameInput = document.getElementById('floatingUserName');
const lastNameInput = document.getElementById('floatingUserlastName');
const roleSelect = document.getElementById('selectRole');
const emailInput = document.getElementById('floatingUserEmail');
const passwordInput = document.getElementById('floatingUserPassword');
const phoneInput = document.getElementById('floatingUserPhone');

const createButton = document.getElementById('create');
const searchButton = document.getElementById('searchButton');

createButton.addEventListener('click', createUser);
searchButton.addEventListener('click', readUser);

const BASE_URL = 'http://localhost:3007';

function createUser() {

    let person = {    // los atributos deben coincidir con los nombres de las columnas en la tabla
        document: documentInput.value,
        name: nameInput.value,
        last_name: lastNameInput.value,
        //role: roleSelect.options[roleSelect.selectedIndex].text,
        email: emailInput.value,
        password: passwordInput.value,
        phone_number: phoneInput.value
    };

    fetch(`${BASE_URL}/person/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    documentInput.value = '';
    nameInput.value = '';
    lastNameInput.value = '';
    roleSelect.selectedIndex = 0;
    emailInput.value = '';
    passwordInput.value = '';
    phoneInput.value = '';
}

// Función para obtener todas las personas
function readUser() {
    fetch('/person/read/:document')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        })
        .then(data => {
            console.log('Personas:', data);
            displayPersons(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Función para mostrar las personas en una tabla
function displayPersons(persons) {
    const tableBody = document.getElementById('personsTable');
    tableBody.innerHTML = ''; // Limpiar tabla

    persons.forEach(person => {
        const row = `
            <tr>
                <td>${person.document}</td>
                <td>${person.name}</td>
                <td>${person.last_name}</td>
                <td>${person.email}</td>
                <td>${person.password}</td>
                <td>${person.phone_number}</td>
                <td>
                    <button onclick="editPerson(${person.id})">Editar</button>
                    <button onclick="deletePerson(${person.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
