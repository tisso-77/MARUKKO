import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((m) => [...m, { role: "marukko", text: data.reply }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">マルッコの商談室</h1>
      <div className="h-80 overflow-y-auto mb-4 bg-gray-800 p-2 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.role === "user" ? "text-right" : "text-left text-yellow-300"
            }`}
          >
            <span>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          onClick={sendMessage}
        >
          送信
        </button>
      </div>
    </div>
  );
}

export default App;
