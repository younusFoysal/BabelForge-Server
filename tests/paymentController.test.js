const request = require('supertest');
const express = require('express');
const { addPayment, getAllPayment, getSinglePayment } = require('../controllers/paymentController');
const { addPaymentService } = require('../services/paymentService');
const { getPaymentCollection } = require('../models/paymentModel');

jest.mock('../services/paymentService');
jest.mock('../models/paymentModel');

const app = express();
app.use(express.json());
app.locals.db = {}; // Mock db object
app.post('/payments', addPayment);
app.get('/payments', getAllPayment);
app.get('/payments/:email', getSinglePayment);

describe('Payment Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add a payment', async () => {
    const mockPayment = { amount: 100, email: 'tarek@gmail.com', method: 'credit card' };
    const mockResponse = { success: true, message: 'Payment added successfully' };

    addPaymentService.mockResolvedValue(mockResponse);

    const response = await request(app).post('/payments').send(mockPayment);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(addPaymentService).toHaveBeenCalledWith(app.locals.db, mockPayment);
  });

  test('should get all payments', async () => {
    const mockPayments = [
      { amount: 100, email: 'user1@example.com', method: 'credit card' },
      { amount: 200, email: 'user2@example.com', method: 'paypal' },
    ];

    getPaymentCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockPayments),
      }),
    });

    const response = await request(app).get('/payments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPayments);
    expect(getPaymentCollection).toHaveBeenCalledWith(app.locals.db);
    expect(getPaymentCollection().find().toArray).toHaveBeenCalled();
  });

  test('should get a single payment by email', async () => {
    const mockPayment = { amount: 100, email: 'tarek@gmail.com', method: 'credit card' };
    const email = 'tarek@gmail.com';

    getPaymentCollection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockPayment),
    });

    const response = await request(app).get(`/payments/${email}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPayment);
    expect(getPaymentCollection).toHaveBeenCalledWith(app.locals.db);
    expect(getPaymentCollection().findOne).toHaveBeenCalledWith({ email });
  });
});
