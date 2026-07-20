import { Bot, User } from "lucide-react";

function ChatBubble({ role, message }) {
  const isUser = role === "user";
  return <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
    <div className={`flex max-w-[92%] items-start gap-3 sm:max-w-[85%] ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${isUser ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-700"}`}>{isUser ? <User size={20} /> : <Bot size={20} />}</div>
      <div className={`rounded-2xl px-5 py-4 shadow-sm ${isUser ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}><p className={`whitespace-pre-wrap text-[15px] leading-7 ${isUser ? "" : "sm:text-base"}`}>{message}</p></div>
    </div>
  </div>;
}

export default ChatBubble;
