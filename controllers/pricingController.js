
const { ObjectId } = require("mongodb");
const { getPricingCollection } = require("../models/pricingModel");


const getAllPrice = async(req,res)=>{
    const db = req.app.locals.db;
    const priceCollection = getPricingCollection(db);
    const result = await priceCollection.find().toArray();
    res.send(result);
}

const getSinglePrice = async(req,res)=>{
    const db = req.app.locals.db;
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const priceCollection = getPricingCollection(db);
    const result = await priceCollection.findOne(query);
    res.send(result);
}

const updatePrice = async(req,res)=>{
    db = req.app.locals.db;
    const id = req.params.id;
    const priceCollection = getPricingCollection(db);
    const query = {_id: new ObjectId(id)};
    const {title,price,priceDetails,featuresTitle,features,buttonText} = req.body;

    const update = {
        $set: {
          ...(title && { title }),            
          ...(price && { price }),              
          ...(priceDetails && { priceDetails }), 
          ...(featuresTitle && { featuresTitle }),
          ...(features && { features }),        
          ...(buttonText && { buttonText }),     
        }
      };

      const result = await priceCollection.updateOne(query, update);
      res.send(result)

}

module.exports={
    getAllPrice, updatePrice
}