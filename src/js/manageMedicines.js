// Assuming you have a script tag in your HTML to execute this JavaScript



fetch('/getMedicines')
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


//   async function deleteMedicine(data) {
//     const url = chooseDeleteUrlByTable(data.table);

//     try {
//         const response = await fetch(url, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//                 //'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 document: data.document
//             })
//         });
    
//         if (response.ok) {
//             deleteAlert();
//         } else {
//             const errorData = await response.json();
//             console.error("Error: " + (errorData.message || "An error occurred"));
//             deleteErrorAlert();
//         }
//     } catch (error) {
//         console.error('Error deleting user', error);
//         deleteErrorAlert();
//     }
// }



  // async function searchMedicine() {
  //   const medicineId = document.getElementById('searchMedicineId').value;
  
  //   try {
  //     const response = await fetch(`/getMedicineById?id=${medicineId}`);
  //     const medicine = await response.json();
  
  //     // ... procesar la respuesta del servidor ...
  //   } catch (error) {
  //     console.error('Error al buscar el medicamento:', error);
  //     alert('Error al buscar el medicamento'); // Puedes mostrar un mensaje de error más amigable
  //   }
  // }
  // function searchMedicine() {
  //   const medicineId = document.getElementById('searchMedicineId').value;
  
  //   // Realizar la petición al servidor para buscar el medicamento
  //   fetch(`/getMedicineById?id=${medicineId}`)
  //     .then(response => response.json())
  //     .then(medicine => {
  //       const tbody = document.getElementById('medicineTableBody');
  //       tbody.innerHTML = ''; // Limpiar la tabla si ya había resultados anteriores
  
  //       if (medicine) {
  //         const row = document.createElement('tr');
  //         row.innerHTML = `
  //           <td><input type="text" value="${medicine.medicine_id}" id="medicineIdInput"></td>
  //           <td><input type="text" value="${medicine.name}" id="nameInput"></td>
  //           <td><input type="text" value="${medicine.stock}" id="stockInput"></td>
  //         `;
  //         tbody.appendChild(row);
  //       } else {
  //         alert('Medicamento no encontrado');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error al buscar el medicamento:', error);
  //     });
  // }
  


  // function updateMedicine() {
  //   const medicineId = document.getElementById('medicineIdInput').value;
  //   const name = document.getElementById('nameInput').value;
  //   const stock = document.getElementById('stockInput').value;
  
  //   // Realizar la petición al servidor para actualizar el medicamento
  //   fetch(`/updateMedicine`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ medicine_id, name, stock })
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       alert('Medicamento actualizado correctamente');
  //     } else {
  //       alert('Error al actualizar el medicamento');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error al actualizar el medicamento:', error);
  //   });
  // }


// ... (código existente)

// function updateMedicine() {
//   const medicineId = document.getElementById('medicineId').value;
//   const name = document.getElementById('nameInput').value;
//   const stock = document.getElementById('stockInput').value;

  // ... (código para enviar la petición PUT al servidor)}

  // function deleteMedicine(medicineId) {
  //   // Aquí puedes implementar la lógica para eliminar el medicamento
  //   // Por ejemplo, hacer una solicitud AJAX a un servidor backend
  //   // para eliminar el medicamento de la base de datos.
  
  //   fetch('/deleteMedicines', {
  //     method: 'DELETE',
  //     body: JSON.stringify({ medicineId })
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje de éxito
  //       console.log('Succes delete medicine');
  //     } else {
  //       // Manejar errores, por ejemplo, mostrar un mensaje de error
  //       console.error('Error to delete');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // }

  async function deleteMedicine (medicineId) {
    try {
      const response = await fetch('/deleteMedicine', {
        method: 'DELETE',
        body: JSON.stringify({ medicineId })
      });
  
      if (response.ok) {
        console.log('Succesfully');
        // Mostrar un mensaje de éxito al usuario
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error:', error);
      // Mostrar un mensaje de error genérico al usuario
    }
  }

