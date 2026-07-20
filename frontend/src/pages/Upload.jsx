import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, ArrowLeft } from "lucide-react";

import { uploadDocument } from "../services/uploadService";
import Button from "../components/Button";
import Card from "../components/Card";

function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a document.");
      return;
    }

    setIsUploading(true);

    try {
      const data = await uploadDocument(file);

      navigate("/chat", {
        state: {
          document_id: data.document_id,
        },
      });
    } catch (error) {
      alert(error.response?.data?.detail || "Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 flex items-center gap-2 text-blue-600"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <Card>
        <h1 className="text-3xl font-bold text-center">Upload Document</h1>

        <p className="mt-2 mb-8 text-center text-gray-500">
          Upload a PDF, DOCX or TXT file and chat with it.
        </p>

        <label
          className="
                        flex
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border-2
                        border-dashed
                        border-blue-400
                        bg-blue-50
                        p-12
                        transition
                        hover:bg-blue-100
                    "
        >
          <UploadCloud size={60} className="text-blue-600" />

          <p className="mt-5 font-semibold">Click to choose a document</p>

          <p className="mt-2 text-gray-500">PDF • DOCX • TXT</p>

          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <div className="mt-6 rounded-lg bg-slate-100 p-4">
            <p className="font-medium">Selected File</p>

            <p className="text-gray-600">{file.name}</p>
          </div>
        )}

        <div className="mt-8">
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Upload;
