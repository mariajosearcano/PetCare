const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const selectSpecialty = document.getElementById('select-specialty');
const selectDate = document.getElementById('select-date');

const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');

// agregar dias al select
selectSpecialty.addEventListener('change', () => {
    fillSelectDate();
});

async function GetDates() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    const urlString = (`/getDayBySpecialty/${specialty}`).toString();

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

async function fillSelectDate() {

    // limpiar el select
    selectDate.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Date *';
    selectDate.appendChild(option);
    option.disabled = true;
    option.selected = true;
    option.value = '';

    try {
        const dates = await GetDates();
        dates.forEach(date => {
            const option = document.createElement('option');
            option.textContent = date.day.split("T")[0];
            selectDate.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// agregar horarios al select
selectDate.addEventListener('change', () => {
    fillSelectSchedule();
});

async function GetSchedules() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    let day = selectDate.options[selectDate.selectedIndex].text;

    const urlString = (`/getScheduleByDay/${specialty}/${day}`).toString();

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

async function fillSelectSchedule() {

    // limpiar el select
    selectSchedule.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Schedule *';
    selectSchedule.appendChild(option);
    option.disabled = true;
    option.selected = true;

    try {
        const schedules = await GetSchedules();
        schedules.forEach(schedule => {
            const option = document.createElement('option');
            option.textContent = (`${schedule.start_hour}`).toString();
            selectSchedule.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }

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

