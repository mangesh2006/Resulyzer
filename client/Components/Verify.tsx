import { KeyRoundIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const [Loading, setLoading] = useState(false);
  const [Otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);

    const email = localStorage.getItem("Email");

    if (!email) {
      navigate("/");
      return;
    }

    try {
      const api = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        body: JSON.stringify({ email, otp: Otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await api.json();

      if (api.status === 200) {
        toast.success(res.message);
        localStorage.removeItem("Email");
        navigate("/login");
      } else {
        toast.error(res);
      }
    } catch (error) {
      console.log(error);
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  const Resendotp = async () => {
    try {
      const email = localStorage.getItem("Email");
      const api = await fetch("http://localhost:3000/api/resend-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await api.json();

      if (api.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Verify email</title>
        <meta name="description" content="This is a Verify email page" />
      </Helmet>
      <main className="flex h-screen justify-center items-center">
        <div className="flex flex-col justify-center gap-3 shadow p-6 rounded-lg">
          <h1 className="font-bold text-2xl mb-2">Verify</h1>
          <div className="flex gap-2 items-center border-b border-gray-400">
            <KeyRoundIcon className="text-gray-400 mb-2" />
            <input
              type="text"
              placeholder="Enter otp"
              className="mb-2 outline-none border-none bg-transparent"
              maxLength={6}
              value={Otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            className="flex justify-center items-center p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer"
            disabled={Loading}
            onClick={handleVerify}
          >
            {Loading ? <Loader2 className="animate-spin" /> : "Verify"}
          </button>
          <p>
            Didn't receive opt? <a className="text-blue-400 cursor-pointer hover:underline" onClick={Resendotp}>Resend otp</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Verify;
