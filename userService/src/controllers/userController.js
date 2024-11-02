const db = require('./DBconnection');

// Get user by email
function getUserByEmail(email) {
    return db.query('SELECT * FROM user where email=?', email)
        .then(({ results }) => {
            if (results[0]) {
                console.log(results[0])
                return results[0];
            }
            else {
                console.log("No results");
                return null
            }
        }).catch((err) => {
            console.log('Error getting user by id:', err);
            throw err;});
}

// Get user by id
function getUserById(id) {
    return db.query('SELECT * FROM user where id=?', id)
        .then(({ results }) => {
            return results[0];
        });
}

function createUser(email, username, password) {
    return db.query('INSERT INTO user (email, username, password) VALUES (?, ?, ?)', [email, username, password])
        .then(({ results }) => {
            console.log("Results", results)
            return results.insertId;
        });
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
};