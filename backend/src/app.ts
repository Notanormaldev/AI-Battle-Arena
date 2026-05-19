import express from 'express';
import morgan from 'morgan';
import usegraph from './services/graph.ai.service.js'
const app= express();
app.use(express.json())
app.use(morgan('dev'))
app.get('/health',(req,res)=>{
    res.status(200).json({msg:'ok'})
})

app.post('/usegraph',async (req,res)=>{
    await usegraph('what is  factorial')
    
})
export default app;