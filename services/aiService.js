// Import the GoogleGenerativeAI
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use your actual API key here

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to handle chat interactions
const startChat = async (userMessage) => {
    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Great to meet you. What would you like to know?" }],
                },
            ],
        });

        // Send the user's message
        let result = await chat.sendMessage(userMessage);
        console.log(result.response.text());

        // Example of how to ask another question
        // result = await chat.sendMessage("How many paws are in my house?");
        // console.log(result.response.text());

        return result.response.text(); // Return the final response
    } catch (error) {
        console.error('Error during chat interaction:', error);
        throw new Error('Failed to communicate with AI');
    }
};

module.exports = { startChat };
