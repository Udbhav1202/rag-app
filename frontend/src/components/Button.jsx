function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        rounded-lg
        bg-[#c9974b]
        px-4
        py-3
        font-semibold
        text-[#15130f]
        transition
        hover:bg-[#e3b463]
        disabled:cursor-not-allowed
        disabled:bg-[#34301f]
        disabled:text-[#6f6656]
      "
    >
      {children}
    </button>
  );
}

export default Button;
