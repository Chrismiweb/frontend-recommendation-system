import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./components/Login";
import { SignUpPage } from "./components/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import LoginTest from "./components/LoginTest";
import HomeTest from "./pages/HomeTest";
import UserAuth from "./context/UserAuth";
import AuthProvider from "./context/AuthProvider";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <>
  <ToastContainer />
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/home" element={<HomeTest />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/login" element={<LoginTest />} /> */}

      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}