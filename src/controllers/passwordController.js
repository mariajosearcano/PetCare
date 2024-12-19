const crypto = require ('crypto');



async function encryptPassword(password) {
    try {
        return crypto.createHash('md5').update(password).digest('hex');
    } catch (err) {
        console.error('Error encrypting password: ', err);
        return null;
    }
}



module.exports = {
    encryptPassword
}