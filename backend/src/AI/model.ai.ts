import { ChatCohere } from "@langchain/cohere";
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";


export const geminimodal =new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:config.Gemini
})

export const mistralmodal= new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:config.Mistral
})

export const coheremodal=new ChatCohere({
    model:"command-a-03-2025",
    apiKey:config.Cohere
})

