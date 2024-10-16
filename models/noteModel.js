const getNoteCollection = (db) => {
    return db.collection('notes');
}
module.exports = { getNoteCollection };