import { FileText } from "lucide-react";

function SidebarDocumentItem({ document, isSelected, onSelect }) {
  return <button
    type="button"
    onClick={() => onSelect(document)}
    title={document.filename}
    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${isSelected ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
  >
    <FileText size={18} className={`shrink-0 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
    <span className="truncate font-medium">{document.filename}</span>
  </button>;
}

export default SidebarDocumentItem;
