
const create = document.getElementById('create-user');
createUser.addEventListener('click', () => {
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
    const url = '/create'; // Replace with your actual endpoint URL
  
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
          rol,
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
