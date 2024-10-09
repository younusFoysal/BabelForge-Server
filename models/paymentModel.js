const getPaymentCollection = (db) =>{
    return db.collection('payment');
};

module.exports = {getPaymentCollection};