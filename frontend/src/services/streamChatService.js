export const streamChat = async (
    question,
    document_id
) => {

    const response = await fetch(
        "/api/chat/stream",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization:
                    `Bearer ${
                        JSON.parse(
                            localStorage.getItem("auth")
                        ).access_token
                    }`,
            },

            body: JSON.stringify({
                question,
                
                document_id: document_id,
            }),
        }
    );

    return response;
};
