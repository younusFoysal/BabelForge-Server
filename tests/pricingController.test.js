const request = require('supertest');
const express = require('express');
const { getSinglePrice } = require('../controllers/pricingController');
const { getPricingCollection } = require('../models/pricingModel');
const { ObjectId } = require('mongodb'); 

jest.mock('../models/pricingModel');

const app = express();
app.use(express.json());
app.locals.db = {}; 
app.get('/pricing/:id', getSinglePrice);

describe('Pricing Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get a single price by ID', async () => {
    const mockPrice = { _id: new ObjectId(), title: 'Basic Plan', price: 10 }; 
    const id = mockPrice._id.toHexString();

    getPricingCollection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockPrice),
    });

    const response = await request(app).get(`/pricing/${id}`);

    expect(response.status).toBe(200);
    expect(getPricingCollection).toHaveBeenCalledWith(app.locals.db);
    expect(getPricingCollection().findOne).toHaveBeenCalledWith({ _id: new ObjectId(id) });
  });
});
