"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simple Chatbot</h1>

      <input
        className="border p-2 w-full"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>

      {reply && (
        <div className="mt-5 p-4 bg-black-100 border rounded text-white">
          <strong>AI:</strong> {reply}
        </div>
      )}
    </div>
  );
}
