import { START, StateGraph,StateSchema,type GraphNode } from "@langchain/langgraph";
import z from 'zod'
import { coheremodal, geminimodal, mistralmodal } from "./model.ai.js";
import {createAgent ,HumanMessage,providerStrategy} from "langchain"
,
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



const solutionnode:GraphNode<typeof state>=async(state)=>{

    const [mistralresponse, cohereresponse]=await Promise.all([
        mistralmodal.invoke(state.problem),
        coheremodal.invoke(state.problem)
    ])

    return{
        solution_1:mistralresponse,
        solution_2:coheremodal
    }
}
const judgenode:GraphNode<typeof state>=async(state)=>{
    const {problem,solution_1,solution_2}=state,


    const agent = createAgent({
        model:geminimodal,
        responseFormat:providerStrategy(z.object({
            solution_1_score:z.number().min(0).max(10),
            solution_2_score:z.number().min(0).max(10),
            solution_1_reason:z.string(),
            solution_2_reason:z.string(),
        })),
        systemPrompt:`you are a judge that compares two solutions to a problem and gives them a score from 0 to 10, and also provides a reason for the score. The problem is ${problem}. The first solution is ${solution_1}. The second solution is ${solution_2}. Please provide your scores and reasons`
    })


     const judgerespons= await agent.invoke({
        messages:[new HumanMessage(
            `
            problem:${problem},
            solution_1:${solution_1},
            solution_2:${solution_2},
            please evaluate the two solutions and provide your scores and reasons`
        )
        ]
     })


     const {solution_1_reason,solution_1_score,solution_2_reason,solution_2_score}=judgerespons.structuredResponse
}

const graph = new StateGraph(state)
.addNode('solutionnode',solutionnode)
.addNode('judgenode',judgenode)
.addEdge(START,"solutionnode")
.addEdge("solutionnode","judgenode")
.addEdge("judgenode",END)
.compile()