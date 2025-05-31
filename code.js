import fs from "fs/promises";
import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

// Split text by paragraphs/Q&A blocks with a max char limit to keep context coherent
function splitByParagraphs(text, maxChars = 1500) {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = "";

  for (const para of paragraphs) {
    if ((currentChunk + para).length < maxChars) {
      currentChunk += (currentChunk ? "\n\n" : "") + para;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = para;
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}
async function run() {
  try {
    // 1. Load text content from file
    const text = await fs.readFile("data/knowledge.txt", "utf8");
    // 2. Split text by paragraphs/Q&A blocks
    const splitDocs = splitByParagraphs(text, 1500);
    // 3. Build context by joining first few paragraphs
    const context = splitDocs.slice(0, 3).join("\n---\n");
    // 4. Prepare prompt with context and question
    const question = "Virtual Meetups ?";
    const promptTemplate = PromptTemplate.fromTemplate(`
Answer the question based only on the context below.

Context:
{context}

Question:
{question}
`);
    const prompt = await promptTemplate.format({ context, question });
    // 5. Initialize Ollama LLM
    const llm = new ChatOllama({
      model: "llama3.2:3b",
      temperature: 0.7,
    });
    // 6. Invoke the model
    const response = await llm.invoke(prompt);

    // 7. Print the answer
    console.log("Answer:\n", response.content);
  } catch (error) {
    console.error("Error running script:", error);
  }
}

run();
