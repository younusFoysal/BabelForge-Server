const { fetchAIResponse } = require('../services/aiService');

const getAIResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required.' });
    }

    try {
        const response = await fetchAIResponse(prompt);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch AI response.' });
    }
};

module.exports = { getAIResponse };
