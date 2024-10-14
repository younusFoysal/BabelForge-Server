const { getAIResponse } = require('../controllers/aiController');
const { startChat } = require('../services/aiService');

jest.mock('../services/aiService', () => ({
    startChat: jest.fn(),
}));

describe('AI Controller Tests', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {
            body: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if prompt is missing', async () => {
        await getAIResponse(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Prompt is required.' });
    });

    test('should return AI response successfully', async () => {
        const mockPrompt = 'Hello, AI!';
        const mockAIResponse = 'Hello! How can I assist you today?';

        mockReq.body.prompt = mockPrompt;
        startChat.mockResolvedValue(mockAIResponse);

        await getAIResponse(mockReq, mockRes);

        expect(startChat).toHaveBeenCalledWith(mockPrompt);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ response: mockAIResponse });
    });

    test('should return 500 if AI response fetching fails', async () => {
        const mockPrompt = 'Hello, AI!';
        mockReq.body.prompt = mockPrompt;
        startChat.mockRejectedValue(new Error('AI service error'));

        await getAIResponse(mockReq, mockRes);

        expect(startChat).toHaveBeenCalledWith(mockPrompt);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to fetch AI response.' });
    });
});
