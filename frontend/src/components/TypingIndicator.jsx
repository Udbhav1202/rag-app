function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="border-l-2 border-[#c9974b]/60 py-1 pl-5">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#c9974b]/80">
          Response
        </span>
        <div className="mt-2.5 flex gap-1.5">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9974b]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9974b]" style={{ animationDelay: "0.15s" }} />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9974b]" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
