const getPricingCollection = (db) =>{
    return db.collection('pricingCard');
};

module.exports = {getPricingCollection};