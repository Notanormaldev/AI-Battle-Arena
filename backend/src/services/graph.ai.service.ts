import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, StateGraph, START, END, type GraphNode, ReducedValue } from "@langchain/langgraph";
import {z} from 'zod'
import { coheremodel, geminimodel, mistralmodel } from "./model.service.js";
import { createAgent,providerStrategy } from "langchain";



const State = new StateSchema({
   messages: MessagesValue,
  solution_1:new ReducedValue(z.string().default(""),{
    reducer:(current,next)=>{
        return  next
    }
  }),
  solution_2:new ReducedValue(z.string().default(""),{
    reducer:(current,next)=>{
        return next
    }
  }),
  judge_recom:new ReducedValue(z.object().default({
    solution_1_score:0,
    solution_2_score:0
  }),{
    reducer:(current,next)=>{
        return next
    }
  })
});

const solutionnode:GraphNode<typeof State> =async(state:typeof State)=>{
  const [mistral_solution,cohere_solution]=await Promise.all([
    mistralmodel.invoke(state.messages[0].text),
    coheremodel.invoke(state.messages[0].text)
  ])
  console.log(state);
  
  return{
    solution_1:mistral_solution.text,
    solution_2:cohere_solution.text
   }
   
}
const judgenode:GraphNode<typeof State>=async (state:typeof State)=>{
    const {solution_1,solution_2}=state;
    const judge = await createAgent({
        model:geminimodel,
        tools:[],
        responseFormat:providerStrategy(z.object({
            solution_1_score:z.number().min(0).max(10),
            solution_2_score:z.number().min(0).max(10)
        }))
    })
    const judgeresponse = await judge.invoke({
        messages:[
        new HumanMessage(
            `you are a judge between two solutions for the question ${state.messages[0].text}. solution 1 is ${solution_1} and solution 2 is ${solution_2}. give score out of 10 for each solution based on correctness and conciseness.`
        )
    ]
    })
   const result = judgeresponse.structuredResponse
   console.log(state);
   
    return {
       judge_recom:result
    }
}

const graph=new StateGraph(State)
.addNode('solution',solutionnode)
.addNode('judge',judgenode)
.addEdge(START,"solution")
.addEdge("solution","judge")
.addEdge("judge",END)
.compile()



export default async function (usermessage:string){
    const result = await graph.invoke({
        messages:[
            new HumanMessage(usermessage)
        ]
    })
    console.log(result);
    return result.messages

    
}
