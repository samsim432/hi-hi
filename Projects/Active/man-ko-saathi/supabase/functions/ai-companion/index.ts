const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const crisisPhrases = [
  "i want to die",
  "i want to kill myself",
  "i will kill myself",
  "i will harm myself",
  "i am not safe",
  "i cannot stay alive",
  "suicide",
  "kill myself",
  "harm myself",
];

function detectCrisis(message: string) {
  const text = message.toLowerCase();
  return crisisPhrases.some((phrase) => text.includes(phrase));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (detectCrisis(message)) {
      return Response.json(
        {
          risk_level: "high",
          reply:
            "I'm really sorry you're feeling this way. I cannot provide emergency help. Please contact emergency services, go to the nearest hospital, or call someone you trust right now. Do not stay alone.",
        },
        { headers: corsHeaders }
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key is missing." },
        { status: 500, headers: corsHeaders }
      );
    }

    const systemInstruction = `
You are Man Ko Saathi, an AI Wellness Companion for Nepali users.

Rules:
- You are not therapy.
- You are not diagnosis.
- You are not medical treatment.
- You are not medication advice.
- You are not an emergency service.
- Use warm, simple, supportive language.
- Keep replies short and practical.
- Support English, Nepali, and mixed Nepali-English.
- Ask one gentle follow-up question when useful.
- Suggest safe self-help only: breathing, journaling, rest, mood tracking, trusted person, professional support.
- Never say you are a therapist or doctor.
- You must remember details from the conversation history below.
- If the user asks "What is my name?", check the conversation history and answer with the name if available.
- If the user asks what they were stressed, sad, anxious, or worried about, check the conversation history first.
- Do not say "I don't know" if the answer exists in the conversation history.
`;

    const cleanHistory = Array.isArray(history) ? history.slice(-10) : [];

    const chatHistoryText = cleanHistory
      .map((chat: any, index: number) => {
        return `Message ${index + 1}
User said: ${chat.user_message || ""}
Assistant replied: ${chat.ai_response || ""}`;
      })
      .join("\n\n");

    const prompt = `
${systemInstruction}

CONVERSATION HISTORY:
${chatHistoryText || "No previous conversation yet."}

CURRENT USER MESSAGE:
${message}

Answer the current user message using the conversation history when relevant.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here with you. Can you tell me a little more about what you are feeling right now?";

    return Response.json(
      {
        risk_level: "low",
        reply,
      },
      { headers: corsHeaders }
    );
  } catch (_error) {
    return Response.json(
      { error: "Something went wrong." },
      { status: 500, headers: corsHeaders }
    );
  }
});