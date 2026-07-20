import api from "../api/axios";

export const uploadDocument = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/upload",
        formData
    );

    return response.data;
};