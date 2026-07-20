function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="
                w-full
                rounded-lg
                bg-blue-600
                px-4
                py-3
                text-white
                font-semibold
                transition
                hover:bg-blue-700
                disabled:bg-gray-400
                disabled:cursor-not-allowed
            "
        >
            {children}
        </button>
    );
}

export default Button;