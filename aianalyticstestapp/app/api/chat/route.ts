import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Call OpenAI (replace with your key)
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await openaiRes.json();

  console.log("API Key:" + process.env.OPENAI_API_KEY);

  const reply = data.choices?.[0]?.message?.content || "No response.";

  return NextResponse.json({ reply });
}
