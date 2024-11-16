const path = require('path');

function getAdmin(req, res) {
    res.sendFile(path.join(__dirname, '../html/admin.html'));
}

function getHome(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
}

function getManageUsers(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageUsers.html'));
}
function getManageMedicines(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageMedicines.html'));
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

module.exports = {
    getHome,
    getLogin,
    getManageUsers,
    getManageMedicines,
    getAdmin,
    getFormsPetOwner,
    getPetOwner,
    getManagePet,
    getPassword,
    getVeterinarians,
    getManageMedicinesVeterinarian,
    getScheduleAppointment,
    getTreatment,
    getregisterPetOwner
}