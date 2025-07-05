import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./components/Login";
import { SignUpPage } from "./components/Signup";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage/HomePage";
import Demo from "./pages/Demo";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RecommendationPage from "./pages/Recommendation/RecommendationPage";
import CoursePage from "./pages/Courses/CoursePage";
import ResultPage from "./pages/Recommendation/ResultPage";

export default function App() {
  return (
    <>
  <ToastContainer />
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/result" element={<ResultPage />} />
        {/* <Route path="/home" element={<HomeTest />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/career-recommendation" element={<RecommendationPage />} />
        <Route path="/explore-courses" element={<CoursePage />} />

        {/* <Route path="/login" element={<LoginTest />} /> */}
       

      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}