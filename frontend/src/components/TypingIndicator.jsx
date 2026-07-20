import { Bot } from "lucide-react";

function TypingIndicator() {
    return (
        <div className="flex justify-start">

            <div className="flex items-end gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-200
                    "
                >
                    <Bot size={20} />
                </div>

                <div
                    className="
                        rounded-3xl
                        bg-white
                        px-5
                        py-4
                        shadow
                    "
                >
                    <div className="flex gap-2">

                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>

                        <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                            style={{ animationDelay: "0.15s" }}
                        ></div>

                        <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                            style={{ animationDelay: "0.3s" }}
                        ></div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default TypingIndicator;