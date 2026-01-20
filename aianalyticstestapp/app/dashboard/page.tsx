import ChatBubble from "@/Components/ChatBubble";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <p className="text-neutral-400 max-w-xl">
        Welcome to your AI Analytics dashboard.  
        Metrics, logs, and insights will appear here.
      </p>

      {/* Charts, tables, cards later */}

      <ChatBubble />
    </div>
  );
}
