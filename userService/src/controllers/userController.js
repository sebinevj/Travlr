const db = require('./DBconnection');

// Get user by email
function getUserByEmail(email) {
    return db.query('SELECT * FROM user where email=?', email)
        .then(({ results }) => {
            if (results[0]) {
                return results[0];
            }
            else {
                return null
            }
        }).catch((err) => {
            // console.error('Error getting user by id:', err);
            throw err;});
}

// Get user by id
function getUserById(id) {
    return db.query('SELECT * FROM user where id=?', id)
        .then(({ results }) => {
            return results[0];
        });
}

function createUser(email, username) {
    return db.query('INSERT INTO user (email, username) VALUES (?, ?)', [email, username])
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