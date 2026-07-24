import { FileText, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

function UploadArea({ file, setFile, handleUpload, uploading }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const selectFile = (selectedFile) => selectedFile && setFile(selectedFile);

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          selectFile(event.dataTransfer.files?.[0]);
        }}
        className={`group flex min-h-60 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition duration-200 ${
          isDragging
            ? "border-[#c9974b] bg-[#c9974b]/5 shadow-lg shadow-[#c9974b]/10"
            : "border-[#34301f] bg-[#1c1914] hover:border-[#c9974b]/50 hover:bg-[#211d16]"
        }`}
      >
        <div className="flex size-14 items-center justify-center rounded-2xl border border-[#c9974b]/30 bg-[#c9974b]/10 text-[#c9974b] transition group-hover:scale-105 group-hover:bg-[#c9974b] group-hover:text-[#15130f]">
          <UploadCloud size={27} strokeWidth={1.8} />
        </div>
        <h2 className="font-display mt-5 text-lg font-semibold text-[#ede4d3]">Upload a document</h2>
        <p className="mt-2 text-sm text-[#a69c89]">Drop it here, or click to browse</p>
        <p className="mt-1 font-mono text-xs text-[#6f6656]">PDF, DOCX, or TXT</p>
        <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => selectFile(event.target.files?.[0])} />
      </div>
      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#34301f] bg-[#1c1914] p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#c9974b]/30 bg-[#c9974b]/10 text-[#c9974b]">
            <FileText size={20} />
          </div>
          <p className="min-w-0 flex-1 truncate font-mono text-sm font-medium text-[#ede4d3]">{file.name}</p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleUpload();
            }}
            disabled={uploading}
            className="rounded-lg bg-[#c9974b] px-4 py-2 text-sm font-medium text-[#15130f] shadow-sm transition hover:bg-[#e3b463] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadArea;
