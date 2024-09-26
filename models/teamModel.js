const getTeamsCollection = (db) => {
    return db.collection('teams');
}
module.exports = { getTeamsCollection };