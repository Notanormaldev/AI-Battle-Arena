import { log } from "node:console";
import app from "./src/app.js";


let PORT=process.env.PORT || 3000
app.listen(PORT ,()=>{
    console.log(`server run on ${PORT}`);  
})