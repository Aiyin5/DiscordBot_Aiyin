const {
    OpenAIApi,
    Configuration
} = require("openai");
const { chatApiKey } = require('../../config.json');
const configuration = new Configuration({
    apiKey: chatApiKey
});

class OpenAI {
    constructor() {
        if (!OpenAI.instance) {
            OpenAI.instance = new OpenAIApi(configuration);
        }
        return OpenAI.instance;
    }
}

const openai = new OpenAI();

module.exports = openai;