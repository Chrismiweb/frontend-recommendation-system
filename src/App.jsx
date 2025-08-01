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
import UniversityPage from "./pages/University/UniversityPage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

export default function App() {
  return (
    <>
  <ToastContainer />
    <AuthProvider>
    <Router>
      <Routes>
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
              <DashboardPage />
          </ProtectedRoute>
          } />
          <Route path="/career-recommendation" element={
            <ProtectedRoute>
                <RecommendationPage />
            </ProtectedRoute>
          } />
          <Route path="/explore-courses" element={
            <ProtectedRoute>
                <CoursePage />
            </ProtectedRoute>
          } />
          <Route path="/explore-universities" element={
            <ProtectedRoute>
                <UniversityPage />
            </ProtectedRoute>
          } />

        {/* <Route path="/explore-universities" element={<UniversityPage />} /> */}
        {/* <Route path="/login" element={<LoginTest />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}