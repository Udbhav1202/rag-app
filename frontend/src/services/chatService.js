import api from "../api/axios";

export const askQuestion = async (
    question,
    session_id,
    document_id
) => {

    const response = await api.post("/chat", {
        question,
        session_id,
        document_id,
    });

    return response.data;
};