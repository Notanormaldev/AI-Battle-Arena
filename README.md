<div align="center">

<br/>

```
  ██████╗  █████╗ ████████╗████████╗██╗     ███████╗     █████╗ ██████╗ ███████╗███╗   ██╗ █████╗ 
  ██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██║     ██╔════╝    ██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔══██╗
  ██████╔╝███████║   ██║      ██║   ██║     █████╗      ███████║██████╔╝█████╗  ██╔██╗ ██║███████║
  ██╔══██╗██╔══██║   ██║      ██║   ██║     ██╔══╝      ██╔══██║██╔══██╗██╔══╝  ██║╚██╗██║██╔══██║
  ██████╔╝██║  ██║   ██║      ██║   ███████╗███████╗    ██║  ██║██║  ██║███████╗██║ ╚████║██║  ██║
  ╚═════╝ ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝
```

### *Watch the world's most powerful AI models go head-to-head. Only one wins.*

<br/>

[![Live Demo](https://img.shields.io/badge/⚡_LIVE_DEMO-Visit_Now-FF4500?style=for-the-badge&logoColor=white)](https://ai-battle-arena-ds7b.onrender.com/)
![LangGraph](https://img.shields.io/badge/LangGraph-Orchestration-1a1a2e?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgc3Ryb2tlPSIjNjM2NkYxIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-AI_Framework-00A67E?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Backend-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white)

<br/>

</div>

---

<br/>

## ⚔️ What is AI Battle Arena?

**AI Battle Arena** is a real-time platform where multiple large language models compete against each other on the same prompt — simultaneously. You pick the question. The AIs fight for the best answer. You decide who wins.

No benchmarks. No synthetic tests. Just raw, unfiltered AI intelligence — judged by you.

<br/>

<div align="center">

![Screenshot 1](./assets/1.png)

</div>

<br/>

## 🧠 The Intelligence Stack

At its core, AI Battle Arena is built on a **stateful multi-agent orchestration pipeline** powered by **LangGraph** — a graph-based execution engine that coordinates multiple AI agents with full control over state, routing, and parallelism.

**LangChain** acts as the universal adapter layer, standardizing communication across wildly different AI providers so every model gets the same prompt, under the same conditions, with zero bias.

<br/>

```
                          ┌─────────────────────────┐
                          │      User Prompt         │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │    LangGraph Orchestrator │
                          │    (State Machine)        │
                          └──┬────────┬──────────┬──┘
                             │        │          │
               ┌─────────────▼─┐  ┌───▼──────┐  ┌▼──────────────┐
               │  Google Gemini │  │  Mistral  │  │    Cohere      │
               └───────────────┘  └──────────┘  └────────────────┘
                             │        │          │
                          ┌──▼────────▼──────────▼──┐
                          │     Response Aggregator   │
                          │     (LangChain Unified)   │
                          └─────────────┬────────────┘
                                        │
                          ┌─────────────▼────────────┐
                          │      Battle Results        │
                          └──────────────────────────┘
```

<br/>

<div align="center">

![Screenshot 2](./assets/2.png)

</div>

<br/>

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Backend
- **Runtime** — Node.js + TypeScript (ESM)
- **Framework** — Express v5
- **AI Orchestration** — LangGraph (stateful agent graphs)
- **AI Framework** — LangChain (unified provider interface)
- **AI Providers** — Google Gemini · MistralAI · Cohere
- **Schema Validation** — Zod
- **Database** — MongoDB via Mongoose
- **Logging** — Morgan
- **Deploy** — Render

</td>
<td valign="top" width="50%">

### Frontend
- **Core** — JavaScript · HTML · CSS
- **Architecture** — Single Page Application
- **Styling** — Custom CSS (no frameworks)
- **Communication** — REST API
- **Deploy** — Render (Static Site)

</td>
</tr>
</table>

<br/>

<div align="center">

![Screenshot 3](./assets/3.png)

</div>

<br/>

## 🔬 How LangGraph Powers the Battles

LangGraph enables something standard API calls can't — **stateful, parallel, conditional multi-agent execution**.

Each battle is a **compiled graph** with discrete nodes:

- **Dispatch Node** — Fans out the prompt to all registered model nodes in parallel
- **Model Nodes** — Each AI provider runs as an isolated node with its own retry logic and timeout handling
- **Aggregation Node** — Collects all responses, normalizes them via LangChain's unified schema, and prepares the battle result
- **State** — The entire battle lifecycle (prompt → responses → metadata) flows through a typed state object, enabling reproducibility and debugging

This graph-based approach means adding a new AI model is as simple as adding a new node — the orchestration logic stays untouched.

<br/>

## 🤖 Models in the Arena

| Model | Provider | Specialty |
|-------|----------|-----------|
| **Gemini** | Google | Multimodal reasoning, long context |
| **Mistral** | MistralAI | Efficiency, European AI sovereignty |
| **Command R** | Cohere | RAG-optimized, enterprise reasoning |

<br/>

---

<div align="center">

**Built with obsession. Powered by chaos.**

[![Live Demo](https://img.shields.io/badge/⚡_Enter_the_Arena-FF4500?style=for-the-badge)](https://ai-battle-arena-ds7b.onrender.com/)

<br/>

*Made by [Notanormaldev](https://github.com/Notanormaldev)*

</div>
