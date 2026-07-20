import { FileText } from "lucide-react";

function DocumentAttachment({ fileName, showStatus = false, centered = false, prominent = false }) {
  return <div className={`flex ${centered ? "justify-center" : "justify-start pl-[3.25rem]"}`}>
    <div className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ${prominent ? "px-5 py-4 shadow-md shadow-slate-200/70" : "px-4 py-3"}`}>
      <div className={`flex shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 ${prominent ? "size-11" : "size-9"}`}><FileText size={prominent ? 24 : 20} /></div>
      <div className="min-w-0 text-left"><p className={`max-w-56 truncate font-semibold text-slate-700 sm:max-w-sm ${prominent ? "text-base" : "text-sm"}`}>{fileName}</p>{showStatus && <p className="mt-0.5 text-sm text-slate-500">Uploaded successfully</p>}</div>
    </div>
  </div>;
}

export default DocumentAttachment;
