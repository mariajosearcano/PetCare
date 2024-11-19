const collapseCreateTreatment = document.getElementById('btn-collapse-create-treatment');

const selectMedicalHistory = document.getElementById('select-medical-history');
const selectMedicine = document.getElementById('select-medicine');

const btnCreateTreatment = document.getElementById('btn-create-treatment');

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
                medicine_id
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
}
