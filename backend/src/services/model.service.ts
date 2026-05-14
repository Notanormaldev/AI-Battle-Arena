import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai"
import { ChatCohere } from "@langchain/cohere"

import configapis from "../config/config.js";

export  const geminimodel = new ChatGoogle({
    model:'gemini-flash-latest',
    apiKey:configapis.GOOGLE_API_KEY
});

export const mistralmodel = new ChatMistralAI({
    model:'mistral-medium-latest',
    apiKey:configapis.MISTRAL_API_KEY
});

export const coheremodel = new ChatCohere({
    model:'command-a-03-2025',
    apiKey:configapis.COHERE_API_KEY
})