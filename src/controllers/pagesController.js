const path = require('path');

function getHome(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
}

function getManageUsers(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageUsers.html'));
}
function getManageMedicines(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageMedicines.html'));
}

function getLogin(req, res) {
    res.sendFile(path.join(__dirname, '../html/login.html'));
}

function getAdmin(req, res) {
    res.sendFile(path.join(__dirname, '../html/admin.html'));
}

function getFormsPetOwner(req, res) {
    res.sendFile(path.join(__dirname, '../html/formsPetOwner.html'));
}

function getPetOwner(req, res) {
    res.sendFile(path.join(__dirname, '../html/petOwner.html'));
}

function getManagePet(req, res) {
    res.sendFile(path.join(__dirname, '../html/managePet.html'));
}

function getScheduleAppointment(req, res) {
    res.sendFile(path.join(__dirname, '../html/scheduleAppointment.html'));
}

function getPassword(req, res) {
    res.sendFile(path.join(__dirname, '../html/password.html'));
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
    getScheduleAppointment,
    getPassword
}