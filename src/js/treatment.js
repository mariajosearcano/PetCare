const collapseCreateTreatment = document.getElementById('btn-collapse-create-treatment');
const selectMedicalHistory = document.getElementById('select-medical-history');
const selectMedicine = document.getElementById('select-medicine');

const selectMedicineType = document.getElementById('select-medicine-type');

const btnCreateTreatment = document.getElementById('btn-create-treatment');

const selectElement = document.getElementById('animalSelect');


collapseCreateTreatment.addEventListener('click', () => {
    fillSelectMedicalHistory();
    fillSelectMedicine();
});

// fetch medical histories
async function getMedicalHistories() {

    const urlString = ('/getMedicalHistories').toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get medical histories data');
        }

        return data;  // devuelve los datos
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Propagar el error para manejarlo fuera de la función si es necesario
    }
}

async function fillSelectMedicalHistory() {

    // limpiar el select
    selectMedicalHistory.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Medical history *';
    selectMedicalHistory.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const medicalHistories = await getMedicalHistories();
        medicalHistories.forEach(medicalHistory => {
            const option = document.createElement('option');
            option.textContent = medicalHistory.medical_history_id;
            selectMedicalHistory.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);

    }
}

// fetch medicines
async function getMedicines() {
    const urlString = '/getMedicines';

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get medicines data');
        }

        return data;  // devuelve los datos
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Propagar el error para manejarlo fuera de la función si es necesario
    }
}

async function fillSelectMedicine() {

    // limpiar el select
    selectMedicine.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Medicine *';
    selectMedicine.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const medicines = await getMedicines();
        medicines.forEach(medicine => {
            const option = document.createElement('option');
            option.textContent = medicine.medicine_id;
            selectMedicine.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// check stock
selectMedicine.addEventListener('change', () => {
    checkStock();
});

async function checkStock() {
    try {
        const medicines = await getMedicines();
        const selectedMedicine = selectMedicine.options[selectMedicine.selectedIndex].text;
        const medicine = medicines.find(medicine => medicine.medicine_id == selectedMedicine);
        const stock = medicine.stock;

        if (stock <= 0) {
            withoutStockAlert();
            return;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// post
btnCreateTreatment.addEventListener('click', async (event) => {
    if (await Postvalidation(event) == false) {
        return;
    }
    postTreatment();
});

async function Postvalidation(event) {
    event.preventDefault();  // Evita que se envíe el formulario por defecto
    const form = document.getElementById('register-form');

    if (form.checkValidity()) {
        return true;
    } else {
        form.classList.add('was-validated');  // Agrega la clase para mostrar los errores
        return false;
    }
}

async function postTreatment() {

    const dose = document.getElementById('floating-dose').value;
    const medical_history_id = selectMedicalHistory.options[selectMedicalHistory.selectedIndex].text;
    const medicine_id = selectMedicine.options[selectMedicine.selectedIndex].text;
    const medicine_type = selectMedicineType.options[selectMedicineType.selectedIndex].text;

    const url = ('/postTreatment').toString();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dose,
                medical_history_id,
                medicine_id,
                medicine_type
            })
        });

        if (!response.ok) {
            throw new Error('Error to create treatment');
        }

        const data = await response.json();
        console.log(data);
        postAlert();
    } catch (error) {
        console.error('Error:', error);
    }
}

// alerts
function postAlert() {
    Swal.fire({
        icon: "success",
        title: "Treatment has been created"
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(true);
        }
    });
};

function withoutStockAlert() {
    Swal.fire({
        icon: "error",
        title: "There is no stock for this medicine"
    });

};

// descargar receta





//   async function obtenerDatosDeMascotas(url) {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
  
//       // Imprime los datos en la consola
//       console.log(data);
  
//       const selectElement = document.getElementById('animalSelect');
//       selectElement.innerHTML = '';
  
//       data.forEach(pet => {
//         const option = document.createElement('option');
//         option.value = pet.pet_id;
//         option.text = `${pet.pet_id} - ${pet.name}`;
//         selectElement.appendChild(option);
//       });
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//     }
//   }

  async function obtenerDatosDeMascotas(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      console.log(data);

      const mascotas = data.map(pet => ({
        id: pet.pet_id,
        name: pet.name,
        medicalHistoryId: pet.medical_history_id
      }));
  
      const selectElement = document.getElementById('animalSelect');
      selectElement.innerHTML = '';
  
      mascotas.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.id;
        option.text = `${pet.id} - ${pet.name}`;
        option.dataset.medicalHistoryId = pet.medicalHistoryId; // Almacenar medical_history_id en el dataset
        selectElement.appendChild(option);
      });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
  
      selectElement.addEventListener('change', async () => {
        const selectedPetId = selectElement.value;
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const medicalHistoryId = selectedOption.dataset.medicalHistoryId;
        console.log('Mascota seleccionada:', pet.medical_history_id);
  
        const datosAdicionales = await obtenerDatosAdicionales(medicalHistoryId);

        // Muestra los datos adicionales en la interfaz (ejemplo)
        console.log('Datos adicionales:', datosAdicionales);
        // ...
      });
    
    }
  

  async function obtenerDatosAdicionales(medicalHistoryId) {
    const urlAdicionales = `/getTreatmentForPet/${medicalHistoryId}`;

    try {
        const response = await fetch(urlAdicionales);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos adicionales:', error);
    }
  }