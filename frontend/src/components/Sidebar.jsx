import { MessageSquarePlus, PanelLeftClose, PanelLeftOpen, BookMarked } from "lucide-react";
import SidebarDocumentItem from "./SidebarDocumentItem";

function Sidebar({ isOpen, onToggle, documents, documentsLoading, selectedDocument, onSelectDocument, onNewChat }) {
  return (
    <aside
      className={`relative z-30 h-dvh shrink-0 overflow-hidden border-r border-[#34301f] bg-[#1c1914] transition-[width] duration-300 ease-out ${
        isOpen ? "w-72" : "w-16"
      }`}
    >
      {!isOpen && (
        <div className="flex h-full flex-col items-center gap-3 py-3">
          <div className="group relative size-10">
            <div className="flex size-10 items-center justify-center rounded-xl border border-[#34301f] bg-[#211d16] text-[#c9974b] shadow-sm transition group-hover:opacity-0">
              <BookMarked size={19} />
            </div>
            <button
              type="button"
              onClick={onToggle}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
              className="absolute inset-0 flex size-10 items-center justify-center rounded-xl bg-[#272219] text-[#c9974b] opacity-0 transition hover:bg-[#34301f] group-hover:opacity-100"
            >
              {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>
          </div>
          <button
            type="button"
            onClick={onNewChat}
            aria-label="New chat"
            title="New chat"
            className="flex size-10 items-center justify-center rounded-xl text-[#a69c89] transition hover:bg-[#272219] hover:text-[#c9974b]"
          >
            <MessageSquarePlus size={20} />
          </button>
        </div>
      )}

      {isOpen && (
        <section className="absolute inset-0 flex w-72 flex-col p-3">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2">
              <BookMarked size={18} className="text-[#c9974b]" />
              <h1 className="font-display text-lg font-semibold text-[#ede4d3]">DocChatAI</h1>
            </div>
            <button
              type="button"
              onClick={onToggle}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="flex size-9 items-center justify-center rounded-lg text-[#a69c89] transition hover:bg-[#272219] hover:text-[#ede4d3]"
            >
              <PanelLeftClose size={19} />
            </button>
          </div>

          <button
            type="button"
            onClick={onNewChat}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#c9974b]/40 bg-[#c9974b]/10 py-3 font-mono text-sm font-medium text-[#e3b463] shadow-sm transition hover:bg-[#c9974b]/20"
          >
            <MessageSquarePlus size={18} />
            New Chat
          </button>

          <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
            <h2 className="px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6f6656]">
              Recent Documents
            </h2>
            <div className="mt-3 space-y-1.5">
              {documentsLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl border border-[#34301f] px-3 py-2.5">
                      <div className="size-[18px] animate-pulse rounded bg-[#34301f]" />
                      <div className="h-4 flex-1 animate-pulse rounded bg-[#34301f]" />
                    </div>
                  ))
                : documents.length
                ? documents.map((document) => (
                    <SidebarDocumentItem
                      key={document.id}
                      document={document}
                      isSelected={selectedDocument?.id === document.id}
                      onSelect={onSelectDocument}
                    />
                  ))
                : <p className="px-3 py-2 font-mono text-xs text-[#6f6656]">No documents uploaded yet.</p>}
            </div>
          </div>
        </section>
      )}
    </aside>
  );
}

export default Sidebar;
