import { GoogleGenerativeAI } from "@google/generative-ai";
import Provider from "../models/providerModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Get all approved services
  const services = await Provider.find({
  approvalStatus: "accept",
});

console.log("Services found:", services.length);

    // Convert services to text for Gemini
    const serviceList = services
      .map(
        (service) => `
Service Name: ${service.service}
Provider: ${service.companyname}
Price: ₹${service.price}/hr
Availability: ${service.accountStatus}
Description: ${service.desc}
`
      )
      .join("\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
const prompt = `
You are the Service Connect AI Assistant.

IMPORTANT:
Every reply MUST start with:
SERVICE CONNECT BOT

Available services:

${serviceList}

Rules:
- Answer only about Service Connect.
- Use the available services above.
- If the user asks unrelated questions, reply:
"Sorry, I can only answer Service Connect questions."

User Question:
${message}
`;
//     const prompt = `
// You are the AI Assistant of Service Connect.

// Service Connect is a home service booking platform.

// Users can:
// - Search services
// - Book services
// - Pay online
// - Rate providers

// Providers can:
// - Register
// - Add services
// - Manage bookings

// The following services are available in the system:

// ${serviceList}

// Instructions:
// - Answer ONLY questions related to Service Connect.
// - Recommend services from the available list.
// - Mention provider name and price if asked.
// - If someone asks unrelated questions (movies, sports, coding, politics, etc.), reply:
// "Sorry, I can only answer questions related to Service Connect."

// User Question:
// ${message}
// `;

    const result = await model.generateContent(prompt);

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