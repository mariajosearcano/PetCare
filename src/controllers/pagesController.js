const path = require('path');

function getHome(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
}

function getManageUsers(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageUsers.html'));
}

function getLogin(req, res) {
    res.sendFile(path.join(__dirname, '../html/login.html'));
}

function getManageMedicines(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageMedicines.html'));
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
    getPassword
}