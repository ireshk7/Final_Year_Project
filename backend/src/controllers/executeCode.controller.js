import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async(req,res)=>{
     try {
        const {source_code, language_id, stdin, expected_outputs} = req.body;

        const userId = req.user.id;

        //Validate test Cases

        if(
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length !== stdin.length
        )
        {
            return res.status(400).json({
                error:"Invalid or Missing test Cases"
            })
        }

        // 2. Prepare each test case for judge0 batch submission

        const submissons = stdin.map((input)=>({
            source_code,
            language_id,
            stdin:input,
        }));


        // 3.Send this batch of submisson to judge0

        const submitResponse = await submitBatch(submissons);

        const tokens = submitResponse.map((res)=> res.token);

        // 4. Poll judge0 for results of all submitted test cases

        const result = await pollBatchResults(tokens);

        console.log('Result--------');
        console.log(result)

        return res.status(200).json({
            message:"Code Executed"
        })
     } catch (error) {
        
     }
}