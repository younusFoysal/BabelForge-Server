const { findUserByEmail, updateUser, addAllUser, findAllUsers } = require('../services/userService');
const { getUsersCollection } = require('../models/userModel');

jest.mock('../models/userModel');

describe('User Service Tests', () => {
  const mockDb = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should find a user by email', async () => {
    const mockUser = { email: 'tarek@test.com', name: 'Shikder' };
    getUsersCollection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await findUserByEmail(mockDb, 'tarek@test.com');
    expect(result).toEqual(mockUser);
    expect(getUsersCollection).toHaveBeenCalledWith(mockDb);
  });

  test('should update a user', async () => {
    const mockUser = { email: 'tarek@test.com', name: 'Shikder Tarek' };
    const mockUpdateResponse = { modifiedCount: 1 };

    getUsersCollection.mockReturnValue({
      updateOne: jest.fn().mockResolvedValue(mockUpdateResponse),
    });

    const result = await updateUser(mockDb, mockUser);
    expect(result).toEqual(mockUpdateResponse);
    expect(getUsersCollection).toHaveBeenCalledWith(mockDb);
    expect(getUsersCollection().updateOne).toHaveBeenCalledWith(
      { email: mockUser.email },
      { $set: { ...mockUser, timestamp: expect.any(Number) } },
      { upsert: true }
    );
  });

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
    expect(result).toEqual(mockUsers);
    expect(getUsersCollection().find().toArray).toHaveBeenCalled();
  });
});
