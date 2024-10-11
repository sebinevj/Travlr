const db = require('./DBconnection');

// Get region by id 
function getRegionById(id) {
    return db.query('SELECT * FROM region where id=?', id)
        .then(({ results }) => {
            return results[0];
        });
}

function getRegions() {
    console.log("In region DAO")
    return db.query('SELECT * FROM region')
        .then(({ results }) => {
            return results;
        });
}

// Get posts by region
function getPostsForRegion(id) {
    return db.query('SELECT * FROM post where region_id=?', id)
        .then(({ results }) => {
            return results;
        });
}

module.exports = {
    getRegionById, 
    getRegions, 
    getPostsForRegion
};