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
    <div className="flex  flex-col items-center justify-center bg-pink-100 pb-4">
      <div className='w-[100%] flex justify-between  px-[20px] py-[15px] items-center bg-transparent'>
            <Link to="/"><p className='text-pink-600 font-semibold text-[14px] w-[50%] md:w-[100%] md:text-[22px] lg:text-[18px] font-serif'>Career Recommendation System</p></Link>
            <div className='flex gap-[20px]'>
            <Link to = "/login">
                <Button color="pink" variant="solid">
                    Log In
                </Button>
            </Link>
            </div>

        </div>
      <div className="bg-white my-[50px] p-8 rounded-2xl mb-[500px] lg:mb-[100px] shadow-lg md:w-[65%] w-[90%] lg:w-[35%]">
        <h2 className="text-pink-500 text-[20px] font-bold text-center">Sign Up</h2>
        <form className="" onSubmit={handleSignUp}>
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
          Already have an account? <Link to ="/login" className="text-pink-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
