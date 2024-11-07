const connection = require('../../db');

async function getPets(req, res) {
    connection.query('SELECT * FROM pet', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('there was an error getting the data'); 
        } else {
            console.log(results)
            res.json(results);
        }
    });
}





module.exports ={
    getPets
}