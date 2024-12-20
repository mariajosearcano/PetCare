const form = document.getElementById('registrationForm')

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Inicializa la variable isValid
  let isValid = true;
  const validationMessages = {};

  // Obtén los valores del formulario
  const document = form.document.value;
  const name = form.name.value;
  const last_name = form.last_name.value;
  const email = form.email.value;
  const password = form.password.value;
  const phone_number = form.phone_number.value;

  if (isValid) {
    //const encryptedPassword = await encryptPassword(password);
    //console.log('Contraseña encriptada:', encryptedPassword);

    fetch('/postPetOwner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document,
        name,
        last_name,
        email,
        password: password,
        phone_number
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error registering user');
      }
      return response.json();
    })
    .then(data => {
      console.log('Registered user:', data);
      Swal.fire({
        title: data.message || "User registered successfully",
        icon: "success",
        allowOutsideClick: false
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else { for (const field in validationMessages) { errorMessages.innerHTML += `<div class="alert alert-danger">${validationMessages[field]}</div>`; } } });

  
function validateForm() {
  // Get form elements
  const documentField = document.getElementById('document');
  const nameField = document.getElementById('name');
  const lastNameField = document.getElementById('last_name');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const phoneNumberField = document.getElementById('phone_number');
  const errorMessagesDiv = document.getElementById('errorMessages');

  //Expresiones regulares
  const documentRegex = /^[0-9]{8,10}$/; 
  const nameRegex = /^[A-ZÑa-zñ\s]+$/;
  const lastNameRegex = /^[A-ZÑa-zñ\s]+$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[!@#$%^&()_+])[A-Za-z\d!@#$%^&()_+]{8,}$/; 
  const phoneRegex = /^\d{10}$/; 

  // Reset error messages
  errorMessagesDiv.textContent = '';

  // Validación del campo documento
  if (!documentField.value.trim()) {
    // ... (código existente para mostrar mensaje de error)
  } else if (!documentRegex.test(documentField.value)) {
    documentField.classList.add('is-invalid');
    errorMessagesDiv.textContent += 'The document must be between 8 and 10 digits.\n';
    return false;
  }

  // Validación del campo nombre
  if (!nameField.value.trim()) {
    // ... (código existente para mostrar mensaje de error)
  } else if (!nameRegex.test(nameField.value)) {
    nameField.classList.add('is-invalid');
    errorMessagesDiv.textContent += 'The name can only contain letters and spaces.\n';
    return false;
  }

  // Validación del campo apellido
  if (!lastNameField.value.trim()) {
    // ... (código existente para mostrar mensaje de error)
  } else if (!lastNameRegex.test(lastNameField.value)) {
    lastNameField.classList.add('is-invalid');
    errorMessagesDiv.textContent += 'The name can only contain letters and spaces.\n';
    return false;
  }

    // Validación del campo email
    if (!emailField.value.trim()) {
      // ... (código existente para mostrar mensaje de error)
    } else if (!emailRegex.test(emailField.value)) {
      emailField.classList.add('is-invalid');
      errorMessagesDiv.textContent += 'The password must have @.com.\n';
      return false;
    }
  

    // Validación del campo phone_number
    if (!phoneNumberField.value.trim()) {
      // ... (código existente para mostrar mensaje de error)
    } else if (!phoneRegex.test(phoneNumberField.value)) {
      phoneNumberField.classList.add('is-invalid');
      errorMessagesDiv.textContent += 'The phone number must be 10 digits long.\n';
      return false;
    }


  return true;

  
}

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

function userCreated(){
  Swal.fire({
      title: "User created successfully",
      allowOutsideClick: false
  });
};