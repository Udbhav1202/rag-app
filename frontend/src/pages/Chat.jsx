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
    <div className="flex h-dvh overflow-hidden bg-[#15130f] text-[#ede4d3]">
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
        {/* lamp glow signature element behind header */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #c9974b 0%, transparent 70%)" }}
        />
        <ChatHeader onLogout={handleLogout} />
        <ChatContent session={session} />
      </main>
    </div>
  );
}

export default Chat;
