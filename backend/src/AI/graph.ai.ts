import { StateGraph,StateSchema,type GraphNode } from "@langchain/langgraph";
import z from 'zod'
import { coheremodal, mistralmodal } from "./model.ai.js";

const state = new StateSchema({
   problem: z.string().default(''),
   solution_1:z.string().default(''),
   solution_2:z.string().default(''),
   judge:z.object({
    solution_1_score:z.number().default(0),
    solution_2_score:z.number().default(0),
    solution_1_reson:z.string().default(''),
    solution_2_reson:z.string().default(''),
   })
   
})



const solution_node:GraphNode<typeof state>=async(state)=>{

    const [mistralresponse, cohereresponse]=await Promise.all([
        mistralmodal.invoke(state.problem),
        coheremodal.invoke(state.problem)
    ])

    return{
        solution_1:mistralresponse,
        solution_2:coheremodal
    }
}