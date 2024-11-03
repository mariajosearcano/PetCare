const {Router} = require('express');
const router = Router();

const pagesController = require('./src/controllers/pagesController');
const appointmentController = require('./src/controllers/appointmentController');
const administratorController = require('./src/controllers/administratorController');
const medicalHistoryController = require('./src/controllers/medicalHistoryController');
const medicalHistoryVaccineController = require('./src/controllers/medicalHistoryVaccineController');
const medicineController = require('./src/controllers/medicineController');
const petController = require('./src/controllers/petController');
const petOwnerController = require('./src/controllers/petOwnerController');
const scheduleController = require('./src/controllers/scheduleController');
const treatmentController = require('./src/controllers/treatmentController');
const vaccineController = require('./src/controllers/vaccineController');
const veterinarianController = require('./src/controllers/veterinarianController');

router.get('/home', pagesController.getHome);
router.get('/manageUsers', pagesController.getManageUsers);

router.get('/getAllappointments', appointmentController.getAppointments);

router.get('/getAlladministrators', administratorController.getAdministrators);

router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

router.get('/getAllmedicines', medicineController.getMedicines);

router.get('/getAllpets', petController.getPets);

router.get('/getPetOwners', petOwnerController.getPetOwners);

router.get('/getAllschedules', scheduleController.getSchedules);

router.get('/getAlltreatments', treatmentController.getTreatments);

router.get('/getAllvaccines', vaccineController.getVaccines);

router.get('/getVeterinarians', veterinarianController.getVeterinarians);

module.exports = router;

