const {Router} = require('express');
const router = Router();
const appointmentController = require('../controllers/appointmentController');
const administratorController = require('../controllers/administratorController');
const medicalHistoryController = require('../controllers/medicalHistoryController');
const medicalHistoryVaccineController = require('../controllers/medicalHistoryVaccineController');
const medicineController = require('../controllers/medicineController');
const petController = require('../controllers/petController');
const petOwnerController = require('../controllers/petOwnerController');
const scheduleController = require('../controllers/scheduleController');
const treatmentController = require('../controllers/treatmentController');
const vaccineController = require('../controllers/vaccineController');
const veterinarianController = require('../controllers/veterinarianController');
const pagesController = require('../controllers/pagesController');

router.get('/getAllappointments', appointmentController.getAppointments);

router.get('/getAlladministrators', administratorController.getAdministrators);

router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

router.get('/getAllmedicines', medicineController.getMedicines);

router.get('/getAllpets', petController.getPets);

router.get('/getAllpetOwners', petOwnerController.getPetOwners);

router.get('/getAllschedules', scheduleController.getSchedules);

router.get('/getAlltreatments', treatmentController.getTreatments);

router.get('/getAllvaccines', vaccineController.getVaccines);

router.get('/getAllveterinarians', veterinarianController.getVeterinarians);

router.get('/getAllpages', pagesController.getPages);

module.exports = router;

