const collapseCreateTreatment = document.getElementById('btn-collapse-create-treatment');

const inputDose = document.getElementById('floating-dose');
const selectMedicalHistory = document.getElementById('select-medical-history');
const selectMedicine = document.getElementById('select-medicine');

const btnCreateTreatment = document.getElementById('btn-create-treatment');

collapseCreateTreatment.addEventListener('click', getMedicalHistories);
collapseCreateTreatment.addEventListener('click', getMedicines);

async function getMedicalHistories() {

    const urlString = ('/getMedicalHistories').toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get medical histories data');
        }

        data.forEach(MedicalHistory => {
            const option = document.createElement('option');
            option.textContent = MedicalHistory.medical_history_id;
            selectMedicalHistory.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getMedicines() {

    const urlString = ('/getMedicines').toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get medicines data');
        }

        data.forEach(medicine => {
            const option = document.createElement('option');
            option.textContent = medicine.medicine_id;
            selectMedicine.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

