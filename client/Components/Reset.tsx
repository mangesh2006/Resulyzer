import { Helmet } from "react-helmet";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRoundIcon, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain 8 characters" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase latter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase latter",
      })
      .regex(/[@,!,#,$,%,^,&,*]/, {
        message: "Password must contain at least one special character",
      }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });

const Reset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem("Email");

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try {
      setLoading(true);
      const api = await fetch("https://resulyzer.onrender.com/api/reset-password", {
        method: "PUT",
        body: JSON.stringify({ password: data.password, email }),
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
        <title>Reset Password</title>
        <meta name="description" content="This is a reset password page" />
      </Helmet>

      <main className="h-screen flex justify-center items-center">
        <div className="flex flex-col shadow rounded-lg p-10">
          <h2 className="font-bold text-2xl mb-8">Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-2 border-b border-gray-400">
                <KeyRoundIcon className="text-gray-400 mb-2" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  {...register("password")}
                  className="outline-none mb-2"
                />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
              <div className="flex gap-2 border-b border-gray-400 mb-2">
                <KeyRoundIcon className="text-gray-400 mb-2" />
                <input
                  type="password"
                  placeholder="Re-enter password"
                  {...register("confirmpassword")}
                  className="outline-none mb-2"
                />
              </div>
              {errors.confirmpassword && (
                <p className="text-red-600">{errors.confirmpassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="p-2 w-full bg-blue-400 hover:bg-blue-500 rounded-lg text-white mt-4 flex justify-center items-center"
            >
              {Loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Reset;
