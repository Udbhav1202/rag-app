import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import DocumentAttachment from "./DocumentAttachment";

function Conversation({ conversation, loading, bottomRef }) {
  return <div className="mx-auto flex w-full max-w-5xl flex-col gap-7 pb-6 pt-20">
    {conversation.map((item, index) => {
      if (item.type === "attachment") return <DocumentAttachment key={index} fileName={item.fileName} />;
      if (item.type === "user" || item.type === "assistant") return <ChatBubble key={index} role={item.type} message={item.content} />;
      return null;
    })}
    {loading && <TypingIndicator />}
    <div ref={bottomRef} />
  </div>;
}

export default Conversation;
