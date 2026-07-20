import { FileText, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

function UploadArea({ file, setFile, handleUpload, uploading }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const selectFile = (selectedFile) => selectedFile && setFile(selectedFile);

  return <div className="w-full">
    <div role="button" tabIndex={0} onClick={() => inputRef.current?.click()} onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
    }} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { event.preventDefault(); setIsDragging(false); }} onDrop={(event) => { event.preventDefault(); setIsDragging(false); selectFile(event.dataTransfer.files?.[0]); }} className={`group flex min-h-60 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition duration-200 ${isDragging ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100" : "border-slate-200 bg-white/80 hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-lg hover:shadow-slate-200/70"}`}>
      <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white"><UploadCloud size={27} strokeWidth={1.8} /></div>
      <h2 className="mt-5 text-lg font-semibold text-slate-800">Upload a document</h2>
      <p className="mt-2 text-sm text-slate-500">Drop it here, or click to browse</p>
      <p className="mt-1 text-xs text-slate-400">PDF, DOCX, or TXT</p>
      <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => selectFile(event.target.files?.[0])} />
    </div>
    {file && <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500"><FileText size={20} /></div>
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">{file.name}</p>
      <button type="button" onClick={(event) => { event.stopPropagation(); handleUpload(); }} disabled={uploading} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{uploading ? "Uploading..." : "Upload"}</button>
    </div>}
  </div>;
}

export default UploadArea;
