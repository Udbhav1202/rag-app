function Input({
    type = "text",
    placeholder,
    value,
    onChange,
}) {
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
                border-gray-300
                px-4
                py-3
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
            "
        />
    );
}

export default Input;