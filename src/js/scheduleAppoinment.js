const selectVeterinarian = document.getElementById('select-veterinarian');
const selectSchedule = document.getElementById('select-schedule');
const selectSpecialty = document.getElementById('select-specialty');
const selectDate = document.getElementById('select-date');
const selectPet = document.getElementById('select-pet');

const btnCollapseSchedule = document.getElementById('btn-collapse-schedule');

const btnSchedule = document.getElementById('btn-schedule');
const btnCancel = document.getElementById('btn-cancel');

// agregar mascotas al select
btnCollapseSchedule.addEventListener('click', () => {
    fillSelectPet();
});

async function GetPets() {

    const urlString = (`/getPet`).toString();

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

async function fillSelectPet() {

    // limpiar el select
    selectPet.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Pet *';
    selectPet.appendChild(option);
    option.disabled = true;
    option.selected = true;

    try {
        const pets = await GetPets();
        pets.forEach(pet => {
            const option = document.createElement('option');
            option.textContent = (`${pet.name}`).toString();
            selectPet.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

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

// agregar veterinarios al select
selectSchedule.addEventListener('change', () => {
    fillSelectVeterinarian();
});

async function GetVeterinarians() {

    let specialty = selectSpecialty.options[selectSpecialty.selectedIndex].text;

    let day = selectDate.options[selectDate.selectedIndex].text;

    let start_hour = selectSchedule.options[selectSchedule.selectedIndex].text;

    const urlString = (`/getVeterinarian/${specialty}/${day}/${start_hour}`).toString();

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

async function fillSelectVeterinarian() {

    // limpiar el select
    selectVeterinarian.innerHTML = '';
    const option = document.createElement('option');
    option.textContent = 'Veterinarian *';
    selectVeterinarian.appendChild(option);
    option.disabled = true;
    option.selected = true;

    try {
        const veterinarians = await GetVeterinarians();
        veterinarians.forEach(veterinarian => {
            const option = document.createElement('option');
            option.textContent = (`${veterinarian.name} ${veterinarian.last_name}`).toString();
            selectVeterinarian.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

// agendar cita
btnSchedule.addEventListener('click', () => {
    ScheduleAppointment();
});

async function postAppointment() {

    let schedule = selectSchedule.options[selectSchedule.selectedIndex].text;
    

    const data = {
        veterinarian_document: veterinarian_document,
        schedule: schedule
    }

    const url = '/postAppointment';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }

        alert('Appointment scheduled successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

