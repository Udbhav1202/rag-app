import { LogOut } from "lucide-react";

function ChatHeader({ onLogout }) {
  return (
    <header className="absolute left-6 right-6 top-4 z-10 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-lg font-semibold tracking-tight text-[#ede4d3]">DocChatAI</span>
        <span className="font-mono text-xs text-[#6f6656]">Document chat</span>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 rounded-lg border border-[#b5533f]/40 bg-[#b5533f]/10 px-4 py-2 text-sm text-[#e3987f] transition hover:bg-[#b5533f]/20"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}

export default ChatHeader;
