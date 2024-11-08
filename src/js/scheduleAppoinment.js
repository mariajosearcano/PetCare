const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');
const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

// agregar veterinarios al select
btnCollapseSchedule.addEventListener('click', GetNames);

async function GetNames() {

    const urlString = ('/getVeterinarians').toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        data.forEach(vet => {
            AddVetOption(vet);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function AddVetOption(vet) {
    const option = document.createElement('option');
    option.textContent = vet.name;
    selectVeterinarian.appendChild(option);
}