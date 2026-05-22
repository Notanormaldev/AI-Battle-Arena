import express from 'express'
import rungarph from './AI/graph.ai.js';



const app=express();
app.use(express.json())
// app.get('/',async(req,res)=>{
//     const result = await rungarph("write a factorial code")

//     return res.status(200).json({
//         result
//     })
// })
app.post('/invoke',async (req,res)=>{
    const {input}=req.body

    const result = await rungarph(input)

    return res.status(200).json({
        result
    })
})



export default app;