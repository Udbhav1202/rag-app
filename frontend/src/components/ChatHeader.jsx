import { Bot } from "lucide-react";

function ChatHeader() {

    return (

        <div className="flex items-center gap-3 border-b bg-white px-6 py-4">

            <Bot
                className="text-blue-600"
                size={30}
            />

            <div>

                <h1 className="text-xl font-bold">
                    DocChatAI
                </h1>

                <p className="text-sm text-gray-500">
                    Chat with your document
                </p>

            </div>

        </div>

    );

}

export default ChatHeader;