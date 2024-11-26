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
    option.value = '';

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

// guardar pet_id
selectPet.addEventListener('change', async () => {
    try {
        const petId = await GetPetId(); // Espera el resultado de la promesa
        localStorage.setItem('pet_id', petId);
    } catch (error) {
        console.error('Error al obtener el pet_id:', error);
    }
});

async function GetPetId() {
    let pet = selectPet.options[selectPet.selectedIndex].text;

    const urlString = (`/getPetId/${pet}`).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error to get Pet id');
        }

        return data.pet_id;
    } catch (error) {
        console.error('Error:', error);
        throw error;
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

        localStorage.setItem('end_hour', data[0].end_hour);

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
    option.value = '';

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

        localStorage.setItem('available_id', data[0].available_id);

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
    option.value = '';

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
btnSchedule.addEventListener('click', async (event) => {
    if (await Postvalidation(event) == false) {
        return;
    }
    postAppointment();
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

async function postAppointment() {

    let day = selectDate.options[selectDate.selectedIndex].text;
    let start_hour = selectSchedule.options[selectSchedule.selectedIndex].text;
    let end_hour = localStorage.getItem('end_hour');
    let pet_id = localStorage.getItem('pet_id');
    let available_id = localStorage.getItem('available_id');

    const data = {
        day,
        start_hour,
        end_hour,
        pet_id,
        available_id
    }

    const urlString = ('/postAppointment').toString();

    try {
        const response = await fetch(urlString, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error to schedule appointment');
        }

        postAlert();
    } catch (error) {
        console.error('Error:', error);
    }
}

// alerts
function postAlert() {
    Swal.fire({
        icon: "success",
        title: "The appointment has been scheduled"
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(true);
        }
    });
};

// cerrar collapse

btnCancel.addEventListener('click', () => {
    selectPet.selectedIndex = 0;
    selectSpecialty.selectedIndex = 0;
    selectDate.selectedIndex = 0;
    selectSchedule.selectedIndex = 0;
    selectVeterinarian.selectedIndex = 0;

    const form = document.getElementById('register-form');
    form.classList.remove('was-validated');

    // cerrar collapse
    const collapseElement = document.getElementById('collapse-schedule-appointment');
    const collapse = bootstrap.Collapse.getInstance(collapseElement);
    collapse.hide();
});
