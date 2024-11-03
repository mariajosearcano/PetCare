const path = require('path');

function getHome(req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
}

function getManageUsers(req, res) {
    res.sendFile(path.join(__dirname, '../html/manageUsers.html'));
}

function getLogin(req, res) {
    res.sendFile(path.join(__dirname, '/src/html/login.html'));
}

function getAdmin(req, res) {
    res.sendFile(path.join(__dirname, '/src/html/admin.html'));
}

function getFormsPetOwner(req, res) {
    res.sendFile(path.join(__dirname, '/src/html/formsPetOwner.html'));
}

function getManagePet(req, res) {
    res.sendFile(path.join(__dirname, '/src/html/managePet.html'));
}

function getPassword(req, res) {
    res.sendFile(path.join(__dirname, '/src/html/password.html'));
}

module.exports = {
    getHome,
    getLogin,
    getManageUsers,
    getAdmin,
    getFormsPetOwner,
    getManagePet,
    getPassword
}