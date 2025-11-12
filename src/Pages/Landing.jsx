import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-hot-toast";

const genAi = new GoogleGenerativeAI("AIzaSyAu3-x3T0-ZP8rHPKHuywK79EZ2PczcvXY");
const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });

const LandingPage = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const heroText = "Your AI Health Assistant";

  useEffect(() => {
    let i = 0;
    setText("");
    const interval = setInterval(() => {
      setText(heroText.slice(0, i + 1));
      i++;
      if (i >= heroText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.error("Please input a text");
      return;
    }
    setLoading(true);
    try {
      const classificationPrompt = `Is the following input related to a health condition? Respond only with 'yes' or 'no'. Input: "${input}"`;
      const classificationRes = await model.generateContent(
        classificationPrompt
      );
      const classificationText = classificationRes.response
        ?.text()
        ?.trim()
        .toLowerCase();

      if (classificationText !== "yes") {
        setResponse({
          error:
            "I can only assist with health-related issues. Please enter a valid health condition.",
        });
        setLoading(false);
        return;
      }

      const prompt = `You are a medical assistant. Analyze the following health condition: "${input}".
      Respond strictly in JSON format without any additional text. The JSON should be structured like this:
      {
        "condition": "${input}",
        "possible_causes": ["cause1", "cause2"],
        "home_remedies": ["remedy1", "remedy2"],
        "medical_treatments": ["treatment1", "treatment2"],
        "medications": ["medicine1", "medicine2"],
        "precautions": ["precaution1", "precaution2"]
      }`;

      const res = await model.generateContent(prompt);
      const responseText = res.response?.text();
      if (!responseText) throw new Error("Invalid response from API");

      const jsonMatch = responseText.match(/```json\n(.*)\n```/s);
      if (!jsonMatch)
        throw new Error("API did not return JSON in expected format");

      const jsonResponse = JSON.parse(jsonMatch[1]);
      setResponse(jsonResponse);
      toast.success("Please follow the procedure");
    } catch (error) {
      console.error("API Error:", error.message);
      setResponse({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <h1 className="text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
        {text}
      </h1>
      <div className="relative mt-10 w-full max-w-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your health condition..."
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>
      {loading && (
        <div className="mt-4 text-blue-400 animate-pulse">Analyzing...</div>
      )}
      {response && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
          {response.error ? (
            <p className="text-red-400">{response.error}</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-blue-400">Results:</h2>
              <p className="mt-2 text-gray-300">{response.condition}</p>
              <p className="mt-2 text-gray-400">
                <strong>Possible Causes:</strong>{" "}
                {response.possible_causes.join(", ")}
              </p>
              <p className="mt-2 text-gray-400">
                <strong>Home Remedies:</strong>{" "}
                {response.home_remedies.join(", ")}
              </p>
              <p className="mt-2 text-gray-400">
                <strong>Medical Treatments:</strong>{" "}
                {response.medical_treatments.join(", ")}
              </p>
              <p className="mt-2 text-gray-400">
                <strong>Medications:</strong> {response.medications.join(", ")}
              </p>
              <p className="mt-2 text-gray-400">
                <strong>Precautions:</strong> {response.precautions.join(", ")}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
