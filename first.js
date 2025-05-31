import { ChatOllama } from "@langchain/ollama";


const llm = new ChatOllama({
    model: "llama3.2:3b",
    temperature:0.3,
})

const prompt = "Translate the following text to Bangla :How are you ?"

const result =await llm.invoke(prompt)

console.log(result.content)

