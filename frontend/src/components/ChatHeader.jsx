import { LogOut } from "lucide-react";

function ChatHeader({ onLogout }) {
  return <header className="absolute left-6 right-6 top-4 z-10 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold tracking-tight text-slate-800">DocChatAI</span>
      <span className="text-sm font-normal text-slate-400">Document chat</span>
    </div>
    <button type="button" onClick={onLogout} className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
      <LogOut size={18} />
      Logout
    </button>
  </header>;
}

export default ChatHeader;
