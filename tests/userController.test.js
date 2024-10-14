const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const {
  addUser,
  createJwtToken,
  logout,
  createPaymentIntent,
  updateUserProfile,
  getUser,
  getAllUsers,
} = require('../controllers/userController');
const {
  findUserByEmail,
  updateUser,
  findAllUsers,
  addAllUser,
} = require('../services/userService');
const { generateJwtToken } = require('../utils/helpers');

jest.mock('../services/userService');
jest.mock('bcrypt');
jest.mock('../utils/helpers');

const app = express();
app.use(express.json());
app.locals.db = {};

app.post('/jwt', createJwtToken);
app.get('/logout', logout);
app.post('/create-payment-intent', createPaymentIntent);
app.post('/users/add', addUser);
app.put('/user', updateUserProfile);
app.get('/user/:email', getUser);
app.get('/users', getAllUsers);

describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a JWT token and set a cookie', async () => {
    const mockToken = 'testToken';
    generateJwtToken.mockReturnValue(mockToken);

    const response = await request(app)
      .post('/jwt')
      .send({ email: 'testuser@example.com', name: 'Test User' });

    expect(response.status).toBe(200);
    expect(generateJwtToken).toHaveBeenCalledWith({
      email: 'testuser@example.com',
      name: 'Test User',
    });
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  test('should clear the JWT cookie on logout', async () => {
    const response = await request(app).get('/logout');
    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  test('should add a new user and hash their password', async () => {
    const mockUser = { email: 'testuser@example.com', password: 'password' };
    const hashedPassword = 'hashedPassword';
    bcrypt.hashSync.mockReturnValue(hashedPassword);
    findUserByEmail.mockResolvedValue(null);
    addAllUser.mockResolvedValue({ insertedId: 'newUserId' });

    const response = await request(app)
      .post('/users/add')
      .send(mockUser);

    expect(response.status).toBe(201);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(mockUser.password, 16);
    expect(addAllUser).toHaveBeenCalledWith(app.locals.db, {
      ...mockUser,
      password: hashedPassword,
    });
  });

  test('should not add a user if the email already exists', async () => {
    const mockUser = { email: 'testuser@example.com', password: 'password' };
    findUserByEmail.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/users/add')
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(findUserByEmail).toHaveBeenCalledWith(app.locals.db, mockUser.email);
    expect(response.body.message).toBe('User already exists');
  });

  test('should update the user profile', async () => {
    const mockUser = { email: 'testuser@example.com', name: 'Updated User' };
    updateUser.mockResolvedValue({ modifiedCount: 1 });

    const response = await request(app)
      .put('/user')
      .send(mockUser);

    expect(response.status).toBe(200);
    expect(updateUser).toHaveBeenCalledWith(app.locals.db, mockUser);
    expect(response.body.modifiedCount).toBe(1);
  });

  test('should return a user by email', async () => {
    const mockUser = { email: 'testuser@example.com', name: 'Test User' };
    findUserByEmail.mockResolvedValue(mockUser);

    const response = await request(app).get('/user/testuser@example.com');

    expect(response.status).toBe(200);
    expect(findUserByEmail).toHaveBeenCalledWith(app.locals.db, 'testuser@example.com');
    expect(response.body).toEqual(mockUser);
  });

  test('should return all users', async () => {
    const mockUsers = [
      { email: 'user1@example.com', name: 'User One' },
      { email: 'user2@example.com', name: 'User Two' },
    ];
    findAllUsers.mockResolvedValue(mockUsers);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(findAllUsers).toHaveBeenCalledWith(app.locals.db);
    expect(response.body).toEqual(mockUsers);
  });
});
