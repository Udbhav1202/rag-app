import { Paperclip, SendHorizontal } from "lucide-react";
import { useRef } from "react";

function ChatInput({ question, setQuestion, handleAsk, loading, onFileSelect, disabled = false }) {
  const fileInputRef = useRef(null);
  return <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6"><div className="mx-auto max-w-4xl">
    <div className="flex items-end gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgb(15,23,42,0.08)] transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
      <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => onFileSelect?.(event.target.files?.[0])} />
      <button type="button" aria-label="Attach a document" onClick={() => fileInputRef.current?.click()} className="mb-0.5 flex size-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"><Paperclip size={20} /></button>
      <textarea value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleAsk(); } }} placeholder={disabled ? "Upload a document to start chatting..." : "Ask anything about your document..."} rows={1} className="max-h-36 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-5 text-slate-800 outline-none placeholder:text-slate-400" />
      <button type="button" onClick={handleAsk} disabled={loading || disabled || !question.trim()} aria-label="Send message" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"><SendHorizontal size={18} /></button>
    </div>
  </div></div>;
}

export default ChatInput;
