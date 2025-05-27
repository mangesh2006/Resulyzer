import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [Email, setEmail] = useState("");
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      setLoading(true);
      const api = await fetch("https://resulyzer.onrender.com/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: Email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await api.json();

      if (api.status === 200) {
        toast.success(res.message);
        localStorage.setItem("Email", Email);
        navigate("/forgot-password");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Email verification</title>
        <meta name="description" content="This is a email verification page" />
      </Helmet>

      <main className="h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 shadow rounded-lg p-5">
          <div className="flex gap-2 mb-2 border-b border-gray-400">
            <Mail className="text-gray-400 mb-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 outline-none"
            />
          </div>
          <button
            onClick={handleVerify}
            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg flex justify-center items-center"
          >
            {Loading ? <Loader2 className="animate-spin" /> : "Verify Email"}
          </button>
        </div>
      </main>
    </>
  );
};

export default VerifyEmail;
