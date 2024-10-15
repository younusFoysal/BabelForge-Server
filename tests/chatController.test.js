const chatService = require('../services/chatService');
const { getMessages, postMessage, deleteAllMessages } = require('../controllers/chatController');

jest.mock('../services/chatService', () => ({
    getAllMessages: jest.fn(),
    saveMessage: jest.fn(),
    deleteAllMessage: jest.fn(),
}));

describe('Chat Controller Tests', () => {
    let mockReq, mockRes, mockDb;

    beforeEach(() => {
        mockDb = {};
        mockReq = {
            app: {
                locals: { db: mockDb },
            },
            body: {},
        };
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getMessages should return all chat messages', async () => {
        const mockMessages = [{ message: 'Hello', username: 'User1' }, { message: 'Hi', username: 'User2' }];
        chatService.getAllMessages.mockResolvedValue(mockMessages);

        await getMessages(mockReq, mockRes);

        expect(chatService.getAllMessages).toHaveBeenCalledWith(mockDb);
        expect(mockRes.json).toHaveBeenCalledWith(mockMessages);
    });

    test('postMessage should save a new chat message', async () => {
        const mockMessage = { message: 'Hello', username: 'User1' };
        mockReq.body = mockMessage;
        const savedMessage = { ...mockMessage, _id: '123' };
        chatService.saveMessage.mockResolvedValue(savedMessage);

        await postMessage(mockReq, mockRes);

        expect(chatService.saveMessage).toHaveBeenCalledWith(mockDb, mockMessage);
        expect(mockRes.json).toHaveBeenCalledWith(savedMessage);
    });

    test('postMessage should return 400 if message or username is missing', async () => {
        mockReq.body = { message: '' };

        await postMessage(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Message and username are required' });
    });

    test('deleteAllMessages should delete all chat messages', async () => {
        const result = { deletedCount: 5 };
        chatService.deleteAllMessage.mockResolvedValue(result);

        await deleteAllMessages(mockReq, mockRes);

        expect(chatService.deleteAllMessage).toHaveBeenCalledWith(mockDb);
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.send).toHaveBeenCalled();
    });

    test('deleteAllMessages should return 500 if deletion fails', async () => {
        chatService.deleteAllMessage.mockRejectedValue(new Error('Delete failed'));

        await deleteAllMessages(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to delete messages' });
    });
});
