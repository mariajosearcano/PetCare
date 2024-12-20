// VARIABLES

//// PUT VARIABLES
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');



// PUT LOGIC

async function handleChangePassword() {
    const changePasswordForm = document.getElementById('changePasswordForm');

    if (!changePasswordForm.checkValidity()) {
        changePasswordForm.classList.add('was-validated');
        return;
    }

    let data = {
        email: inputEmail.value,
        password: inputPassword.value
    };

    await putChangePassword(data);
}

async function putChangePassword(data) {
    try {
        const response = await fetch('/putPassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            putAlert(responseData.message);
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            putErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error updating Password", error);
        putErrorAlert();
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



// ALERTS


//// PUT ALERTS

function putAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "Password has been updated",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(true);
        }
    });
}

function putCancelAlert(){
    Swal.fire({
        title: "The update of a Password was cancelled",
        allowOutsideClick: false
    });
}

function putErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error updating Password",
        allowOutsideClick: false
    });
}


