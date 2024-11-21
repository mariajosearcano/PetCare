const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const selectSpecialty = document.getElementById('select-specialty');

const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');

// agregar veterinarios al select
selectSpecialty.addEventListener('change', () => {
    fillSelectVet();
});

async function GetVets() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    const urlString = (`/getVeterinarian/${specialty}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fillSelectVet() {

    // limpiar el select
    selectVeterinarian.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Veterinarian *';
    selectVeterinarian.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const vets = await GetVets();
        vets.forEach(vet => {
            const option = document.createElement('option');
            option.textContent = vet.name;
            selectVeterinarian.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// agregar horarios al select
selectVeterinarian.addEventListener('change', () => {
    GetSchedules();
});

async function GetSchedules() {

    selectSchedule.innerHTML = '';  // limpiar select

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

// agendar cita
// btnSchedule.addEventListener('click', ScheduleAppointment);

// async function ScheduleAppointment() {

//     let veterinarian_document = localStorage.getItem('vet_document');
//     let schedule = selectSchedule.options[selectSchedule.selectedIndex].text;

//     const data = {
//         veterinarian_document: veterinarian_document,
//         schedule: schedule
//     }

//     const url = '/scheduleAppointment';

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Error to get Pet Owners data');
//         }

//         alert('Appointment scheduled successfully');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

