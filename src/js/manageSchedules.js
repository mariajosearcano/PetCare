
// VARIABLES

var postForm = document.getElementById('postForm');
var datepair = new Datepair(postForm, {
    'defaultDateDelta': 5      // days
    // 'defaultTimeDelta': 7200000 // milliseconds
});



// EVENT LISTENERS

// document.addEventListener('DOMContentLoaded', function() {
//     const startDayInput = document.getElementById('postStartDay');
//     startDayInput.addEventListener('change', isMonday());
// });



//POST LOGIC

async function handlePostSubmit() {
    const postForm = document.getElementById('postForm');

    if (!postForm.checkValidity() || !isMonday()) {
        postForm.classList.add('was-validated');
        return;
    }

    const postFormData = {
        start_day: document.getElementById('postStartDay').value,
        end_day: document.getElementById('postEndDay').value,
        start_hour: document.getElementById('postStartHour').value,
        end_hour: document.getElementById('postEndHour').value
    };

    postSchedule(postFormData, postForm);
}

function isMonday() {
    const startDayInput = document.getElementById('postStartDay');
    const invalidFeedback = document.getElementById('postStartDayInvalidFeedback');

    var date = new Date(startDayInput.value + 'T00:00:00-05:00');
    var isValidMonday = date.getDay() === 1;

    if (!isValidMonday) {
        startDayInput.classList.add('is-invalid');
        // if (invalidFeedback) {
        //     invalidFeedback.style.display = 'block';
        // }
    } else {
        startDayInput.classList.remove('is-invalid');
        // if (invalidFeedback) {
        //     invalidFeedback.style.display = 'none';
        // }
    }

    return isValidMonday;
}

async function postSchedule(postFormData, postForm) {
    try {
        const response = await fetch('/postSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            body: JSON.stringify(postFormData)
        });

        const responseData = await response.json();

        if (response.ok) {
            postAlert(responseData.message);
            // postForm.reset();
            // postForm.classList.remove('was-validated');
        } else {
            console.error("Error: " + (responseData.error || "An error occurred"));
            postErrorAlert(responseData.error);
        }
    } catch (error) {
        console.error("Error submitting form", error);
        postErrorAlert();
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



// JQUERY

$('#postForm .date').datepicker({
    'format': 'yyyy-mm-dd',
    'autoclose': true,
    'startDate': '+1d',
    'daysOfWeekDisabled': [0, 2, 3, 4, 5, 6],
    'daysOfWeekHighlighted': [1]
})

$('#postForm .time').timepicker({
    // 'showDuration': true,
    'timeFormat': 'H:i',
    'step': 60
    // 'forceRoundTime': true
});



// ALERTS


//// POST ALERTS

function postAlert(message){
    Swal.fire({
        icon: "success",
        title: message || "Schedule has been created",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) { // Se ejecuta cuando el usuario hace clic en "OK" o confirma el diálogo
            location.reload(true);
        }
    });
};

function postCancelAlert(){
    Swal.fire({
        title: "The creation of a schedule was cancelled",
        allowOutsideClick: false
    });
};

function postErrorAlert(error){
    Swal.fire({
        icon: "error",
        title: error || "Error creating schedule",
        allowOutsideClick: false
    });
};