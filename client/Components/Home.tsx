import { Link } from "react-router-dom";
import { BarChart, CheckCircle, Search, UploadCloud } from "lucide-react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Resulyzer – Decode Your Resume’s Potential</title>
        <meta name="description" content="This is a Home page" />
      </Helmet>
      <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-16">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">Resulyzer</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Analyze your resume in seconds. Get insights, improve your chances.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Your Resume
          </Link>
        </section>

        {/* How It Works Section */}
        <section className="mt-24 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <UploadCloud className="h-10 w-10 text-blue-600 mb-3 mx-auto" />
                ),
                title: "1. Upload Resume",
                desc: "Simply upload your resume in PDF format.",
              },
              {
                icon: (
                  <Search className="h-10 w-10 text-blue-600 mb-3 mx-auto" />
                ),
                title: "2. Let AI Analyze",
                desc: "Our AI scans your resume and evaluates multiple criteria.",
              },
              {
                icon: (
                  <BarChart className="h-10 w-10 text-blue-600 mb-3 mx-auto" />
                ),
                title: "3. Get Report",
                desc: "Receive a detailed report with actionable suggestions.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                {step.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Why Use Resulyzer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Insights",
                desc: "Understand how recruiters and bots see your resume.",
              },
              {
                title: "Instant Feedback",
                desc: "Receive actionable tips to improve formatting and content.",
              },
              {
                title: "Job Match Score",
                desc: "Match your resume to real job descriptions with accuracy.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to boost your resume?
          </h2>
          <Link
            to="/signup"
            className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Try Resulyzer Now
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-24 py-10 text-center text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Resulyzer. All rights reserved.
        </footer>
      </main>
    </>
  );
};

export default Home;
