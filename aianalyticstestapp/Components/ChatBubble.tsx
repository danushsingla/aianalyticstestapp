"use client";

import { useState } from "react";
import { useAmonContainer } from "@amon-analytics/next";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Set the containerRef of the ChatBubble for Amon
  const containerRef = useAmonContainer();

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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "(No reply)" },
      ]);
    } catch (e) {
      console.error(e);
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
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500"
      >
        💬
      </button>

      {/* Chat panel */}
      {open && (
        <div ref={containerRef} className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-800 p-3">
            <span className="text-sm font-medium">AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 ? (
              <div className="text-sm text-neutral-400">
                Ask anything to get started.
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-800 text-neutral-100"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            )}

            {isSending && (
              <div className="text-sm text-neutral-400">Thinking…</div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-neutral-800 p-3 flex gap-2">
            <textarea
              rows={1}
              className="flex-1 resize-none rounded-lg bg-neutral-900 p-2 text-sm outline-none"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={isSending || !input.trim()}
              className="rounded-lg bg-blue-600 px-3 text-sm text-white disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
