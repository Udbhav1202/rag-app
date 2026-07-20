function Card({ children }) {
    return (
        <div
            className="
                w-full
                max-w-md
                rounded-xl
                bg-white
                p-8
                shadow-lg
            "
        >
            {children}
        </div>
    );
}

export default Card;