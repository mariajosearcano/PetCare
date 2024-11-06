const {Router} = require('express');
const router = Router();

const pagesController = require('./src/controllers/pagesController');
const appointmentController = require('./src/controllers/appointmentController');
const administratorController = require('./src/controllers/administratorController');
const medicalHistoryController = require('./src/controllers/medicalHistoryController');
const medicalHistoryVaccineController = require('./src/controllers/medicalHistoryVaccineController');
const medicineController = require('./src/controllers/medicineController');
const petController = require('./src/controllers/petController');
const scheduleController = require('./src/controllers/scheduleController');
const treatmentController = require('./src/controllers/treatmentController');
const vaccineController = require('./src/controllers/vaccineController');
const petOwnerController = require('./src/controllers/petOwnerController');
const veterinarianController = require('./src/controllers/veterinarianController');
const loginController = require('./src/controllers/loginController.js');
const userController = require('./src/controllers/userController');
const registermedicineController = require('./src/controllers/registermedicineController');

//const userController = require('./src/controllers/userController');

router.get('/home', pagesController.getHome);
router.get('/manageUsers', pagesController.getManageUsers);
router.get('/login', pagesController.getLogin);

router.get('/getAllappointments', appointmentController.getAppointments);

router.get('/getAlladministrators', administratorController.getAdministrators);

router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

router.get('/getAllmedicines', medicineController.getMedicines);

router.get('/getAllpets', petController.getPets);

router.get('/getAllschedules', scheduleController.getSchedules);

router.get('/getAlltreatments', treatmentController.getTreatments);

router.get('/getAllvaccines', vaccineController.getVaccines);

router.get('/getPetOwners', petOwnerController.getPetOwners);

router.get('/getVeterinarians', veterinarianController.getVeterinarians);

router.post('/postLogin', loginController.login);

router.post('/postUser', userController.postUser);
router.put('/putUser', userController.putUser);

router.post('/postMedicine', registermedicineController.medicine);


//router.get('/postUser', userController.postUser);

module.exports = router;

