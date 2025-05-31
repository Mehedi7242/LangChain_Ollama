# 🧠 LangChain RAG with Ollama (Local LLM)

This project demonstrates how we can install Ollama Locally and use langchain.js to give context and generate answer .

It allows you to load a `.txt` file as context and ask questions about it — completely offline!

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) installed  
- [Ollama](https://ollama.com) installed

---

## Getting Started

### Install Ollama

If you haven’t already, download and install Ollama from:

👉 https://ollama.com

Then, pull the model you want to use. For example:

```bash
ollama pull llama3.2:3b
```
### Install Dependencies
In your project directory

```bash
npm install
```

### Start Ollama
```bash
ollama run llama3.2:3b

```

### Run Your Project
```bash
node fileName.js

```
