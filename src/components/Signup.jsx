import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { Loader } from "./Loader";

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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const result = await signup(formData);

    if (result.success) {
      alert("Signup Successful!");
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-pink-500 text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleSignUp}>
          {["firstName", "lastName", "userName", "email", "password", "confirm password"].map((name, index) => (
            <div key={index} className="flex items-center border-b border-pink-300 py-2 mt-4">
              <span className="text-pink-500 mr-2">
                {name.includes("password") ? <FaLock /> : name === "email" ? <FaEnvelope /> : <FaUser />}
              </span>
              <input
                type={name.includes("password") ? "password" : "text"}
                name={name}
                placeholder={name.replace(/([A-Z])/g, " $1")}
                className="w-full p-2 outline-none"
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button
            className="w-full bg-pink-500 text-white p-2 rounded-lg mt-4"
            disabled={loading}
          >
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
