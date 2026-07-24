function Card({ children }) {
  return (
    <div className="w-full rounded-2xl border border-[#34301f] bg-[#1c1914] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      {children}
    </div>
  );
}

export default Card;
