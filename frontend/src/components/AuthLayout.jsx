function AuthLayout({ children }) {
    return (
        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-100
            "
        >
            {children}
        </div>
    );
}

export default AuthLayout;