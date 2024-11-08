const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');
const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

// agregar veterinarios al select
btnCollapseSchedule.addEventListener('click', GetVets);

async function GetVets() {

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

selectVeterinarian.addEventListener('change', GetSchedules);

// agregar horarios al select
async function GetSchedules() {

    let name = selectVeterinarian.options[selectVeterinarian.selectedIndex].text;

    // fetch del veterinario para obtener el document
    const url2 = (`/getOneVeterinarian/${name}`).toString();

    try {
        const response = await fetch(url2);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        localStorage.setItem('vet_document', data[0].document);

    } catch (error) {
        console.error('Error:', error);
    }

    // fetch del horario segun el documento del vet
    let veterinarian_document = localStorage.getItem('vet_document');
    const urlString = (`getVetSchedule/${veterinarian_document}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        data.forEach(schedule => {
            AddScheduleOption(schedule);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function AddScheduleOption(schedule) {
    const option = document.createElement('option');
    option.textContent = (`${schedule.start_hour}-${schedule.end_hour}`).toString();
    selectSchedule.appendChild(option);
}
