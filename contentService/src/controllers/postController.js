const db = require('./DBconnection');

// Get user by id 
function getPostById(id) {
    return db.query('SELECT user.username, post.description FROM post JOIN user on user.id=post.user_id where post.id=?', id)
        .then(({ results }) => {
            console.log(results);
            return results[0];
        });
}

function getPostComments(id) {
    return db.query('SELECT comment.description, user.username FROM comment JOIN user ON user.id=comment.user_id where comment.post_id=?', id)
        .then(({ results }) => {
            console.log(results);
            return results;
        });
}

function createPost(user_id, region_id, description) {
    return db.query('INSERT INTO post (user_id, region_id, description) VALUES (?, ?, ?)', [user_id, region_id, description])
        .then(({ results }) => {
            console.log("Results", results)
            return results.insertId;
        });
}

module.exports = {
    getPostById,
    getPostComments,
    createPost
};