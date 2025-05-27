import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Components/Home";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import Verify from "../Components/Verify";
import Dashboard from "../Components/Dashboard";
import Pdf from "../Components/Pdf";
import Forgot from "../Components/Forgot";
import Reset from "../Components/Reset";
import VerifyEmail from "../Components/VerifyEmail";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:fileName" element={<Pdf />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password" element={<Reset />} />
        </Routes>
      )}
    </>
  );
}

export default App;
