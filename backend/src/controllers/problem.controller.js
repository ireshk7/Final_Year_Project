import {db} from "../libs/db.js"
import { getJudge0LanguageId, pollBatchResults } from "../libs/judge0.lib.js";

export const createProblem = async(req,res)=>{
    // going to get the all the data from the request body 
    const {title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution} = req.body;

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({error:"You are not allowed to create a problem"})

    }

    try{
        for(const[language,solutionCode] of Object.entries(referenceSolution)){
            const languageId = getJudge0LanguageId(language)
        
            if(!language){
                return res.status(400).json({error:`Language ${language} is not supported`})
            }
        }

        const submissions = testcases.map(({input,output})=>({
            source_code:solutionCode,
            language_id:languageId,
            stdin:input,
            expected_output:output,
        }))

        const submissionResults = await SubmitEvent(submissions)
            // token

        const tokens = submissionResults.map((res)=>res.token)


        // polling

        const results = await pollBatchResults(tokens)

        for(let i=0;i<results.length ; i++){
            const result = results[i];

            if(result.status.id !== 3){
                return res.status(400).json({error:`Testcase ${i+1} failed for language ${language}`})
            }
        }

        //save the problem to the database

        const newProblem = await db.problem.create({
            data:{
                title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution,userId:req.user.id ,
            }
        })

        return res.status(201),json(newProblem);



    } catch(error){

    }

    //going to check the user role once again 
    
    //Loop through each reference

}
export const getAllProblems = async(req,res)=>{}

export const getProblemById = async(req,res)=>{}

export const updateProblem = async(req,res)=>{}

export const deleteProblem = async(req,res)=>{}

export const getAllProblemSolvedByUser = async(req,res)=>{}


