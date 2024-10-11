const db = require('./DBconnection');

// Get user by id 
function getCommentById(id) {
    return db.query('SELECT * FROM comment where id=?', id)
        .then(({ results }) => {
            return results[0];
        });
}


function createComment(user_id, post_id, description) {
    return db.query('INSERT INTO comment (user_id, post_id, description) VALUES (?, ?, ?)', [user_id, post_id, description])
        .then(({ results }) => {
            console.log("Results", results)
            return results.insertId;
        });
}


module.exports = {
    getCommentById, 
    createComment
};