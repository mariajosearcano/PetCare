const { Router } = require('express');
const router = Router();

const pagesController = require('./src/controllers/pagesController');

const appointmentController = require('./src/controllers/appointmentController');
const administratorController = require('./src/controllers/administratorController');
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
const imageController = require('./src/controllers/imageController');

// html

router.get('/home', pagesController.getHome);

router.get('/login', pagesController.getLogin);
////admin
router.get('/admin', pagesController.getAdmin);
router.get('/manageUsers', pagesController.getManageUsers);
router.get('/manageMedicines', pagesController.getManageMedicines);
router.get('/manageSchedules', pagesController.getManageSchedules);
////pet owner
router.get('/petOwner', pagesController.getPetOwner);
router.get('/managePet', pagesController.getManagePet);
router.get('/scheduleAppointment', pagesController.getScheduleAppointment);
////veterinarian
router.get('/veterinarian', pagesController.getVeterinarians);
router.get('/treatment', pagesController.getTreatment);
router.get('/registerPetOwner', pagesController.getregisterPetOwner);
router.get('/scheduleAppointmentVeterinarian', pagesController.getScheduleAppointmentVeterinarian);

// funcionalidades

router.get('/getAlladministrators', administratorController.getAdministrators);

router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

router.get('/getAllvaccines', vaccineController.getVaccines);

// pet owners
router.post('/postPetOwner', petOwnerController.postPetOwner);
router.get('/getPetOwners', petOwnerController.getPetOwners);
router.put('/putPetOwner', petOwnerController.putPetOwner);
router.delete('/deletePetOwner', petOwnerController.deletePetOwner);

// veterinarian
router.post('/postVeterinarian', veterinarianController.postVeterinarian);
router.get('/getVeterinarians', veterinarianController.getVeterinarians);
router.get('/getOneVeterinarian/:name', veterinarianController.getOneVeterinarian);
router.get('/getVeterinarian/:specialty/:day/:start_hour', veterinarianController.getVeterinarianBySpecialty);
router.put('/putVeterinarian', veterinarianController.putVeterinarian);
router.delete('/deleteVeterinarian', veterinarianController.deleteVeterinarian);

// medicine
router.get('/getMedicines', medicineController.getMedicines);
router.post('/postMedicine', registermedicineController.medicine);
router.get('/getMedicineVet', registermedicineController.getMedicines);
//router.post('/postMedicinesearch', registermedicineController.findMedicineById);
router.delete('/deleteMedicine', registermedicineController.deleteMedicineById);

// treatment
router.post('/postTreatment', treatmentController.postTreatment);
router.get('/getTreatment', treatmentController.getTreatment);
router.get('/postTreatment', treatmentController.postTreatment);
router.get('/getPetsId', treatmentController.getPetsId);


// login
router.post('/postLogin', loginController.login);

// pet
router.get('/getPet', petController.getPets);
router.get('/getPetId/:name', petController.getPetId);
router.post('/postPet', petController.createPets);
router.delete('/deletePet/:name', petController.deletePets);
router.get('/getPetsByPetOwner', petController.getPetsByPetOwner);
router.put('/putPet', petController.putPet);
router.delete('/deletePet', petController.deletePet);

// schedule
router.get('/getVetSchedule/:veterinarian_document', scheduleController.getVetSchedule);
router.post('/postSchedule', scheduleController.postSchedule);
router.get('/getSchedules', scheduleController.getSchedules);
router.put('/putSchedule', scheduleController.putSchedule);
router.delete('/deleteSchedule', scheduleController.deleteSchedule);

// medical history
router.get('/getMedicalHistories', medicalHistoryController.getMedicalHistories);


// available
router.get('/getDayBySpecialty/:specialty', availableController.getDayBySpecialty);
router.get('/getScheduleByDay/:specialty/:day', availableController.getScheduleByDay);

// appointment
router.post('/postAppointment', appointmentController.postAppointment);
// router.get('/getAppointments', appointmentController.getAppointments);
router.get('/getAppointmentsByPetOwner', appointmentController.getAppointmentsByPetOwner);
router.delete('/deleteAppointment', appointmentController.deleteAppointment);
router.get('/getAppointmentsByVeterinarian', appointmentController.getAppointmentsByVeterinarian);

module.exports = router;