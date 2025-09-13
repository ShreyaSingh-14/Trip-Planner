const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

/**
 * Creates a new chat session for Google Gemini AI with the given API key
 * @param {string} apiKey - The API key to use temporarily
 * @returns {object} chatSession - The chat session object
 */
export const createChatSession = (apiKey) => {
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API key is required to create chat session");
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim());

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  // Start a new chat session with an empty history
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Travel Plan for Location : New York USA, for 1 Days and 1 Night for Family with a Luxury Budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 1 days and 1 night with each day plan with best time to visit in JSON format."
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text:
              "```json\n{\n  \"travelPlan\": {\n    \"location\": \"Delhi, India\",\n    \"totalDays\": \"11\",\n    \"totalNight\": \"10\",\n    \"travelers\": \"Family\",\n    \"budget\": \"Moderate\"\n  }\n}\n```",
          },
        ],
      },
    ],
  });

  return chatSession;
};

// Example usage:
// const session = createChatSession("TEMP_API_KEY_HERE");
// const result = await session.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
