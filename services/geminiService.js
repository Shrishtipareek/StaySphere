require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
/**
 * Generates a structured travel itinerary
 */
async function generateItinerary(tripData) {

    const {
        destination,
        budget,
        days,
        travellers,
        style,
        extra,
    } = tripData;

    const prompt = `
You are an expert luxury travel planner.

Generate a travel itinerary ONLY in valid JSON.

Destination: ${destination}
Budget: ${budget}
Duration: ${days}
Travellers: ${travellers}
Travel Style: ${style}
Special Requests: ${extra}

Return ONLY valid JSON in the following format:

{
  "destination":"",
  "duration":"",
  "estimatedBudget":"",
  "summary":"",
  "days":[
      {
          "day":1,
          "title":"",
          "activities":[]
      }
  ],
  "packingList":[],
  "restaurants":[],
  "hiddenGems":[],
  "travelTips":[]
}

Do not write markdown.
Do not write explanations.
Return JSON only.
`;

  try {

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

        console.log("typeof response.text =", typeof response.text);
    console.log(response);

    // Get Gemini response
    let text = response.text;

    console.log("Gemini Response:");
    console.log(text);

    // Remove markdown if present
    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    // Extract only JSON
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
        throw new Error("Gemini did not return valid JSON.");
    }

    text = text.substring(start, end + 1);

    const itinerary = JSON.parse(text);

    return itinerary;

} catch (err) {

    console.error("Gemini Error:", err);

    throw err;

}

}

module.exports = {
    generateItinerary,
};