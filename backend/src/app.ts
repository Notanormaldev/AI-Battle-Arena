import express from 'express';

const app= express();
app.get('/health',(req,res)=>{
    res.status(200).json({msg:'ok'})
})
export default app;