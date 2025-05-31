// index.js
import fs from "fs/promises";
import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

// Simple text splitter
function splitText(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
  }
  return chunks;
}

// 1. Load file
const text = await fs.readFile("data/knowledge.txt", "utf8");

// 2. Split manually
const splitDocs = splitText(text);

// 3. Build context from top 3 chunks (fake similarity for now)
const context = splitDocs.slice(0, 3).join("\n---\n");

// 4. Create prompt
const question = "when is vertual meetup ?";
const promptTemplate = PromptTemplate.fromTemplate(`
Answer the question based only on the context below.

Context:
{context}

Question:
{question}
`);
const prompt = await promptTemplate.format({ context, question });

// 5. Use Ollama
const llm = new ChatOllama({model: "llama3.2:3b", temperature: 1});
const response = await llm.invoke(prompt);

console.log("Answer:\n", response.content);
