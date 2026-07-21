import ChatInput from "../../components/ChatInput";
import Conversation from "../../components/Conversation";
import WelcomeScreen from "../../components/WelcomeScreen";

function ChatContent({ session }) {
  const {
    attachment,
    bottomRef,
    conversation,
    conversationStarted,
    documentUploaded,
    file,
    handleAsk,
    handleUpload,
    loading,
    question,
    setFile,
    setQuestion,
    uploading,
  } = session;

  return <>
    <div className="flex min-h-0 flex-1 overflow-y-auto px-4 sm:px-6">
      {!documentUploaded || !conversationStarted ? (
        <WelcomeScreen
          file={file}
          setFile={setFile}
          handleUpload={handleUpload}
          uploading={uploading}
          uploadedFileName={documentUploaded ? attachment?.fileName || file?.name || "Document" : null}
        />
      ) : (
        <Conversation conversation={conversation} loading={loading} bottomRef={bottomRef} />
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
  </>;
}

export default ChatContent;
