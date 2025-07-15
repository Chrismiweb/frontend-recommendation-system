import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Loader } from "./Loader";
import { toast } from "react-toastify"; 
import { Link } from "react-router-dom";
import { Button } from "antd";

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
      const response = await fetch("https://recommendation-system-7a8m.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || " Invalid login credentials");
      }
        // console.log(data)
      // setUser(data.user);
      setUser(data.existingUser)
      toast.success("✅ Login Successful!");
      localStorage.setItem("token", data.token ) //store user token
      localStorage.setItem("username", data.existingUser.userName); // ✅ store username
      navigate("/dashboard")
      // return { success: true };
    } catch (error) {
      toast.error(` ${"Unable to login, Check internet connection"}`);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

   

  return (
    <div className="flex h-screen w-full items-center flex-col">
       <div className='w-[100%] flex justify-end absolute right-0 left-0 px-[50px] py-[30px] items-center bg-transparent'>
          <Link to='/'>
          <div className='flex justify-center items-center gap-[5px]'>
              <div className='bg-[#2563EB] px-[10px] lg:px-[12px] flex justify-center items-center lg:text-[1.3vw] text-[5vw] md:text-[2.5vw] rounded-[8px] font-bold text-white'>E</div>
              <p className='lg:text-[1.3vw] text-[5vw] md:text-[2.5vw] font-black text-black'>EduPath</p>
          </div>
          </Link>
        </div>
        <div className="bg-blue-800 w-full h-screen flex">
          <div className="hidden lg:flex h-screen w-[50%]">
              <img src="/image/study.jpg" className="w-full h-full object-cover brightness-50" alt="" />
          </div>
          <div className="bg-white w-full lg:w-[50%] h-screen px-[20px] md:px-[100px] lg:px-[120px] xl:px-[150px] flex flex-col justify-start items-start pt-[120px] lg:pt-[160px]">
            <h2 className="text-[#2563EB] lg:text-[2.3vw] md:text-[5vw] text-[6.5vw] font-semibold text-center">Sign in to your account</h2>
            <p className="text-center text-gray-500 mt-4 lg:text-[1.1vw] md:text-[2.9vw] text-[4.5vw]" >
                  Don't have an account? <Link to ="/signup" className="text-[#2563EB] font-semibold">Sign Up</Link>
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <form className="w-[100%] mt-[50px] flex flex-col gap-[24px]" onSubmit={handleLogin}>
              <div className="flex items-center border-b [#2563EB] py-2">
                <FaEnvelope className="text-[#2563EB] mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center border-b border-[#2563EB] py-2 mt-4">
                <FaLock className="text-[#2563EB] mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-[#2563EB] text-white py-[16px] rounded-lg mt-4 lg:text-[1vw] md:text-[2.7vw] text-[4.3vw]"
                disabled={loading}
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </form>
            
          </div>
        </div>
        
    </div>
  );
}
