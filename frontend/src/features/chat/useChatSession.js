import { useEffect, useRef, useState } from "react";
import { getChatHistory } from "../../services/chatHistoryService";
import { sendMessage } from "../../services/conversationService";
import { getDocuments } from "../../services/document/documentService";
import { uploadConversationDocument } from "../../services/uploadConversationService";

const createAttachment = (fileName) => ({
  type: "attachment",
  fileName,
});

const createHistory = (document, messages) => [
  createAttachment(document.filename),
  ...messages.map(({ role, content }) => ({ type: role, content })),
];

export function useChatSession(initialDocumentId = null) {
  const [documentId, setDocumentId] = useState(initialDocumentId);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [documentUploaded, setDocumentUploaded] = useState(Boolean(initialDocumentId));
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const bottomRef = useRef(null);

  const conversationStarted = conversation.some(
    ({ type }) => type === "user" || type === "assistant",
  );
  const attachment = conversation[0];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  useEffect(() => {
    let isCurrent = true;

    async function loadDocuments() {
      try {
        const data = await getDocuments();
        if (!isCurrent) return;

        setDocuments(data);

        const initialDocument = data.find((document) => document.id === initialDocumentId);
        if (initialDocument) {
          setSelectedDocument(initialDocument);
          setConversation([createAttachment(initialDocument.filename)]);
        }
      } catch (error) {
        console.error("Unable to load documents.", error);
      } finally {
        if (isCurrent) setDocumentsLoading(false);
      }
    }

    loadDocuments();
    return () => {
      isCurrent = false;
    };
  }, [initialDocumentId]);

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
          setSelectedDocument(
            latestDocuments.find((document) => document.id === uploadedDocument.id) ?? uploadedDocument,
          );
        },
      });
    } catch (error) {
      console.error("Unable to upload document.", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = () =>
    sendMessage({
      question,
      documentId: selectedDocument?.id ?? documentId,
      setConversation,
      setQuestion,
      setLoading,
    });

  const handleSelectDocument = async (document) => {
    if (selectedDocument?.id === document.id) return;

    setSelectedDocument(document);
    setDocumentId(document.id);
    setDocumentUploaded(true);

    try {
      setConversation(createHistory(document, await getChatHistory(document.id)));
    } catch (error) {
      console.error("Unable to load chat history.", error);
      setConversation([createAttachment(document.filename)]);
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

  return {
    attachment,
    bottomRef,
    conversation,
    conversationStarted,
    documentUploaded,
    documents,
    documentsLoading,
    file,
    handleAsk,
    handleNewChat,
    handleSelectDocument,
    handleUpload,
    loading,
    question,
    selectedDocument,
    setFile,
    setQuestion,
    uploading,
  };
}
