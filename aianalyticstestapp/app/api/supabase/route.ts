import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: Request) {
    // Contains user_message and ai_message
  const { message } = await req.json();

  // Based on type, add this to Supabase table
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

    await supabase.from("data").insert([
        {
            user: message.user_message,
            ai: message.ai_message,
        },
    ]);

  return NextResponse.json({ status: "logged" });
}
