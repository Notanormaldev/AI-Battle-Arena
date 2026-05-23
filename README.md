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

### *The High Court of Artificial Intelligence — where AI models argue, and an AI judge decides.*

<br/>

[![Live Demo](https://img.shields.io/badge/⚡_LIVE_DEMO-Enter_The_Court-8B4513?style=for-the-badge&logoColor=white)](https://ai-battle-arena-ds7b.onrender.com/)
![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent_Orchestration-1a1a2e?style=for-the-badge)
![LangChain](https://img.shields.io/badge/LangChain-AI_Framework-00A67E?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Backend-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white)

<br/>

</div>

---

<br/>

## ⚖️ Order in the Court

**AI Battle Arena** is a courtroom-themed AI battle platform. You submit a prompt — called a **Brief** — and two AI models argue their case side by side. A third AI model sits as the **Presiding Judge** and delivers a binding verdict with scores and judicial reasoning.

No human bias. No subjective opinion. Pure AI vs AI — judged by AI.

<br/>

<div align="center">

![Screenshot 1](./assets/1.png)

</div>

<br/>

## 🏛️ The Courtroom — UI Breakdown

Every element of the interface is designed around a real courtroom. This isn't just a theme — it's the entire interaction model.

<br/>

| Element | Role | Description |
|---------|------|-------------|
| ⚖️ **The Bench** | Presiding Judge | Google Gemini AI — delivers the final verdict with score and judicial reasoning |
| 🏛️ **Witness Box I & II** | Counsel AI-1 & AI-2 | Mistral AI (Defense) and Cohere AI (Prosecution) present their answers side by side |
| 📁 **Case File** | Center Panel | Displays the litigation subject (your prompt) — the matter before the court |
| 🎙️ **The Podium** | Input Bar | Where you submit your brief — the bottom input that initiates the session |
| 📋 **Court Ledger** | History Drawer | Collapsible panel (top right) that stores all past dockets and sessions |
| 📜 **Dockets** | Prompt History | Previous prompts listed under the Case File — select any to revisit that battle |
| 🔴 **Judicial Finding** | Verdict Card | Score badge + judge's written reasoning rendered under each Witness Box |

<br/>

<div align="center">

![Screenshot 2](./assets/2.png)

</div>

<br/>

## 🧠 The Intelligence Stack

Under the hood, the courtroom runs on a **stateful multi-agent LangGraph pipeline** — a graph-based execution engine that coordinates three AI agents with full control over parallel dispatch, state, and verdict aggregation.

**LangChain** acts as the universal adapter layer so every model receives the exact same prompt under identical conditions — zero bias, maximum fairness.

<br/>

```
                        ┌──────────────────────────────┐
                        │    Brief (User Prompt)        │
                        │    Submitted at The Podium    │
                        └──────────────┬───────────────┘
                                       │
                        ┌──────────────▼───────────────┐
                        │     LangGraph Orchestrator    │
                        │     (Stateful Agent Graph)    │
                        └───┬──────────────────────┬───┘
                            │  parallel dispatch   │
              ┌─────────────▼──┐              ┌────▼──────────────┐
              │  Witness Box I  │              │  Witness Box II    │
              │  Mistral AI     │              │  Cohere AI         │
              │  (Defense)      │              │  (Prosecution)     │
              └─────────────┬──┘              └────┬──────────────┘
                            │                      │
                        ┌───▼──────────────────────▼───┐
                        │         THE BENCH             │
                        │      Google Gemini AI         │
                        │      (Presiding Judge)        │
                        │  Scores + Judicial Reasoning  │
                        └───────────────────────────────┘
                                       │
                        ┌──────────────▼───────────────┐
                        │    Verdict Delivered           │
                        │    Logged to Court Ledger      │
                        └──────────────────────────────┘
```

<br/>

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Backend
- **Runtime** — Node.js + TypeScript (ESM)
- **Framework** — Express v5
- **AI Orchestration** — LangGraph (stateful multi-agent graph)
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
- **Theme** — Vintage Courtroom (custom hand-crafted)
- **Architecture** — Single Page Application
- **Communication** — REST API
- **Deploy** — Render (Static Site)

</td>
</tr>
</table>

<br/>

## 🔬 How LangGraph Runs the Trial

Each battle is a **compiled LangGraph graph** with discrete, stateful nodes:

- **Dispatch Node** — Fans out the brief to both Counsel nodes simultaneously in parallel
- **Counsel Nodes** — Mistral and Cohere run as isolated agents with independent retry and timeout handling
- **Judge Node** — Google Gemini receives both responses and evaluates them, returning a score and written judicial finding for each
- **Aggregation Node** — Collects the full trial record, normalizes it via LangChain's unified schema, and commits it to the Court Ledger
- **State** — The entire session (prompt → responses → verdict → scores) flows through a typed state object, making every trial reproducible

Adding a new AI model = adding a new Counsel node. The judge and orchestration logic stay untouched.

<br/>

## 🤖 Court Constituents

| Role | Model | Provider |
|------|-------|----------|
| ⚖️ **Presiding Judge** | Gemini | Google |
| 🛡️ **Defense Counsel** | Mistral | MistralAI |
| ⚔️ **Prosecution Counsel** | Command R | Cohere |

<br/>

---

<div align="center">

*"UPON DUE CONSIDERATION of the compelling pleadings filed herein..."*

**The Court is now in session.**

[![Enter the Arena](https://img.shields.io/badge/⚖️_Enter_The_Court-8B4513?style=for-the-badge)](https://ai-battle-arena-ds7b.onrender.com/)

<br/>

*Made by [Notanormaldev](https://github.com/Notanormaldev)*

</div>
