"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isSending) return;

    setIsSending(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "(No reply)" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
}


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col p-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold">Simple Chatbot</h1>
          <p className="text-sm text-neutral-400">Enter to send • Shift+Enter for newline</p>
        </header>

        {/* Chat window */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          {messages.length === 0 ? (
            <div className="text-neutral-400">
              Say something to start the conversation.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-800 text-neutral-100",
                    ].join(" ")}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl bg-neutral-800 px-4 py-2 text-sm text-neutral-300">
                    Thinking…
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="mt-4 flex gap-2">
          <textarea
            className="flex-1 resize-none rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-sm outline-none focus:border-neutral-600"
            placeholder="Type a message..."
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isSending}
          />

          <button
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            onClick={sendMessage}
            disabled={isSending || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
