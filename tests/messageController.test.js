const request = require('supertest');
const express = require('express');
const { addMessage, AllMessage, deleteMessage } = require('../controllers/messageController');
const { addMessages, AllMessages, deleteMessages } = require('../services/messageService');

jest.mock('../services/messageService');

const app = express();
app.use(express.json());
app.locals.db = {}; // Mock db object
app.post('/messages', addMessage);
app.get('/messages', AllMessage);
app.delete('/messages/:id', deleteMessage);

describe('Message Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add a message', async () => {
    const mockMessage = { content: 'Hello, World!', author: 'User1' };
    const mockResponse = { success: true, message: 'Message added successfully' };

    addMessages.mockResolvedValue(mockResponse);

    const response = await request(app).post('/messages').send(mockMessage);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(addMessages).toHaveBeenCalledWith(app.locals.db, mockMessage);
  });

  test('should get all messages', async () => {
    const mockMessages = [
      { content: 'Hello, World!', author: 'User1' },
      { content: 'How are you?', author: 'User2' },
    ];
    
    AllMessages.mockResolvedValue(mockMessages);

    const response = await request(app).get('/messages');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMessages);
    expect(AllMessages).toHaveBeenCalledWith(app.locals.db);
  });

  test('should delete a message', async () => {
    const mid = 'messageId123';
    const mockResponse = { success: true, message: 'Message deleted successfully' };

    deleteMessages.mockResolvedValue(mockResponse);

    const response = await request(app).delete(`/messages/${mid}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(deleteMessages).toHaveBeenCalledWith(app.locals.db, mid);
  });
});
