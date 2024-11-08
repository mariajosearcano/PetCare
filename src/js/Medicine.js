fetch('/getMedicineVet')
  .then(response => response.json())
  .then(medicines => {
    const medicineTableBody = document.getElementById('medicineTableBody');

    medicines.forEach(medicine => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${medicine.medicine_id}</td>
        <td>${medicine.name}</td>
        <td>${medicine.stock}</td>
      `;
      medicineTableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching medicines:', error);
    // Handle error, e.g., display an error message in the HTML
  });
