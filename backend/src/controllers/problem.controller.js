// // import {db} from "../libs/db.js"
// // import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

// // export const createProblem = async(req,res)=>{
// //     // going to get the all the data from the request body 
// //     const {title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution} = req.body;

// //     if(req.user.role !== "ADMIN"){
// //         return res.status(403).json({error:"You are not allowed to create a problem"})

// //     }

// //     try{
// //         for(const[language,solutionCode] of Object.entries(referenceSolution)){
// //             const languageId = getJudge0LanguageId(language)
        
// //             if(!language){
// //                 return res.status(400).json({error:`Language ${language} is not supported`})
// //             }
// //         }

// //         const submissions = testcases.map(({input,output})=>({
// //             source_code:solutionCode,
// //             language_id:languageId,
// //             stdin:input,
// //             expected_output:output,
// //         }))

// //         const submissionResults = await submitBatch(submissions)
// //             // token

// //         const tokens = submissionResults.map((res)=>res.token)


// //         // polling

// //         const results = await pollBatchResults(tokens)

// //         for(let i=0;i<results.length ; i++){
// //             const result = results[i];
// //             console.log("Results---",result);

            
// //             if(result.status.id !== 3){
// //                 return res.status(400).json({error:`Testcase ${i+1} failed for language ${language}`})
// //             }
// //         }

// //         //save the problem to the database

// //         const newProblem = await db.problem.create({
// //             data:{
// //                 title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution,userId:req.user.id ,
// //             }
// //         })

// //         return res.status(201),json(newProblem);



// //     } catch(error){

// //     }

// //     //going to check the user role once again 
    
// //     //Loop through each reference

// // }
// // export const getAllProblems = async(req,res)=>{}

// // export const getProblemById = async(req,res)=>{}

// // export const updateProblem = async(req,res)=>{}

// // export const deleteProblem = async(req,res)=>{}

// // export const getAllProblemSolvedByUser = async(req,res)=>{}







// import { db } from "../libs/db.js";
// import {
//   getJudge0LanguageId,
//   pollBatchResults,
//   submitBatch,
// } from "../libs/judge0.lib.js";

// export const createProblem = async (req, res) => {
//   const {
//     title,
//     description,
//     difficulty,
//     tags,
//     examples,
//     constraints,
//     testcases,
//     codeSnippets,
//     referenceSolutions,
//   } = req.body;

//   // going to check the user role once again

//   try {
//     for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
//       const languageId = getJudge0LanguageId(language);

//       if (!languageId) {
//         return res
//           .status(400)
//           .json({ error: `Language ${language} is not supported` });
//       }

//       //
//       const submissions = testcases.map(({ input, output }) => ({
//         source_code: solutionCode,
//         language_id: languageId,
//         stdin: input,
//         expected_output: output,
//       }));

//       const submissionResults = await submitBatch(submissions);

//       const tokens = submissionResults.map((res) => res.token);

//       const results = await pollBatchResults(tokens);

//       for (let i = 0; i < results.length; i++) {
//         const result = results[i];
//         console.log("Result-----", result);
//         // console.log(
//         //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
//         // );
//         if (result.status.id !== 3) {
//           return res.status(400).json({
//             error: `Testcase ${i + 1} failed for language ${language}`,
//           });
//         }
//       }
//     }

//     const newProblem = await db.problem.create({
//       data: {
//         title,
//         description,
//         difficulty,
//         tags,
//         examples,
//         constraints,
//         testcases,
//         codeSnippets,
//         referenceSolutions,
//         userId: req.user.id,
//       },
//     });

//     return res.status(201).json({
//       sucess: true,
//       message: "Message Created Successfully",
//       problem: newProblem,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       error: "Error While Creating Problem",
//     });
//   }
// };

// export const getAllProblems = async (req, res) => {
//   try {
//     const problems = await db.problem.findMany(
//       {
//         include:{
//           solvedBy:{
//             where:{
//               userId:req.user.id
//             }
//           }
//         }
//       }
//     );

//     if (!problems) {
//       return res.status(404).json({
//         error: "No problems Found",
//       });
//     }

//     res.status(200).json({
//       sucess: true,
//       message: "Message Fetched Successfully",
//       problems,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       error: "Error While Fetching Problems",
//     });
//   }
// };

// export const getProblemById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const problem = await db.problem.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!problem) {
//       return res.status(404).json({ error: "Problem not found." });
//     }

