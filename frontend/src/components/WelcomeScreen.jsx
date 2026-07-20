import UploadArea from "./UploadArea";
import DocumentAttachment from "./DocumentAttachment";

function WelcomeScreen({ file, setFile, handleUpload, uploading, uploadedFileName }) {
  return <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-8 sm:py-12">
    <div className="mb-8 text-center sm:mb-10">
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">D</div>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">DocChatAI</h1>
      <p className="mt-3 text-base text-slate-500">Chat with your documents using AI</p>
    </div>
    {uploadedFileName ? (
      <div className="w-full transition-all duration-300">
        <DocumentAttachment fileName={uploadedFileName} showStatus centered prominent />
      </div>
    ) : (
      <UploadArea file={file} setFile={setFile} handleUpload={handleUpload} uploading={uploading} />
    )}
  </section>;
}

export default WelcomeScreen;
