// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const getJudge0LanguageId = (language)=>{
//     const languageMap = {
//         "PYTHON":71,
//         "JAVA":62,
//         "JAVASCRIPT":63,
//     }
//     return languageMap[language.toUpperCase()]
// }

// const sleep = (ms)=> new Promise((resolve)=>setTimeout(resolve,ms))


// export const pollBatchResults = async(tokens)=>{
//     while(true){
//         const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
//             params:{
//                 token:tokens.join(","),
//                 base64_encoded:false,
//             }
//         })

//         const results = data.submissions;

//         const isAllDone = results.every((result)=> result.status.id !== 1 && result.status.id !== 2)


//         if(isAllDone) return results

//         await sleep(1000)
        
//     }   

    
// }


// export const submitBatch = async(submissions) =>{
//     const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
//         submissions
//     })

//     console.log("Submission Results:",data)

//     return data // [{token},{token},{token}]

// }





import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// ✅ RapidAPI headers added once here
const rapidapiHeaders = {
  "x-rapidapi-host": process.env.JUDGE0_API_HOST,
  "x-rapidapi-key": process.env.JUDGE0_API_KEY,
  "Content-Type": "application/json",
};

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };
  return languageMap[language.toUpperCase()];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  while (true) {
    // ✅ added missing backticks and correct param name: `tokens`
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        headers: rapidapiHeaders, // ✅ added RapidAPI headers
        params: {
          tokens: tokens.join(","), // ✅ was `token` → should be `tokens`
          base64_encoded: false,
        },
      }
    );

    const results = data.submissions;
    const isAllDone = results.every(
      (result) => result.status.id !== 1 && result.status.id !== 2
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
};

export const submitBatch = async (submissions) => {
  // ✅ added backticks and RapidAPI headers
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    { headers: rapidapiHeaders }
  );

  console.log("Submission Results:", data);
  return data; // [{token},{token},{token}]
};
