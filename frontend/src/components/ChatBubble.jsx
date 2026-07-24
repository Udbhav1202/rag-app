import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatBubble({ role, message }) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[92%] sm:max-w-[70%]">
          <div className="rounded-2xl rounded-tr-sm bg-[#c9974b] px-5 py-4 text-[#15130f] shadow-sm">
            <p className="whitespace-pre-wrap text-[15px] leading-7">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] border-l-2 border-[#c9974b]/60 py-1 pl-5 sm:max-w-[75%]">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#c9974b]/80">
          Response
        </span>
        <div
          className="
            mt-1.5 text-[15px] leading-7 text-[#ede4d3]
            [&>*]:my-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
            [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-[#ede4d3]
            [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[#ede4d3]
            [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#e3b463]
            [&_strong]:font-semibold [&_strong]:text-[#e3b463]
            [&_em]:italic [&_em]:text-[#a69c89]
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
            [&_li]:leading-6
            [&_a]:text-[#c9974b] [&_a]:underline [&_a]:underline-offset-2
            [&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-[#1c1914] [&_code]:border [&_code]:border-[#34301f] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5
            [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:bg-[#1c1914] [&_pre]:border [&_pre]:border-[#34301f] [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:overflow-x-auto
            [&_blockquote]:border-l-2 [&_blockquote]:border-[#34301f] [&_blockquote]:pl-3 [&_blockquote]:text-[#a69c89]
            [&_hr]:border-[#34301f]
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
