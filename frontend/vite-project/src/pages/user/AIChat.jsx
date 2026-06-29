import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hello 👋 Welcome to Service Connect. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = {
      sender: "You",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/ai/chat", {
        message: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "Sorry, AI is unavailable.",
        },
      ]);
    }

    setText("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white w-16 h-16 rounded-full shadow-xl text-3xl z-50"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-xl shadow-2xl flex flex-col z-50">

          {/* Header */}
          <div className="bg-purple-600 text-white p-4 rounded-t-xl flex justify-between">
            <h2 className="font-bold">AI Assistant</h2>

            <button onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "You"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === "You"
                      ? "bg-purple-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              placeholder="Type your message..."
            />

            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-5 rounded-lg"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default AIChat;