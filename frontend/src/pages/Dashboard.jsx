import { useNavigate } from "react-router-dom";

import {
    Bot,
    Upload,
    LogOut,
    FileText,
} from "lucide-react";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("auth");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}

            <nav className="bg-white shadow">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                    <div className="flex items-center gap-3">

                        <Bot className="text-blue-600" size={34} />

                        <h1 className="text-2xl font-bold">
                            DocChatAI
                        </h1>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                        <LogOut size={18} />

                        Logout
                    </button>

                </div>

            </nav>

            {/* Content */}

            <div className="mx-auto mt-10 max-w-5xl px-6">

                <h2 className="text-4xl font-bold">

                    Welcome back 👋

                </h2>

                <p className="mt-2 text-gray-600">

                    Upload a document and start chatting with AI.

                </p>

                {/* Upload Card */}

                <div className="mt-10 rounded-xl bg-white p-8 shadow">

                    <div className="flex items-center gap-3">

                        <Upload
                            size={28}
                            className="text-blue-600"
                        />

                        <h3 className="text-2xl font-semibold">

                            Upload Document

                        </h3>

                    </div>

                    <p className="mt-3 text-gray-500">

                        Upload a PDF, DOCX or TXT file and ask
                        questions about it instantly.

                    </p>

                    <button
                        onClick={() => navigate("/chat")}
                        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                    >
                        Upload Document
                    </button>

                </div>

                {/* Future Section */}

                <div className="mt-10 rounded-xl bg-white p-8 shadow">

                    <div className="flex items-center gap-3">

                        <FileText
                            size={28}
                            className="text-green-600"
                        />

                        <h3 className="text-2xl font-semibold">

                            Recent Documents

                        </h3>

                    </div>

                    <p className="mt-3 text-gray-500">

                        This section will display previously
                        uploaded documents.

                    </p>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;
