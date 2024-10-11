const db = require('./DBconnection');

// Get user by id 
function getUserById(id) {
    return db.query('SELECT * FROM user where id=?', id)
        .then(({ results }) => {
            return results[0];
        });
}

module.exports = {
    getUserById
};