import { FileText } from "lucide-react";

function SidebarDocumentItem({ document, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(document)}
      title={document.filename}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
        isSelected
          ? "border-[#c9974b]/50 bg-[#c9974b]/10 text-[#e3b463]"
          : "border-transparent text-[#a69c89] hover:border-[#34301f] hover:bg-[#211d16] hover:text-[#ede4d3]"
      }`}
    >
      <FileText size={17} className={`shrink-0 ${isSelected ? "text-[#c9974b]" : "text-[#6f6656]"}`} />
      <span className="truncate font-mono text-[13px] font-medium">{document.filename}</span>
    </button>
  );
}

export default SidebarDocumentItem;
