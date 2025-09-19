const ChatBubble = ({ message, isUser, time }) => {
  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-xl p-3 max-w-xs break-words ${
          isUser
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-gray-200 text-gray-800 rounded-bl-sm"
        }`}
      >
        <p className="m-0 ">
          <span>{message}</span> &nbsp;&nbsp;{" "}
          <span
            className={`text-xs ${isUser ? "text-gray-600" : "text-neutral-400"}`}
          >
            {time}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
