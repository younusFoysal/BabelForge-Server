
const getMessagesCollection = (db) => {
    return db.collection("messages");
};


module.exports = { getMessagesCollection };