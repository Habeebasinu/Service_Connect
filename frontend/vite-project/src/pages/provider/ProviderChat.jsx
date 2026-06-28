import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../../Socket.jsx";

function ProviderChat() {
  const { state } = useLocation();

  const bookingId = state.bookingId;
  const senderId = localStorage.getItem("id");
  const receiverId = state.customerId;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.connect();

    socket.emit("join", senderId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      bookingId,
      senderId,
      receiverId,
      message: text,
    });

    setText("");
  };

  return (
    <div className="p-5">
      <div className="border h-80 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.senderId === senderId ? "You" : "Customer"}:</b> {m.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default ProviderChat;