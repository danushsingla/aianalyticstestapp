import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req: Request) {
  const { message } = await req.json();

  // Call OpenAI (replace with your key)
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });

  const reply = res.choices?.[0]?.message?.content || "No response.";

  return NextResponse.json({ reply });
}
