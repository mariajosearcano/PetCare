const { routesByRole } = require('./routesByRoleController.js');



function getUserDocument(req, res, next){
    const document = req.cookies.document;

    if(!document) {
        return res.redirect('/login');
    }

    next();
}

function roleValidator(req, res, next){
    let role = req.cookies.role;
    let path = req.path;

    if(role === 'pet_owner') {
        if (!routesByRole.petOwner.includes(path)) {
            console.error('The route does not exist for the Pet Owner role');
            return res.redirect('/404')
        }
    } else if(role === 'veterinarian') {
        if (!routesByRole.veterinarian.includes(path)) {
            console.error('The route does not exist for the Veterinarian role');
            return res.redirect('/404')
        }
    } else if(role === 'clinic_administrator') {
        if (!routesByRole.administrator.includes(path)) {
            console.error('The route does not exist for the Administrator role');
            return res.redirect('/404')
        }
    } else {
        console.error('Authentication error');
        return res.redirect('/404')
    }

    next();
}

function logOut(req, res){
    res.clearCookie('document');
    res.clearCookie('role');
    return res.redirect('/home');
}



module.exports = {
    getUserDocument,
    roleValidator,
    logOut
}