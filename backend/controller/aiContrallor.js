import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const chatAI = async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(message);

    res.json({
      reply: result.response.text(),
    });

  } catch (err) {
    console.log("Gemini Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// export const chatAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

//     const result = await model.generateContent(message);

//     res.json({
//       reply: result.response.text(),
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "AI Error",
//     });
//   }
// };