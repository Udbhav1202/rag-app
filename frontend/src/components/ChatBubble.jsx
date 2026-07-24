function ChatBubble({ role, message }) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[92%] sm:max-w-[70%]">
          <div className="rounded-2xl rounded-tr-sm bg-[#c9974b] px-5 py-4 text-[#15130f] shadow-sm">
            <p className="whitespace-pre-wrap text-[15px] leading-7">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] border-l-2 border-[#c9974b]/60 py-1 pl-5 sm:max-w-[75%]">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#c9974b]/80">
          Response
        </span>
        <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-7 text-[#ede4d3]">{message}</p>
      </div>
    </div>
  );
}

export default ChatBubble;
