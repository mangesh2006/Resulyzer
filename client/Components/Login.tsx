import { Key, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);

    try {
      const api = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await api.json();

      if (api.status === 200) {
        toast.success(res.message);
        navigate("/dashboard");
      } else {
        toast.error(res.message);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="This is a Login page" />
      </Helmet>
      <main className="h-screen flex justify-center items-center">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center gap-7 rounded-lg shadow p-7">
              <h1 className="font-bold text-2xl">Login</h1>
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
              <Link className="text-blue-400 hover:underline" to={"/verify-email"}>
                Forgot password?
              </Link>
              <button
                className="p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg flex justify-center items-center"
                disabled={Loading}
              >
                {Loading ? <Loader2 className="animate-spin" /> : "Login"}
              </button>
              <p>
                Don't have an account?{" "}
                <Link className="text-blue-500 hover:underline" to={"/signup"}>
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
