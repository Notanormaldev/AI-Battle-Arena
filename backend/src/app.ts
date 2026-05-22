import express from 'express'
import rungarph from './AI/graph.ai.js';

const app = express();

// Simple, clean CORS middleware to allow the frontend to communicate
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json())

app.post('/invoke', async (req, res) => {
  const { input } = req.body

  try {
    const result = await rungarph(input)
    return res.status(200).json({
      result
    })
  } catch (error: any) {
    console.error("LangGraph invocation error:", error);
    return res.status(500).json({
      error: error.message || "Failed to execute debate"
    });
  }
})

export default app;