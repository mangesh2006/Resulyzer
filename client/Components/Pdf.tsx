import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

const Pdf = () => {
  const { fileName } = useParams();
  const [response, setResponse] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const api = await fetch(`https://resulyzer.onrender.com/api/Fetchpdf?fileName=${fileName}`)

        const res = await api.json();

        if (api.status === 200) {
          setResponse(res.text);
        } else {
          toast.error(res.message || "Failed to load content");
        }
      } catch (error) {
        toast.error("Error fetching PDF content");
      }
    };

    handleFetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>{fileName}</title>
        <meta name="description" content="This is a resume analyzed page" />
      </Helmet>
      <main className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto p-8 overflow-y-auto">
          <header className="mb-6 border-b pb-4">
            <h2 className="text-3xl font-semibold text-blue-700 break-words">
              {fileName}
            </h2>
          </header>
          <article className="prose prose-lg max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 prose-a:underline">
            <ReactMarkdown>{response}</ReactMarkdown>
          </article>
        </div>
      </main>
    </>
  );
};

export default Pdf;
