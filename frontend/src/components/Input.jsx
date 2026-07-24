function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-lg
        border
        border-[#34301f]
        bg-[#15130f]
        px-4
        py-3
        font-mono
        text-sm
        text-[#ede4d3]
        outline-none
        transition
        placeholder:text-[#6f6656]
        focus:border-[#c9974b]
        focus:ring-2
        focus:ring-[#c9974b]/20
      "
    />
  );
}

export default Input;
