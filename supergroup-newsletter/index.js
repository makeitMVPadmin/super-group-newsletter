const { OpenAI } = require("openai");
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    organization: API_KEY,
});


const runPrompt = async () => {

    const prompt = "Tell me a joke about a cat eating pasta.";

    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.7,
    });

    console.log(response.data.choices[0].text);

}

runPrompt()