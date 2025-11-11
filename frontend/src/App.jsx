import { useState, useEffect } from "react";

// 🔧 1文字ずつ表示する関数
function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!text) return setDisplayed("");
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);
  return displayed;
}

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingText, setTypingText] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // マルッコの固定返信（演出付き）
    const marukkoReply = "……契約条件を確認中。焦るな、誤差が出る。";
    setTypingText(marukkoReply);

    setTimeout(() => {
      setMessages((m) => [...m, { role: "marukko", text: marukkoReply }]);
      setTypingText("");
    }, marukkoReply.length * 45 + 300); // 文字数に応じて遅延
  };

  const typedText = useTypewriter(typingText, 45);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1c1c] via-[#0f0f0f] to-[#1c1c1c] flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* 背景金属エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,128,0.05),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metal-texture.png')] opacity-30 mix-blend-overlay"></div>

      <div className="relative max-w-lg w-full bg-[#222] border border-[#6f5f3a]/50 shadow-[0_0_20px_rgba(255,200,100,0.15)] rounded-xl p-6 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#d4b06a] tracking-widest font-mono border-b border-[#7a6335]/40 pb-2">
          マルッコの商談室
        </h1>

        <div className="h-96 overflow-y-auto mb-4 bg-[#111]/80 rounded-lg p-3 border border-[#6a5431]/50 shadow-inner">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 ${
                m.role === "user"
                  ? "text-right text-[#a8c0ff]"
                  : "text-left text-[#d4b06a]"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-[#1a2235]/70 border border-[#2f3d5a]"
                    : "bg-[#3b2d17]/70 border border-[#7a6335]"
                } shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]`}
              >
                {m.text}
              </span>
            </div>
          ))}

          {/* タイピング中の表示 */}
          {typingText && (
            <div className="text-left text-[#d4b06a] animate-pulse">
              <span className="inline-block bg-[#3b2d17]/70 border border-[#7a6335] px-3 py-2 rounded-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
                {typedText}
                <span className="inline-block w-2 bg-[#d4b06a] ml-1 animate-ping"></span>
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 bg-[#2a2a2a]/80 border border-[#5a4a32]/70 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4b06a] text-[#f3e2c1]"
            placeholder="マルッコに話しかける..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-b from-[#d4b06a] to-[#9c7b38] px-4 py-2 rounded-lg font-semibold text-black hover:brightness-110 shadow-[0_0_10px_rgba(212,176,106,0.4)] transition-all"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
