import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, User2, Mail, Key, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignupSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Please enter valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase" })
    .regex(/[A-Z]/, { message: "Password must contain at least one Uppercase" })
    .regex(/[0-9]/, { message: "Passowrd must contain at least one number" })
    .regex(/[@, !, #, $, %, &, *, ^]/, {
      message: "Password must contain at least one special character",
    }),
});

const Signup = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    setLoading(true);

    try {
      const api = await fetch("https://resulyzer.onrender.com/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await api.json();

      if (api.status === 200) {
        toast.success(res.message);
        localStorage.setItem("Email", data.email);
        navigate("/verify");
      } else {
        toast.error(res);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
        <title>Signup</title>
        <meta name="description" content="This is a Signup page" />
      </Helmet>
      <main className="h-screen flex justify-center items-center">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center gap-7 rounded-lg shadow p-7">
              <h1 className="font-bold text-2xl">Sign up</h1>
              <div className="flex gap-2 items-center border-b border-gray-400">
                <CircleUserRound className="text-gray-400 mb-2" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullname")}
                  className="mb-2 outline-none border-none"
                />
              </div>
              {errors.fullname && (
                <p className="text-red-600 flex gap-0">
                  {errors.fullname.message}
                </p>
              )}
              <div className="flex gap-2 items-center border-b border-gray-400">
                <User2 className="text-gray-400 mb-2" />
                <input
                  type="text"
                  placeholder="Enter your Username"
                  {...register("username")}
                  className="mb-2 outline-none border-none"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 flex gap-0">
                  {errors.username.message}
                </p>
              )}
              <div className="flex gap-2 items-center border-b border-gray-400">
                <Mail className="text-gray-400 mb-2" />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  {...register("email")}
                  className="mb-2 outline-none border-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 flex gap-0">
                  {errors.email.message}
                </p>
              )}
              <div className="flex gap-2 items-center border-b border-gray-400">
                <Key className="text-gray-400 mb-2" />
                <input
                  type="password"
                  placeholder="Enter your Password"
                  {...register("password")}
                  className="mb-2 outline-none border-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 flex gap-0">
                  {errors.password.message}
                </p>
              )}
              <button
                className="p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg flex justify-center items-center"
                disabled={Loading}
              >
                {Loading ? <Loader2 className="animate-spin" /> : "Signup"}
              </button>
              <p>
                Already have an account?{" "}
                <Link className="text-blue-500 hover:underline" to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;
