import { VertexAI } from "@google-cloud/vertexai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

console.log("🔧 Initializing Gemini test...");
console.log("📁 Using service account:", join(__dirname, "../keys/text-simplifier-471608-761513707aff.json"));

// Set the environment variable for authentication
process.env.GOOGLE_APPLICATION_CREDENTIALS = join(__dirname, "../keys/text-simplifier-471608-761513707aff.json");

const vertex_ai = new VertexAI({
  project: process.env.GCLOUD_PROJECT_ID || "text-simplifier-471608",
  location: process.env.GCLOUD_LOCATION || "us-central1",
});
async function testGemini() {
  try {
    const model = vertex_ai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const request = {
      contents: [
        { role: "user", parts: [{ text: "Say hello in simple English" }] },
      ],
    };

    const response = await model.generateContent(request);
    
    if (response.response && response.response.candidates && response.response.candidates[0] && response.response.candidates[0].content && response.response.candidates[0].content.parts && response.response.candidates[0].content.parts[0]) {
      console.log(
        "✅ Gemini Response:",
        response.response.candidates[0].content.parts[0].text
      );
    } else {
      console.log("❌ Unexpected response structure:", JSON.stringify(response, null, 2));
    }
  } catch (err) {
    console.error("❌ Error calling Gemini:", err.message);
    if (err.response?.body) {
      console.error("🔎 Raw response:", err.response.body.toString());
    }
  }
}

testGemini();
