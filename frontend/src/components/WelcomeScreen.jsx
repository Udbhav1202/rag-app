import { BookMarked } from "lucide-react";
import UploadArea from "./UploadArea";
import DocumentAttachment from "./DocumentAttachment";

function WelcomeScreen({ file, setFile, handleUpload, uploading, uploadedFileName }) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-8 sm:py-12">
      <div className="mb-8 text-center sm:mb-10">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-[#c9974b]/30 bg-[#c9974b]/10 text-[#c9974b]">
          <BookMarked size={22} />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c9974b]">Reading Room</span>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#ede4d3] sm:text-4xl">
          DocChatAI
        </h1>
        <p className="mt-3 text-base text-[#a69c89]">Chat with your documents using AI</p>
      </div>
      {uploadedFileName ? (
        <div className="w-full transition-all duration-300">
          <DocumentAttachment fileName={uploadedFileName} showStatus centered prominent />
        </div>
      ) : (
        <UploadArea file={file} setFile={setFile} handleUpload={handleUpload} uploading={uploading} />
      )}
    </section>
  );
}

export default WelcomeScreen;
