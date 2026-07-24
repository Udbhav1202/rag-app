import { Paperclip, SendHorizontal } from "lucide-react";
import { useRef } from "react";

function ChatInput({ question, setQuestion, handleAsk, loading, onFileSelect, disabled = false }) {
  const fileInputRef = useRef(null);

  return (
    <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-2 rounded-2xl border border-[#34301f] bg-[#1c1914] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition focus-within:border-[#c9974b]/50 focus-within:ring-4 focus-within:ring-[#c9974b]/10">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(event) => onFileSelect?.(event.target.files?.[0])}
          />
          <button
            type="button"
            aria-label="Attach a document"
            onClick={() => fileInputRef.current?.click()}
            className="mb-0.5 flex size-10 shrink-0 items-center justify-center rounded-full text-[#a69c89] transition hover:bg-[#272219] hover:text-[#c9974b]"
          >
            <Paperclip size={20} />
          </button>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleAsk();
              }
            }}
            placeholder={disabled ? "Upload a document to start chatting..." : "Ask anything about your document..."}
            rows={1}
            className="max-h-36 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-5 text-[#ede4d3] outline-none placeholder:text-[#6f6656]"
          />
          <button
            type="button"
            onClick={handleAsk}
            disabled={loading || disabled || !question.trim()}
            aria-label="Send message"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#c9974b] text-[#15130f] shadow-sm transition hover:bg-[#e3b463] disabled:cursor-not-allowed disabled:bg-[#34301f] disabled:text-[#6f6656]"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
