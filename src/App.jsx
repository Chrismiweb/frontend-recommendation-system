import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./components/Login";
import { SignUpPage } from "./components/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
  <ToastContainer />
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
    </>
  );
}