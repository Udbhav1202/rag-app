function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#15130f] px-4">
      {/* lamp glow signature element */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #c9974b 0%, transparent 70%)" }}
      />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}

export default AuthLayout;
