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
        throw new Error('Error al registrar el usuario');
      }
      return response.json();
    })
    .then(data => {
      console.log('Usuario registrado:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else {
    for (const field in validationMessages) {
      errorMessages.innerHTML += `<div class="alert alert-danger">${validationMessages[field]}</div>`;
    }
  }
});