//     return res.status(200).json({
//       sucess: true,
//       message: "Message Created Successfully",
//       problem,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       error: "Error While Fetching Problem by id",
//     });
//   }
// };

// // TODO: IMPLEMENT BY YOUR SELF🔥
// export const updateProblem = async (req, res) => {
//   // id
//   // id--->problem ( condition)
//   // baaki kaam same as create
// };

// export const deleteProblem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const problem = await db.problem.findUnique({ where: { id } });

//     if (!problem) {
//       return res.status(404).json({ error: "Problem Not found" });
//     }

//     await db.problem.delete({ where: { id } });

//     res.status(200).json({
//       success: true,
//       message: "Problem deleted Successfully",
//     });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       error: "Error While deleting the problem",
//     });
//   }
// };

// export const getAllProblemsSolvedByUser = async (req, res) => {
//   try {
//     const problems = await db.problem.findMany({
//       where:{
//         solvedBy:{
//           some:{
//             userId:req.user.id
//           }
//         }
//       },
//       include:{
//         solvedBy:{
//           where:{
//             userId:req.user.id
//           }
//         }
//       }
//     })

//     res.status(200).json({
//       success:true,
//       message:"Problems fetched successfully",
//       problems
//     })
//   } catch (error) {
//     console.error("Error fetching problems :" , error);
//     res.status(500).json({error:"Failed to fetch problems"})
//   }
// };    





// controllers/problems.controller.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

/**
 * Minimal header injection so libs/judge0.lib.js (which uses axios) will send RapidAPI headers
 * without modifying that file.
 */
const JUDGE0_HOST = (process.env.JUDGE0_API_HOST || "").trim();
const JUDGE0_KEY = (process.env.JUDGE0_API_KEY || "").trim();
if (JUDGE0_HOST && JUDGE0_KEY) {
  axios.defaults.headers.common["x-rapidapi-host"] = JUDGE0_HOST;
  axios.defaults.headers.common["x-rapidapi-key"] = JUDGE0_KEY;
  axios.defaults.headers.common["Content-Type"] = "application/json";
} else {
  console.warn("Judge0 RapidAPI env vars missing or empty.");
}

/**
 * Helper: timeout a promise
 */
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), ms)
    ),
  ]);

/**
 * Helper: attempt submit+poll with retries for transient errors (429/5xx) and a poll timeout.
 * - submissions: array passed to submitBatch
 * - opts: { pollTimeoutMs, maxRetries, retryDelayMs }
 */
const attemptJudge0 = async (submissions, opts = {}) => {
  const { pollTimeoutMs = 30000, maxRetries = 2, retryDelayMs = 1000 } = opts;

  let attempt = 0;
  while (true) {
    attempt++;
    try {
      // Submit
      const submissionResults = await submitBatch(submissions);
      // Map tokens robustly (handle both [{token}] and ["token"])
      const tokens = (submissionResults || []).map((r) =>
        typeof r === "string" ? r : r?.token
      );

      if (!tokens || tokens.length === 0) {
        throw new Error("No tokens returned from Judge0 submitBatch");
      }

      // Poll with timeout -- pollBatchResults already loops until done, so we wrap it
      const results = await withTimeout(pollBatchResults(tokens), pollTimeoutMs);

      // results expected to be array of submission results
      if (!Array.isArray(results)) {
        throw new Error("Unexpected results shape from pollBatchResults");
      }

      return results;
    } catch (err) {
      const status = err?.response?.status;
      const isTransient = !status || status === 429 || (status >= 500 && status < 600);

      if (attempt > maxRetries || !isTransient) {
        // No more retries or non-transient error -> rethrow
        throw err;
      }

      // transient -> wait and retry
      await new Promise((r) => setTimeout(r, retryDelayMs * attempt));
    }
  }
};

/**
 * createProblem - minimal edits from your original function:
 *  - uses attemptJudge0() wrapper for robust submit+poll
 *  - returns richer failure details for failing testcases
 */
