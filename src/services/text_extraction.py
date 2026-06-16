from pypdf import PdfReader
from docx import Document


def extract_text(file_path):
    #Detect file type and call
    #the appropriate extraction function.

    if file_path.endswith(".pdf"):
        return extract_pdf_text(
            file_path
        )

    elif file_path.endswith(".docx"):
        return extract_docx_text(
            file_path
        )

    elif file_path.endswith(".txt"):
        return extract_txt_text(
            file_path
        )

    else:
        raise ValueError(
            "Unsupported file format"
        )


def extract_pdf_text(file_path):
    # Read all pages from a PDF
    # and combine them into one string.

    reader = PdfReader(
        file_path
    )

    text = ""

    for page in reader.pages:
        text += (
            page.extract_text() or ""
        ) + "\n"

    return text


def extract_docx_text(file_path):
    # Extract text from all paragraphs
    # inside a DOCX document.

    doc = Document(
        file_path
    )

    text = "\n".join(
        paragraph.text
        for paragraph in doc.paragraphs
    )

    return text


def extract_txt_text(file_path):
    # Read plain text file contents.

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as file:

        return file.read()