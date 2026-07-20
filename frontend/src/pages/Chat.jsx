import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Conversation from "../components/Conversation";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import WelcomeScreen from "../components/WelcomeScreen";
import { uploadConversationDocument } from "../services/uploadConversationService";
import { sendMessage } from "../services/conversationService";
import { getDocuments } from "../services/document/documentService";
import { getChatHistory } from "../services/chatHistoryService";

function Chat() {
  const location = useLocation();
  const [documentId, setDocumentId] = useState(
    location.state?.document_id || null,
  );
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [documentUploaded, setDocumentUploaded] = useState(
    !!location.state?.document_id,
  );
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const bottomRef = useRef(null);
  const attachment = conversation[0];
  const conversationStarted = conversation.some(
    (item) => item.type === "user" || item.type === "assistant",
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    let isCurrent = true;

    getDocuments()
      .then((data) => {
        if (isCurrent) setDocuments(data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (isCurrent) setDocumentsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleUpload = async () => {
    if (!file || uploading) return;
    setUploading(true);
    try {
      await uploadConversationDocument({
        file,
        setDocumentId,
        setConversation,
        setDocumentUploaded,
        onUploadSuccess: async (uploadedDocument) => {
          const latestDocuments = await getDocuments();

          setDocuments(latestDocuments);

          const selected = latestDocuments.find(
            (doc) => doc.id === uploadedDocument.id,
          );

          setSelectedDocument(selected);
          setDocumentsLoading(false);
        },
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = async () => {
    await sendMessage({
      question,
      documentId: selectedDocument?.id || documentId,
      setConversation,
      setQuestion,
      setLoading,
    });
  };

  const handleSelectDocument = async (document) => {
    if (selectedDocument?.id === document.id) return;

    setSelectedDocument(document);
    setDocumentId(document.id);
    setDocumentUploaded(true);

    try {
      const messages = await getChatHistory(document.id);

      const history = [
        {
          type: "attachment",
          fileName: document.filename,
        },
        ...messages.map((msg) => ({
          type: msg.role,
          content: msg.content,
        })),
      ];

      setConversation(history);
    } catch (error) {
      console.log(error);

      setConversation([
        {
          type: "attachment",
          fileName: document.filename,
        },
      ]);
    }
  };

  const handleNewChat = () => {
    setSelectedDocument(null);
    setDocumentId(null);
    setDocumentUploaded(false);
    setFile(null);
    setQuestion("");
    setConversation([]);
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((isOpen) => !isOpen)}
        documents={documents}
        documentsLoading={documentsLoading}
        selectedDocument={selectedDocument}
        onSelectDocument={handleSelectDocument}
        onNewChat={handleNewChat}
      />
      <main className="relative flex min-w-0 flex-1 flex-col">
        <header className="absolute left-6 top-4 z-10 flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-800">
          DocChatAI
          <span className="text-sm font-normal text-slate-400">
            Document chat
          </span>
        </header>
        <div className="flex min-h-0 flex-1 overflow-y-auto px-4 sm:px-6">
          {!documentUploaded || !conversationStarted ? (
            <WelcomeScreen
              file={file}
              setFile={setFile}
              handleUpload={handleUpload}
              uploading={uploading}
              uploadedFileName={
                documentUploaded
                  ? attachment?.fileName || file?.name || "Document"
                  : null
              }
            />
          ) : (
            <Conversation
              conversation={conversation}
              loading={loading}
              bottomRef={bottomRef}
            />
          )}
        </div>
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          handleAsk={handleAsk}
          loading={loading}
          disabled={!documentUploaded}
          onFileSelect={setFile}
        />
      </main>
    </div>
  );
}

export default Chat;
