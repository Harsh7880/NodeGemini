// Make sure to include these imports:
const { GoogleGenerativeAI } = require ("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(express.json());
app.use(parser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Meaning of Name Aarti in hindi.";

const generate = async (prompt) => {
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    }catch(err){
        console.log(err);
    }
}

app.get('/',(req,res)=>{
  res.send("hello Wordl Gemini");
})

app.get('/api/content', async (req,res) => {
   try {
    const data = req.body.question;
    const result = await generate(data);
    res.send({
        "result": result
    });
   } catch (error) {
    console.log("Errot" + err);
   }
})



// generate();

app.listen(3000,()=>{
    console.log("Server is running on post 3000");
})