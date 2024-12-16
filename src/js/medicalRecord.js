const btnTreatment = document.getElementById('btn-treatment');

// fetch treatments
async function getTreatment() {

    const urlString = ('/getMedicalRecord').toString();

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

const data = getTreatment();

// Evento para insertar
btnTreatment.addEventListener('click', () => {
    data.then(data => {
        insertTreatmentsIntoTable(data);
    });
});

// Insertar registros en la tabla
function insertTreatmentsIntoTable(data) {
    const tableBody = document.getElementById('tbody');

    tableBody.innerHTML = '';

    // Iteramos sobre los registros y creamos filas
    data.forEach(treatment => {
        const row = document.createElement('tr'); // Creamos la fila

        row.innerHTML = `
            <td>${treatment.treatment_id}</td>
            <td>${treatment.pet}</td>
            <td>${treatment.medical_history_id}</td>
            <td>${treatment.diagnosis}</td>
            <td>${treatment.medicine}</td>
            <td>${treatment.medicine_type}</td>
            <td>${treatment.dose}</td>
        `;

        // Agregamos la fila al cuerpo de la tabla
        tableBody.appendChild(row);
    });
}
