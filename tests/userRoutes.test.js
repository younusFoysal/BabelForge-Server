const { findUserByEmail, updateUser, addAllUser, findAllUsers } = require('../services/userService');
const { getUsersCollection } = require('../models/userModel');

// Mocking the userModel module
jest.mock('../models/userModel');

describe('User Service Tests', () => {
  const mockDb = {};  // Mock DB connection

  beforeEach(() => {
    jest.clearAllMocks();  // Clear mocks before each test
  });

  // Test findUserByEmail
  test('should find a user by email', async () => {
    const mockUser = { email: 'testuser@example.com', name: 'Test User' };

    // Mock the getUsersCollection to return an object with the findOne method
    getUsersCollection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await findUserByEmail(mockDb, 'testuser@example.com');
    expect(result).toEqual(mockUser);  // Expect the result to be the mock user
    expect(getUsersCollection).toHaveBeenCalledWith(mockDb);
  });

  // Test updateUser
  test('should update a user', async () => {
    const mockUser = { email: 'testuser@example.com', name: 'Updated User' };
    const mockUpdateResponse = { modifiedCount: 1 };

    getUsersCollection.mockReturnValue({
      updateOne: jest.fn().mockResolvedValue(mockUpdateResponse),
    });

    const result = await updateUser(mockDb, mockUser);
    expect(result).toEqual(mockUpdateResponse);  // Expect the update response
    expect(getUsersCollection).toHaveBeenCalledWith(mockDb);
    expect(getUsersCollection().updateOne).toHaveBeenCalledWith(
      { email: mockUser.email },
      { $set: { ...mockUser, timestamp: expect.any(Number) } },
      { upsert: true }
    );
  });

  // Test addAllUser
  test('should add a user', async () => {
    const mockUser = { email: 'newuser@example.com', name: 'New User' };
    const mockInsertResponse = { insertedId: 'newUserId' };

    getUsersCollection.mockReturnValue({
      insertOne: jest.fn().mockResolvedValue(mockInsertResponse),
    });

    const result = await addAllUser(mockDb, mockUser);
    expect(result).toEqual(mockInsertResponse);
    expect(getUsersCollection).toHaveBeenCalledWith(mockDb);
    expect(getUsersCollection().insertOne).toHaveBeenCalledWith(mockUser);
  });

  // Test findAllUsers
  test('should return all users', async () => {
    const mockUsers = [
      { email: 'user1@example.com', name: 'User One' },
      { email: 'user2@example.com', name: 'User Two' }
    ];

    getUsersCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockUsers),
      }),
    });

    const result = await findAllUsers(mockDb);
    expect(result).toEqual(mockUsers);  // Expect the array of users
    expect(getUsersCollection().find().toArray).toHaveBeenCalled();
  });
});
