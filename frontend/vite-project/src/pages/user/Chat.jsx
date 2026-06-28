import React, { useEffect, useState } from "react";
import socket from "../../Socket";
import { useLocation } from "react-router-dom";





function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { state } = useLocation();

 const bookingId = state.bookingId;
const receiverId = state.providerId;
const senderId = localStorage.getItem("id");

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", senderId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

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
      <h2 className="text-2xl font-bold mb-4">Chat</h2>

      <div className="border h-80 overflow-y-auto p-3 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <b>{msg.senderId === senderId ? "You" : "Provider"}:</b>{" "}
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;