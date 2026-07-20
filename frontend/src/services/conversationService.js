import { streamChat } from "./streamChatService";

export const sendMessage = async ({
    question,
    documentId,
    setConversation,
    setQuestion,
    setLoading,
}) => {

    if (!question.trim()) return;

    const currentQuestion = question;

    // Add user message
    setConversation((prev) => [
        ...prev,
        {
            type: "user",
            content: currentQuestion,
        },
    ]);

    setQuestion("");

    setLoading(true);

    try {

        const response = await streamChat(
            currentQuestion,
            documentId
        );

        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        let completeAnswer = "";

        let firstChunk = true;

        while (true) {

            const { done, value } =
                await reader.read();

            if (done) break;

            const chunk =
                decoder.decode(value);

            if (firstChunk) {
                setLoading(false);
                firstChunk = false;
            }

            completeAnswer += chunk;

            setConversation((prev) => {

                const updated = [...prev];

                const last =
                    updated[updated.length - 1];

                if (
                    last &&
                    last.type === "assistant"
                ) {

                    last.content =
                        completeAnswer;

                } else {

                    updated.push({
                        type: "assistant",
                        content: completeAnswer,
                    });

                }

                return [...updated];

            });

        }

        setLoading(false);

    } catch (error) {

        console.log(error);

        setLoading(false);

    }

};