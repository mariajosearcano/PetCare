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


// hmtl
router.get('/home', pagesController.getHome);

router.get('/manageUsers', pagesController.getManageUsers);
router.get('/manageMedicines', pagesController.getManageMedicines);

router.get('/login', pagesController.getLogin);

router.get('/petOwner', pagesController.getPetOwner);
router.get('/managePet', pagesController.getManagePet);

// funcionalidades
router.get('/getAllappointments', appointmentController.getAppointments);

router.get('/getAlladministrators', administratorController.getAdministrators);

router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

router.get('/getAllmedicines', medicineController.getMedicines);

router.get('/getAllschedules', scheduleController.getSchedules);

router.get('/getAlltreatments', treatmentController.getTreatments);

router.get('/getAllvaccines', vaccineController.getVaccines);

router.post('/postPetOwner', petOwnerController.postPetOwner);
router.get('/getPetOwners', petOwnerController.getPetOwners);
router.put('/putPetOwner', petOwnerController.putPetOwner);
router.delete('/deletePetOwner', petOwnerController.deletePetOwner);

router.post('/postVeterinarian', veterinarianController.postVeterinarian);
router.get('/getVeterinarians', veterinarianController.getVeterinarians);
router.put('/putVeterinarian', veterinarianController.putVeterinarian);
router.delete('/deleteVeterinarian', veterinarianController.deleteVeterinarian);

router.post('/postLogin', loginController.login);

router.post('/postMedicine', registermedicineController.medicine);

// pet
router.post('/postPet', petController.createPets);  // crear url para la funcion
router.get('/getPet', petController.getPets);
// router.put('/putPet', petController.putPet);
router.delete('/deletePet/:name', petController.deletePets);


module.exports = router;