export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // going to check the user role once again (left as-is)
  try{
    if(!req.user || req.user.role !== "ADMIN"){
      return res.status(403).json({
        error:"Only Admins are allowed to create Problem",
      });
    }
  }catch(error){
    return res.status(500).json({
      error:"Admin check failed",
      details:error.message,
    });
  }


  try {
    // basic validation (keeps minimal)
    if (!referenceSolutions || typeof referenceSolutions !== "object") {
      return res.status(400).json({ error: "referenceSolutions required" });
    }
    if (!Array.isArray(testcases) || testcases.length === 0) {
      return res.status(400).json({ error: "testcases required" });
    }


    //check once again
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      // Use the attempt wrapper: poll timeout + retries on transient errors
      const results = await attemptJudge0(submissions, {
        pollTimeoutMs: 30000,
        maxRetries: 2,
        retryDelayMs: 1000,
      });

      // results should be an array aligned with submissions/testcases
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);

        // If not accepted (status.id !== 3) return richer failure details
        if (!result?.status || result.status.id !== 3) {
          const failureInfo = {
            testcaseIndex: i + 1,
            language,
            statusId: result?.status?.id ?? null,
            statusDescription: result?.status?.description ?? null,
            stdout: result?.stdout ?? null,
            stderr: result?.stderr ?? null,
            compile_output: result?.compile_output ?? null,
            message: result?.message ?? null,
            token: result?.token ?? null,
          };

          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
            details: failureInfo,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error While Creating Problem:", error?.response?.data || error.message || error);
    return res.status(500).json({
      error: "Error While Creating Problem",
      details: error?.response?.data ?? error.message,
    });
  }
};


export const getAllProblems = async(req,res)=>{

   try {
    const problems = await db.problem.findMany();

    if(!problems){
      return res.status(404).json({
        error:"No Problems found"
      })
    }

    res.status(200).json({
      success:true,
      message:"Message Fetched Successfully",
      problems
    })
   } catch (error) {
    console.log(error);
    return res.status(400).json({
      error:"Error while Creating Problems",
    });
   }
};



export const getProblemById = async(req,res)=>{

  const {id} = req.params;

  try {
    const problem = await db.problem.findUnique(
    {
      where:{
        id
      }   
    })
    
    if(!problem){
      return res.status(404).json({error:"Problem not found"});
    }

    return res.status(200).json({
      success:true,
      message:"Message Created Successfully",
      problem
    });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error:"Error while fetching Problem by id",
      })
  }


  
}


export const updateProblem = async(req,res)=>{ 
  //id
  //id---> problem(condition) 
  //baaki same as create

  const {id} = req.params;

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  try{
    const existing = db.problem.findUnique({
      where:{
        id
      }
    })

    if(!existing){
      return res.status(404).json({
        error:"Problem not found"
      });
    }

    if(!req.user || (req.user.role !== "ADMIN" && req.user.id !== existing.userId)){
      return res.status(403).json({
        error:"Not authorized to update this problem"
      });
    }
  
  const dataToUpdate = {};
    if (typeof title !== "undefined") dataToUpdate.title = title;
    if (typeof description !== "undefined") dataToUpdate.description = description;
    if (typeof difficulty !== "undefined") dataToUpdate.difficulty = difficulty;
    if (typeof tags !== "undefined") dataToUpdate.tags = tags;
    if (typeof examples !== "undefined") dataToUpdate.examples = examples;
    if (typeof constraints !== "undefined") dataToUpdate.constraints = constraints;
    if (typeof testcases !== "undefined") dataToUpdate.testcases = testcases;
    if (typeof codeSnippets !== "undefined") dataToUpdate.codeSnippets = codeSnippets;
    if (typeof referenceSolutions !== "undefined") dataToUpdate.referenceSolutions = referenceSolutions;

    // If nothing to update
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ error: "No updatable fields provided" });
    }

    // Perform update
    const updated = db.problem.update({
      where:{
        id
      },
      data:dataToUpdate,
    })
    return res.status(200).json({
      success:true,
      message:"Problem Updated Successfully",
      problem:updated,
    });
}catch(error){
  console.error("Error while updating problem",error);
  return res.status(500).json({
    error:"Error while updating problem"
  });
}

}

export const deleteProblem = async(req,res)=>{
  const {id} = req.params;

  try {
    const problem = await db.problem.findUnique({
    where:{
      id
    }
  });

  if(!problem){
    return res.status(404).json({error:"Problem not found"})
  }

  await db.problem.delete({
    where:{
      id
    },
  });
  return res.status(200).json({
    success:true,
    message:"Problem deleted"
  });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:"Error while Deleting problem by id",
    });
  }
};

// // export const getAllProblemSolvedByUser = async(req,res)=>{}