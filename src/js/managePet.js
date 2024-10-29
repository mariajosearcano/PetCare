const registerButton = document.getElementById('btnRegisterPet');
const inputName = document.getElementById('floatingName');


document.addEventListener('DOMContentLoaded', function () {
   
    // Cargar todas las personas 
    fetch('http://localhost:3000/personas')
        .then(res => res.json())
        .then(data => {
            data.forEach(persona => {
                agregarPersonaATabla(persona);
            });
        });
    // Guardar o actualizar persona 
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value; const apellido = document.getElementById('apellido').value; const correo = document.getElementById('correo').value; const telefono = document.getElementById('telefono').value;
        const persona = { nombre, apellido, correo, telefono };
        if (id) {
            // Actualizar persona 
            fetch(`http://localhost:3000/personas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(persona)
            })
                .then(res => res.json())
                .then(() => {
                    actualizarPersonaEnTabla(id, persona);
                } });
    form.reset();
});
    } else {
    // Crear nueva persona 
    fetch('http://localhost:3000/personas', {
    method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(persona)
})
        .then(res => res.json())
    .then(persona => {
        agregarPersonaATabla(persona);
        form.reset();
    });
// Funciones para actualizar la tabla function 
agregarPersonaATabla(persona) {
    const row = document.createElement('tr'); row.innerHTML = `
    <td>${persona.id}</td> <td>${persona.nombre}</td> <td>${persona.apellido}</td> <td>${persona.correo}</td> <td>${persona.telefono}</td> <td>
    <button onclick="editarPersona(${persona.id})">Editar</button>
    <button onclick="eliminarPersona(${persona.id})">Eliminar</button>
    </td> `;
    tableBody.appendChild(row);
}
function actualizarPersonaEnTabla(id, persona) {
    const filas = tableBody.querySelectorAll('tr'); filas.forEach(fila => {
        if (fila.firstElementChild.textContent == id) {
            fila.children[1].textContent = persona.nombre; fila.children[2].textContent = persona.apellido; fila.children[3].textContent = persona.correo; fila.children[4].textContent = persona.telefono;
        }
    });
}
    
    });
function editarPersona(id) {
    fetch(`http://localhost:3000/personas/${id}`)
        .then(res => res.json())
        .then(persona => {
            document.getElementById('id').value = persona.id; document.getElementById('nombre').value = persona.nombre; document.getElementById('apellido').value = persona.apellido; document.getElementById('correo').value = persona.correo; document.getElementById('telefono').value = persona.telefono;
        });
}
function eliminarPersona(id) {
    fetch(`http://localhost:3000/personas/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            const fila = document.querySelector(`#personasTable tr
    td:first-child:contains(${id})`).parentNode; fila.remove();
        });
}