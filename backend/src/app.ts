import express from 'express'
import rungarph from './AI/graph.ai.js';



const app=express();
app.get('/',async(req,res)=>{
    const result = await rungarph("write a factorial code")

    return res.status(200).json({
        result
    })
})



export default app;