import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// Load environment variables from .env file
config({ path: '.env' });

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const api_key = process.env.GEMINI_API;
    const genAI = new GoogleGenerativeAI(api_key);
    const data = req.query.data;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent([`write a description about ${data}`]);

    const generatedText = await result.response.text();
    console.log(generatedText);

    res.json({ message: generatedText });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
