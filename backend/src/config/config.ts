import { MistralAI } from "@langchain/mistralai";
import { configDotenv } from "dotenv";
configDotenv()

type configapi={
 Mistral:string ,
 Gemini: string,
 Cohere: string,
}

const config:configapi={
 Mistral:process.env.MISTRAL_API_KEY || "" ,
 Gemini:process.env.GOOGLE_API_KEY   || "" ,
 Cohere:process.env.COHERE_API_KEY   || "" ,
}

export default config