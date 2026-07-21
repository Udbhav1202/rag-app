import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatContent from "../features/chat/ChatContent";
import { useChatSession } from "../features/chat/useChatSession";

function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useChatSession(location.state?.document_id ?? null);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((isOpen) => !isOpen)}
        documents={session.documents}
        documentsLoading={session.documentsLoading}
        selectedDocument={session.selectedDocument}
        onSelectDocument={session.handleSelectDocument}
        onNewChat={session.handleNewChat}
      />
      <main className="relative flex min-w-0 flex-1 flex-col">
        <ChatHeader onLogout={handleLogout} />
        <ChatContent session={session} />
      </main>
    </div>
  );
}

export default Chat;
