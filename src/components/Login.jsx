import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Loader } from "./Loader";
import { toast } from "react-toastify"; 

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:1050/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || " Invalid login credentials");
      }

      // setUser(data.user);
      setUser(data.existingUser)
      toast.success("✅ Login Successful!");
      localStorage.setItem("token", data.token ) //store user token
      navigate("/home")
      // return { success: true };
    } catch (error) {
      toast.error(` ${error.message}`);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }


    // if (result.success) {
    //   navigate("/home");
    // } else {
    //   setError(result.message);
    // }
  };

   

  return (
    <div className="flex h-screen items-center justify-center bg-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-pink-500 text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleLogin}>
          <div className="flex items-center border-b border-pink-300 py-2">
            <FaEnvelope className="text-pink-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border-b border-pink-300 py-2 mt-4">
            <FaLock className="text-pink-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-pink-500 text-white p-2 rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
                    Don't have an account? <a href="/signup" className="text-pink-500">Sign Up</a>
                </p>
      </div>
    </div>
  );
}
