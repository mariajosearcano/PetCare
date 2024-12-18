const collapseCreateTreatment = document.getElementById('btn-collapse-create-treatment');
const selectMedicalHistory = document.getElementById('select-medical-history');
const selectMedicine = document.getElementById('select-medicine');

const selectMedicineType = document.getElementById('select-medicine-type');

const btnCreateTreatment = document.getElementById('btn-create-treatment');
const btnMedicalHistory = document.getElementById('btn-medical-history');

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


// Función asíncrona para obtener los datos de mascotas y manejar eventos
async function obtenerDatosDeMascotas(url) {
    try {
      // Hacer una petición al servidor
      const response = await fetch(url);
      const data = await response.json();
  
      console.log('Data received:', data);
  
      // Transformar los datos de mascotas
      const mascotas = data.map(pet => ({
        id: pet.pet_id,
        name: pet.name,
        medicalHistoryId: pet.medical_history_id
      }));
  
      // Obtener referencia al elemento <select>
      const selectElement = document.getElementById('animalSelect');
      selectElement.innerHTML = ''; // Limpiar contenido actual del select
  
      // Rellenar el <select> con las opciones de mascotas
      mascotas.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.id; // ID de la mascota como valor
        option.text = `${pet.id} - ${pet.name}`; // Texto visible
        option.dataset.medicalHistoryId = pet.medicalHistoryId; // Guardar medical_history_id en dataset
        selectElement.appendChild(option);
      });
  
      // Evento "change" del select
      selectElement.addEventListener('change', () => {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        if (selectedOption) {
          const medicalHistoryId = selectedOption.dataset.medicalHistoryId;
          console.log('Selected Medical History ID:', medicalHistoryId);
        }
      });
  
      // Evento "click" del botón
      document.getElementById('btn-medical-history').addEventListener('click', async () => {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
  
        if (!selectedOption) {
          alert('Please select a pet.');
          return;
        }
  
        const medicalHistoryId = selectedOption.dataset.medicalHistoryId;
        console.log('Selected medical history:', medicalHistoryId);
  
        
        try {
          const datosAdicionales = await obtenerDatosAdicionales(medicalHistoryId);
          console.log('Datos adicionales:', datosAdicionales);
  
          // Mostrar los datos adicionales (ejemplo)
          alert(`downloading pdf: ${JSON.stringify(datosAdicionales)}`);
        } catch (error) {
          console.error('Error getting additional data:', error);
        }
      });
    } catch (error) {
      console.error('Error getting pet data:', error);
    }
  }
  

//   async function obtenerDatosAdicionales(medicalHistoryId) {
//     const urlAdicionales = `/getTreatmentForPet/${medicalHistoryId}`;

//     try {
//         const response = await fetch(urlAdicionales);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error al obtener datos adicionales:', error);
//     }
//   }

async function obtenerDatosAdicionales(medicalHistoryId) {
    const urlAdicionales = `/getTreatmentForPet/${medicalHistoryId}`;
  
    try {
      const response = await fetch(urlAdicionales);
  
      if (!response.ok) {
        throw new Error('Error en la petición al servidor');
      }
  
      // Convertir la respuesta en un blob (archivo binario)
      const blob = await response.blob();
  
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medical_history_${medicalHistoryId}.pdf`;
      document.body.appendChild(a);
      a.click();
  
      // Limpieza del enlace temporal
      a.remove();
      window.URL.revokeObjectURL(url);
      console.log('PDF descargado exitosamente');
    } catch (error) {
      console.error('Error al obtener datos adicionales:', error);
    }
  }
  

  



