import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { Loader } from "./Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignUpPage() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    const result = await signup(formData);

    if (result.success) {
      toast.success("✅ Signup Successful!");
      navigate("/");
    } else {
      toast.error(`❌ ${result.message}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-pink-500 text-2xl font-bold text-center">Sign Up</h2>

        <form className="mt-4" onSubmit={handleSignUp}>
          {["firstName", "lastName", "userName", "email"].map((name, index) => (
            <div key={index} className="flex items-center border-b border-pink-300 py-2 mt-4">
              <span className="text-pink-500 mr-2">
                {name === "email" ? <FaEnvelope /> : <FaUser />}
              </span>
              <input
                type="text"
                name={name}
                placeholder={name.replace(/([A-Z])/g, " $1")}
                className="w-full p-2 outline-none"
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Password Field */}
          <div className="flex items-center border-b border-pink-300 py-2 mt-4">
            <span className="text-pink-500 mr-2">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-pink-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center border-b border-pink-300 py-2 mt-4">
            <span className="text-pink-500 mr-2">
              <FaLock />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 text-pink-500">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="w-full bg-pink-500 text-white p-2 rounded-lg mt-4" disabled={loading}>
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/" className="text-pink-500">Login</a>
        </p>
      </div>
    </div>
  );
}
