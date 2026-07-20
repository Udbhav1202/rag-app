import { uploadDocument } from "./uploadService";

export const uploadConversationDocument = async ({
  file,
  setDocumentId,
  setConversation,
  setDocumentUploaded,
  onUploadSuccess,
}) => {
  if (!file) return;

  try {
    const data = await uploadDocument(file);

    setDocumentId(data.document_id);

    setDocumentUploaded(true);

    setConversation([
      {
        type: "attachment",
        fileName: file.name,
      },
    ]);

    await onUploadSuccess?.({
      id: data.document_id,
      filename: file.name,
      session_id: data.session_id,
    });
  } catch (error) {
    console.log(error);
  }
};