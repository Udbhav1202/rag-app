import { MessageSquarePlus, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import SidebarDocumentItem from "./SidebarDocumentItem";

function Sidebar({ isOpen, onToggle, documents, documentsLoading, selectedDocument, onSelectDocument, onNewChat }) {
  return <aside className={`relative z-30 h-dvh shrink-0 overflow-hidden border-r border-slate-200 bg-white/95 backdrop-blur transition-[width] duration-300 ease-out ${isOpen ? "w-64" : "w-16"}`}>
    {!isOpen && <div className="flex h-full flex-col items-center gap-3 py-3">
      <div className="group relative size-10">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm transition group-hover:opacity-0"><Sparkles size={19} /></div>
        <button type="button" onClick={onToggle} aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"} title={isOpen ? "Collapse sidebar" : "Expand sidebar"} className="absolute inset-0 flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 opacity-0 transition hover:bg-indigo-100 group-hover:opacity-100">{isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}</button>
      </div>
      <button type="button" onClick={onNewChat} aria-label="New chat" title="New chat" className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"><MessageSquarePlus size={20} /></button>
    </div>}

    {isOpen && <section className="absolute inset-0 flex w-64 flex-col bg-white p-3">
      <div className="flex items-center justify-between px-2 py-1">
        <h1 className="text-lg font-semibold tracking-tight text-slate-800">DocChatAI</h1>
        <button type="button" onClick={onToggle} aria-label="Collapse sidebar" title="Collapse sidebar" className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"><PanelLeftClose size={19} /></button>
      </div>
      <button type="button" onClick={onNewChat} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"><MessageSquarePlus size={18} />New Chat</button>
      <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Recent Documents</h2>
        <div className="mt-3 space-y-1">
          {documentsLoading ? Array.from({ length: 3 }).map((_, index) => <div key={index} className="flex items-center gap-3 rounded-xl px-3 py-2.5"><div className="size-[18px] animate-pulse rounded bg-slate-200" /><div className="h-4 flex-1 animate-pulse rounded bg-slate-200" /></div>) : documents.length ? documents.map((document) => <SidebarDocumentItem key={document.id} document={document} isSelected={selectedDocument?.id === document.id} onSelect={onSelectDocument} />) : <p className="px-3 py-2 text-sm text-slate-400">No documents uploaded yet.</p>}
        </div>
      </div>
    </section>}
  </aside>;
}

export default Sidebar;
