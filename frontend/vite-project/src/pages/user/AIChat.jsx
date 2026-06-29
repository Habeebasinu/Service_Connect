import { useState } from "react";
import axios from "axios";

function AIChat() {

  const [text, setText] = useState("");

  const [messages, setMessages] = useState([]);

  const send = async () => {

    if (!text) return;

    const userMessage = {
      sender: "You",
      text,
    };

    setMessages(prev => [...prev, userMessage]);

    const res = await axios.post(
      "http://localhost:5000/ai/chat",
      {
        message: text,
      }
    );

    setMessages(prev => [
      ...prev,
      {
        sender: "AI",
        text: res.data.reply,
      },
    ]);

    setText("");
  };

  return (
    <div className="p-5">

      <div className="h-96 overflow-auto border p-3">

        {messages.map((m, i) => (

          <div key={i}>
            <b>{m.sender}</b>: {m.text}
          </div>

        ))}

      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={send}>
        Send
      </button>

    </div>
  );
}

export default AIChat;