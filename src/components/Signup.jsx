import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Loader } from "./Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "react-toastify/dist/ReactToastify.css";

export function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { signup, loading } = useAuth();
  const {setUser} = useContext(AuthContext)

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
    if(!formData.email || !formData.firstName || !formData.lastName || !formData.userName || !formData.password || !formData.confirmPassword ){
     return toast.error("❌ please fill all credential to signup");

    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }
    setLoading(true);
        try {
          const response = await fetch("https://recommendation-system-7a8m.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData), // Sending confirmPassword too
          });
    
          const data = await response.json();
    
          if (!response.ok) {
           return toast.error("unable to signup, try again");  
          }
    
          setUser(data.user);
          toast.success("✅ Signup Successful!");
          navigate("/login");
          return { success: true };
        } catch (error) {
          toast.error(` ${error.message}`);
          return { success: false, message: error.message };
        } finally {
          setLoading(false);
        }

  };

  return (
    <div className="flex h-screen w-full items-center flex-col">
      <div className='w-[100%] flex justify-end absolute right-0 left-0  px-[50px] py-[30px] items-center bg-transparent'>
          <Link to='/'>
          <div className='flex justify-center items-center gap-[5px]'>
              <div className='bg-[#2563EB] px-[10px] lg:px-[12px] flex justify-center items-center lg:text-[1.3vw] text-[5vw] md:text-[2.5vw] rounded-[8px] font-bold text-white'>E</div>
              <p className='lg:text-[1.3vw] text-[5vw] md:text-[2.5vw] font-black text-black'>EduPath</p>
          </div>
          </Link>
      </div>
      <div className="w-full flex">
          <div className=" hidden lg:flex h-screen w-[50%]">
              <img src="/image/study.jpg" className=" w-full h-full object-cover brightness-50" alt="" />
          </div>
          <div className="bg-white w-full lg:w-[50%] h-screen px-[20px] md:px-[100px] lg:px-[6vw] flex flex-col justify-start items-start pt-[100px] overflow-y-scroll pb-[50px]">
            <h2 className="text-[#2563EB] lg:text-[2.3vw] md:text-[5vw] text-[6.5vw] font-semibold text-center">Sign up a new account</h2>
            <p className="text-center text-gray-500 mt-4 lg:text-[1.1vw] md:text-[2.9vw] text-[4.5vw]" >
                  Already have an account? <Link to ="/login" className="text-[#2563EB] font-semibold">Log in</Link>
            </p>
            <form className=" w-full mt-[1vh] flex flex-col gap-[3vh]" onSubmit={handleSignUp}>
              {["firstName", "lastName", "userName", "email"].map((name, index) => (
                <div key={index} className="flex items-center border-b border-[#2563EB] py-2 mt-4">
                  <span className="text-[#2563EB] mr-2">
                    {name === "email" ? <FaEnvelope className="text-[2vh]"/> : <FaUser className="text-[2vh]" />}
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
              <div className="flex items-center border-b border-[#2563EB] py-2 mt-4">
                <span className="text-[#2563EB] mr-2">
                  <FaLock className="text-[2vh]"/>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-[#2563EB]">
                  {showPassword ? <FaEyeSlash className="text-[2vh]"/> : <FaEye className="text-[2vh]"/>}
                </button>
              </div>

              <div className="flex items-center border-b border-pink-300 py-2 mt-4">
                <span className="text-[#2563EB] mr-2">
                  <FaLock className="text-[2vh]"/>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 outline-none"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 text-[#2563EB]">
                  {showConfirmPassword ? <FaEyeSlash className="text-[2vh]"/> : <FaEye className="text-[2vh]"/>}
                </button>
              </div>
              <button className="w-full bg-[#2563EB] text-white p-2 rounded-lg mt-4 lg:text-[1vw] md:text-[2.7vw] text-[4.3vw] mb-[40px] md:mb-[10px]" disabled={loading}>
                {loading ? <Loader/> : "Sign Up"}
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}
