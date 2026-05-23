import express from 'express'
import rungarph from './AI/graph.ai.js';
import cors from 'cors'
import path from 'path';

const app = express();


app.use(cors({
  origin:"https://ai-battle-arena-ds7b.onrender.com"
}))

app.use(express.json())
app.use(express.static('./public'))
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

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname , ".." , './public/index.html'))

})

export default app;