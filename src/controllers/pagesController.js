const path = require('path');


//general
function getHome(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
}

function getManageMedicinesVeterinarian(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageMedicineVeterinarian.html'));
}

function getLogin(req, res) {
    res.sendFile(path.join(__dirname, '../html/login.html'));
}

function getFormsPetOwner(req, res) {
    res.sendFile(path.join(__dirname, '../html/formsPetOwner.html'));
}

function getPassword(req, res) {
    res.sendFile(path.join(__dirname, '../html/password.html'));
}


//administrator
function getAdmin(req, res) {
    res.sendFile(path.join(__dirname, '../html/admin.html'));
}

function getManageUsers(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageUsers.html'));
}

function getManageMedicines(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageMedicines.html'));
}

function getManageSchedules(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageSchedules.html'));
}

function getChangePasswordAdministrator(req, res) {
    res.sendFile(path.join(__dirname, '../html/changePasswordAdministrator.html'));
}


// pet owner
function getPetOwner(req, res) {
    res.sendFile(path.join(__dirname, '../html/petOwner.html'));
}

function getManagePet(req, res) {
    res.sendFile(path.join(__dirname, '../html/managePet.html'));
}

function getScheduleAppointment(req, res) {
    res.sendFile(path.join(__dirname, '../html/scheduleAppointment.html'));
}

function getMedicalRecord(req, res) {
    res.sendFile(path.join(__dirname, '../html/medicalRecord.html'));
}


// veterinarian
function getVeterinarians(req, res) {
    res.sendFile(path.join(__dirname, '../html/veterinarian.html'));
}

function getTreatment(req, res){
    res.sendFile(path.join(__dirname, '../html/treatment.html'));
}

function getregisterPetOwner(req, res){
    res.sendFile(path.join(__dirname, '../html/registerPetOwner.html'));
}

function getScheduleAppointmentVeterinarian(req, res) {
    res.sendFile(path.join(__dirname, '../html/scheduleAppointmentVeterinarian.html'));
}



module.exports = {
    getHome,
    getManageMedicinesVeterinarian,
    getLogin,
    getFormsPetOwner,
    getPassword,
    //administrator
    getAdmin,
    getManageUsers,
    getManageMedicines,
    getManageSchedules,
    getChangePasswordAdministrator,
    //pet owner
    getPetOwner,
    getManagePet,
    getScheduleAppointment,
    getMedicalRecord,
    //veterinarian
    getVeterinarians,
    getTreatment,
    getregisterPetOwner,
    getScheduleAppointmentVeterinarian
}