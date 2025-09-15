const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const { db } = require("./firebase.cjs");

// Import CJS module in ESM
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const { db } = require("./firebase.cjs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini client
const ai = new GoogleGenAI({});

// Get all available locations from Firestore
const getCities = async () => {
  const snapshot = await db.collection("property-data").get();
  const locationsSet = new Set();
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.location) locationsSet.add(data.location);
  });

  let locations = Array.from(locationsSet);
  let cities = [];
  locations.forEach(loc => {
    cities.push(loc.city);
  })
  return cities;
};

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { input } = req.body;

  // Fetch dynamic locations from Firestore
  const cities = await getCities();
  
  const citiesText = cities.join(", ");
  const prompt = `
You are a property website assistant.
Available locations: ${citiesText}.
Agent contact: +27-66-123-4567 or agent@propertysite.com.
You can help users with:
- Property availability and locations
- Booking a one-on-one chat online (9 AM - 6 PM, Mon-Fri)
- Scheduling a phone call (10 AM - 5 PM, Mon-Sat)
- Arranging in-person property visits (9 AM - 4 PM, Mon-Sat)

If you do not know the answer, respond with:
"Let me connect you to an agent." and include HTML links:
<a href="mailto:agent@propertysite.com">Email Agent</a>
<a href="https://wa.me/27661234567">Chat on WhatsApp</a>
<a href="https://propertysite.com/main-form">Fill out main contact form</a>

User: ${input}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 0 } },
    });

    // Gemini response text
    const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get chatbot response" });
  }
});

app.listen(PORT, () => console.log(`Chatbot backend running on port ${PORT}`));
