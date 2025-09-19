import { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/ChatBubble";
import { useParams } from "react-router-dom";
import "../scrollbar.css";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const user = useSelector((state) => state.user);
  const { toUserId } = useParams();
  const fromUserId = user?._id;
  const socketRef = useRef(null);

  const fetchAllChats = async (toUserId) => {
    try {
      const chats = await axios.get(
        BASE_URL + "/api/v1/chat/fetch/" + toUserId,
        { withCredentials: true }
      );
      const rawMessages = chats?.data?.data.messages;
      const messages = rawMessages.map((message) => {
        const isUser = message.senderId._id === fromUserId;
        const text = message.text;
        return { isUser, text, time: "" };
      });
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!fromUserId || !toUserId) return;
    fetchAllChats(toUserId);
    socketRef.current = createSocketConnection();

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("joinChat", { fromUserId, toUserId });
    });

    socket.on("messageReceived", (msg) => {
      toast.info(`${msg?.fullName} sent a message`);
      setMessages((prev) => [...prev, { text: msg.text, isUser: false }]);
    });
    socket.on("connect_error", (error) => {
      toast.error(error.message);
      console.log(error.message);
    });

    return () => {
      console.log("🔌 Disconnecting socket");
      socket.disconnect();
    };
  }, [fromUserId, toUserId]);

  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();
      if (!input.trim()) return;
      socketRef.current.emit("sendMessage", {
        fromUserId,
        toUserId,
        text: input,
      });
      setMessages((prev) => [...prev, { isUser: true, text: input }]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            time={msg.time}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex p-4 min-w-fit bg-white dark:bg-base-300 border-t border-gray-300 dark:border-gray-200 rounded-2xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
