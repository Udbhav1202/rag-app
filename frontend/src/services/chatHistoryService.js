import api from "../api/axios";

export const getChatHistory = async (documentId) => {
  const response = await api.get(
    `/chat/${documentId}/messages`
  );

  return response.data;
};