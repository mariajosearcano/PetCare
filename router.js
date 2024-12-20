const { Router } = require('express');
const router = Router();

const pagesController = require('./src/controllers/pagesController');

const appointmentController = require('./src/controllers/appointmentController');
const medicalHistoryController = require('./src/controllers/medicalHistoryController');
const medicalHistoryVaccineController = require('./src/controllers/medicalHistoryVaccineController');
const petController = require('./src/controllers/petController');
const scheduleController = require('./src/controllers/scheduleController');
const treatmentController = require('./src/controllers/treatmentController');
const vaccineController = require('./src/controllers/vaccineController');
const petOwnerController = require('./src/controllers/petOwnerController');
const veterinarianController = require('./src/controllers/veterinarianController');
const medicineController = require('./src/controllers/medicineController');
const loginController = require('./src/controllers/loginController.js');
const registermedicineController = require('./src/controllers/registermedicineController');
const availableController = require('./src/controllers/availableController');
const photoController = require('./src/controllers/photoController');
const administratorController = require('./src/controllers/administratorController');
const medicalRecord = require('./src/controllers/medicalRecord');
const sessionController = require('./src/controllers/sessionController');



// html

router.get('/home', pagesController.getHome);
router.get('/login', pagesController.getLogin);
router.get('/404', pagesController.get404);

////admin
router.get('/admin', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getAdmin);
router.get('/manageUsers', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getManageUsers);
router.get('/manageMedicines', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getManageMedicines);
router.get('/manageSchedules', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getManageSchedules);
router.get('/changePasswordAdministrator', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getChangePasswordAdministrator);

////pet owner
router.get('/petOwner', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getPetOwner);
router.get('/managePet', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getManagePet);
router.get('/scheduleAppointment', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getScheduleAppointment);
router.get('/medicalRecord', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getMedicalRecord);
router.get('/changePasswordPetOwner', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getChangePasswordPetOwner);

////veterinarian
router.get('/veterinarian', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getVeterinarians);
router.get('/treatment', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getTreatment);
router.get('/registerPetOwner', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getregisterPetOwner);
router.get('/scheduleAppointmentVeterinarian', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getScheduleAppointmentVeterinarian);
router.get('/changePasswordVeterinarian', sessionController.getUserDocument, sessionController.roleValidator, pagesController.getChangePasswordVeterinarian);


// funcionalidades


//// pet owners
router.post('/postPetOwner', petOwnerController.postPetOwner);
router.get('/getPetOwners', petOwnerController.getPetOwners);
router.put('/putPetOwner', petOwnerController.putPetOwner);
router.delete('/deletePetOwner', petOwnerController.deletePetOwner);
router.get('/getMedicalRecord', medicalRecord.getMedicalRecord);
router.get('/getPetOwner', petOwnerController.getPetOwner);
router.put('/putPasswordPetOwner', petOwnerController.putPasswordPetOwner);

//// veterinarian
router.post('/postVeterinarian', veterinarianController.postVeterinarian);
router.get('/getVeterinarians', veterinarianController.getVeterinarians);
router.get('/getOneVeterinarian/:name', veterinarianController.getOneVeterinarian);
router.get('/getVeterinarian/:specialty/:day/:start_hour', veterinarianController.getVeterinarianBySpecialty);
router.put('/putVeterinarian', veterinarianController.putVeterinarian);
router.delete('/deleteVeterinarian', veterinarianController.deleteVeterinarian);
router.get('/getVeterinarian', veterinarianController.getVeterinarian);
router.put('/putPasswordVeterinarian', veterinarianController.putPasswordVeterinarian);

//// medicine
router.get('/getMedicines', medicineController.getMedicines);
router.post('/postMedicine', registermedicineController.medicine);
router.get('/getMedicineVet', registermedicineController.getMedicines);
//router.post('/postMedicinesearch', registermedicineController.findMedicineById);
router.delete('/deleteMedicine', registermedicineController.deleteMedicineById);

//// treatment
router.post('/postTreatment', treatmentController.postTreatment);
router.get('/getTreatment', treatmentController.getTreatment);
router.get('/postTreatment', treatmentController.postTreatment);
router.get('/getPetsId', treatmentController.getPetsId);
router.get('/getTreatmentForPet/:medical_history_id',treatmentController.getTreatmentForPet);

//// login
router.post('/postLogin', loginController.login);

//// pet
router.get('/getPet', petController.getPets);
router.get('/getPetId/:name', petController.getPetId);
router.post('/postPet', photoController.uploadPhoto, petController.createPets);
router.delete('/deletePet/:name', petController.deletePets);
router.get('/getPetsByPetOwner', petController.getPetsByPetOwner);
router.put('/putPet', photoController.uploadPhoto, photoController.deletePhoto, petController.putPet);
router.delete('/deletePet', photoController.deletePhoto, petController.deletePet);

//// schedule
router.get('/getVetSchedule/:veterinarian_document', scheduleController.getVetSchedule);
router.post('/postSchedule', scheduleController.postSchedule);
router.get('/getSchedules', scheduleController.getSchedules);
router.put('/putSchedule', scheduleController.putSchedule);
router.delete('/deleteSchedule', scheduleController.deleteSchedule);

//// medical history
router.get('/getMedicalHistories', medicalHistoryController.getMedicalHistories);
// router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

//// available
router.get('/getDayBySpecialty/:specialty', availableController.getDayBySpecialty);
router.get('/getScheduleByDay/:specialty/:day', availableController.getScheduleByDay);

//// appointment
router.post('/postAppointment', appointmentController.postAppointment);
// router.get('/getAppointments', appointmentController.getAppointments);
router.get('/getAppointmentsByPetOwner', appointmentController.getAppointmentsByPetOwner);
router.delete('/deleteAppointment', appointmentController.deleteAppointment);
router.get('/getAppointmentsByVeterinarian', appointmentController.getAppointmentsByVeterinarian);

//// medical history vaccine
router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

//// vaccine
router.get('/getAllvaccines', vaccineController.getVaccines);

//// administrator
router.get('/getAdministrator', administratorController.getAdministrator);
router.put('/putPasswordAdministrator', administratorController.putPasswordAdministrator);



module.exports = router;