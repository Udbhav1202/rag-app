import { FileText } from "lucide-react";

function DocumentAttachment({ fileName, showStatus = false, centered = false, prominent = false }) {
  return (
    <div className={`flex ${centered ? "justify-center" : "justify-start pl-5"}`}>
      <div
        className={`flex items-center gap-3 rounded-xl border border-[#34301f] bg-[#211d16] transition-all duration-300 ${
          prominent ? "px-5 py-4 shadow-md shadow-black/20" : "px-4 py-3"
        }`}
      >
        <div
          className={`flex shrink-0 items-center justify-center rounded-lg border border-[#c9974b]/30 bg-[#c9974b]/10 text-[#c9974b] ${
            prominent ? "size-11" : "size-9"
          }`}
        >
          <FileText size={prominent ? 22 : 18} />
        </div>
        <div className="min-w-0 text-left">
          <p
            className={`max-w-56 truncate font-mono font-medium text-[#ede4d3] sm:max-w-sm ${
              prominent ? "text-base" : "text-sm"
            }`}
          >
            {fileName}
          </p>
          {showStatus && <p className="mt-0.5 font-mono text-xs text-[#a69c89]">Uploaded successfully</p>}
        </div>
      </div>
    </div>
  );
}

export default DocumentAttachment;
