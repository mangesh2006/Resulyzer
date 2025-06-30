import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Menu,
  Upload,
  BarChart,
  User,
  LogOut,
  RefreshCcw,
  MoveRight,
  Trash2,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import EditDialog from "./EditDialog";

interface Responses {
  fileName: string;
  text: string;
}

type Updatedata = {
  fullname: string;
  username: string;
  email: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [MobileOpen, setMobileOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [Text, setText] = useState("");
  const [Responses, setResponses] = useState<Responses[]>([]);
  const [Loading, setLoading] = useState(false);
  const [Users, setUsers] = useState({
    fullname: "",
    username: "",
    email: "",
  });
  const [Uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("https://resulyzer.onrender.com/api/dashboard", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          toast.error("Unauthorized access");
        } else if (res.status === 404) {
          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        setUsers({
          fullname: data.user.fullname,
          username: data.user.username,
          email: data.user.email,
        });
      });
  }, []);

  useEffect(() => {
    const handlePdfFetch = async () => {
      const api = await fetch("https://resulyzer.onrender.com/api/pdf", {
        credentials: "include",
      });

      const res = await api.json();

      if (api.status === 200) {
        setResponses(res.pdf);
      } else {
        toast.error(res.message);
      }
    };

    handlePdfFetch();
  }, []);

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      id: "upload",
      label: "Upload Resume",
      icon: <Upload className="w-5 h-5" />,
    },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    setUploading(false);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.set("pdf", file);
        const api = await fetch("https://resulyzer.onrender.com/api/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const contentType = api.headers.get("content-type");
        let res: { message: string; analysis?: string } = {
          message: "Something went wrong",
        };

        if (contentType && contentType.includes("application/json")) {
          res = (await api.json()) as { message: string; analysis?: string };
        }

        console.log("API Status:", api.status);
        console.log("API Response:", res);

        if (api.status === 200 && res.analysis) {
          setText(res.analysis);
        } else {
          toast.error(res.message || "An error occurred. Please try again.");
        }
      } else {
        toast.error("Pdf file is required");
      }
    } catch (error) {
      console.log("Upload error:", error);
      toast.error("Network error while uploading. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("https://resulyzer.onrender.com/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 200) {
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const api = await fetch("https://resulyzer.onrender.com/api/delete", {
        method: "DELETE",
        credentials: "include",
      });

      const res = await api.json();

      if (api.status === 200) {
        toast.success(res.message);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (Updatedata: Updatedata) => {
    setUsers(Updatedata);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="This is a Dashboard" />
      </Helmet>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white p-6 space-y-6 hidden md:block">
          <h1 className="text-2xl font-bold">Resulyzer</h1>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition ${
                  activeTab === item.id
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-500"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Mobile menu overlay */}
        {MobileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div className="w-64 bg-blue-600 text-white p-6 h-full space-y-6 transform transition-transform duration-300">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Resulyzer</h1>
                <button
                  className="text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition ${
                      activeTab === item.id
                        ? "bg-white text-blue-600"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h2>
            <button
              className="md:hidden p-2 bg-blue-600 text-white rounded"
              onClick={() => setMobileOpen(!MobileOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Conditional Rendering */}
          {activeTab === "overview" && (
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Resume Stats
              </h3>

              {Responses.filter(Boolean).length === 0 ? (
                <p className="text-gray-600">No resume analyzed yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Responses.map((response, index) =>
                    response ? (
                      <Link
                        key={index}
                        to={`/dashboard/${response.fileName.replace(
                          ".pdf",
                          ""
                        )}`}
                        className="group block"
                      >
                        <div className="relative bg-gray-50 hover:bg-white p-5 border border-gray-200 hover:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden">
                          {/* Normal content (hidden on hover) */}
                          <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-200 space-y-2">
                            <h4 className="text-lg font-bold text-gray-800 truncate max-w-[75%]">
                              {response.fileName}
                            </h4>
                            <div className="text-sm text-gray-600 line-clamp-4">
                              <ReactMarkdown>
                                {response.text.slice(0, 250) + " ...."}
                              </ReactMarkdown>
                            </div>
                          </div>

                          {/* Hover icon */}
                          <MoveRight
                            size={40}
                            className="absolute inset-0 m-auto text-blue-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                          />
                        </div>
                      </Link>
                    ) : null
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "upload" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Upload Resume</h3>
              <input
                type="file"
                accept="application/pdf"
                className="border p-2 w-full cursor-pointer"
                onChange={handleChange}
              />
              {Uploading ? <Loader2 className="animate-spin"/> : ""}
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
                onClick={handleUpload}
                disabled={Loading || Uploading}
              >
                {Loading ? "Analysing...." : "Analyze"}
              </button>

              <div className="space-y-4 overflow-auto">
                <ReactMarkdown>{Text}</ReactMarkdown>
                {Text && (
                  <button
                    className={`flex items-center gap-1 text-blue-600 cursor-pointer disabled:text-gray-500 disabled:cursor-default`}
                    onClick={handleUpload}
                    disabled={Loading}
                  >
                    <RefreshCcw className="w-4 h-4" /> Try again
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
              <p className="text-gray-600">Full Name: {Users.fullname}</p>
              <p className="text-gray-600">Username: {Users.username}</p>
              <p className="text-gray-600">Email: {Users.email}</p>
              <div className="flex gap-3 mt-2">
                <EditDialog
                  onSave={handleUpdate}
                  fullname={Users.fullname}
                  username={Users.username}
                  email={Users.email}
                />
                <button
                  className="p-2 rounded-lg text-white bg-red-400 hover:bg-red-500 transition-all flex justify-center items-center gap-2"
                  onClick={handleDelete}
                >
                  <Trash2 size={18} />
                  Delete profile
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
