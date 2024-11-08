async function deleteMedicine(medicineId) {
  try {
    const response = await fetch('/deleteMedicine', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ medicineId })
    });

    if (response.ok) {
      // Manejar eliminación exitosa
      deleteAlert(); // Mostrar mensaje de éxito
    } else {
      // Manejar error
      const errorData = await response.json();
      console.error("Error: " + (errorData.message || "Ocurrió un error al eliminar la medicina"));
      deleteErrorAlert(); // Mostrar mensaje de error
    }
  } catch (error) {
    console.error('Error deleting medicine:', error);
    deleteErrorAlert(); // Mostrar mensaje de error genérico
  }
}

// GET LOGIC

async function getMedicines(url) {
    const urlString = (url).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error: " + (errorData.message || "An error occurred"));
            getErrorAlert();
        }
    
        window.dataCache = data;
        populateTable(data);
        collapse();
    } catch (error) {
        console.error("Error getting users", error);
        getErrorAlert();
    }
}

function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.medicine_id}</th>
        <td>${data.name}</td>
        <td>${data.stock}</td>
        <td>
            <p class="d-inline-flex gap-1">
                ${
                    data.stock === 0
                    ? `<img src="/assets/circle-without-medicines.png" alt="Without stock" class="img-fluid size">`
                    : `<img src="/assets/circle-with-medicines.png" alt="With stock" class="img-fluid size">`
                }
            </p>
        </td>
    `;

    return row;
}

function populateTable(data) {
    const id = 'getMedicinesTableBody';
    const tableBody = document.getElementById(id);
    const filterValue = document.getElementById("stock-filter").value;

    tableBody.innerHTML = '';

    data.forEach((item) => {
        const hasStock = item.stock > 0;
        
        if (
            (filterValue === "with-stock" && hasStock) ||
            (filterValue === "without-stock" && !hasStock) ||
            (filterValue === "all")
        ) {
            const row = createTableRow({
                medicine_id: item.medicine_id,
                name: item.name,
                stock: item.stock
            });
            tableBody.appendChild(row);
        }
    });
}

function filterTable() {
    if (window.dataCache) {
        populateTable(window.dataCache);
    }
}


// collapse buttons logic

document.addEventListener('DOMContentLoaded', function() {
    collapse();
});

function collapse() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');

            collapseButtons.forEach(btn => {
                const otherTargetId = btn.getAttribute('data-bs-target');
                if (otherTargetId !== targetId) {
                    const collapseElement = document.querySelector(otherTargetId);
                    const collapse = bootstrap.Collapse.getInstance(collapseElement);
                    if (collapse) {
                        collapse.hide();
                    }
                }
            });
        });
    });
}


//// GET ALERTS

function getErrorAlert(){
    Swal.fire({
        icon: "error",
        title: "Error getting medicines"
    });
};