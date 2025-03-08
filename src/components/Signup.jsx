import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";


const BASE_URL = "https://recommendation-system-7a8m.onrender.com"; // Replace with your actual backend URL


export function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    // Password validation regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Real-time password matching check
        if (name === "password" || name === "confirmPassword") {
            setIsPasswordMatch(
                name === "password" 
                    ? value === formData.confirmPassword 
                    : formData.password === value
            );
        }

        // Real-time validation
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case "firstName":
            case "lastName":
                if (!value.trim()) newErrors[name] = `${name === "firstName" ? "First" : "Last"} name is required`;
                else delete newErrors[name];
                break;
            case "userName":
                if (!value.trim()) newErrors.userName = "Username is required";
                else delete newErrors.userName;
                break;
            case "email":
                if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Valid email is required";
                else delete newErrors.email;
                break;
            case "password":
                if (!passwordRegex.test(value))
                    newErrors.password = "Password must be 8+ chars with uppercase, lowercase, and number";
                else delete newErrors.password;
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrors({});

        // Final validation
        if (!formData.password || !formData.confirmPassword) {
            setErrors({ general: "Please fill in all fields" });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors({ password: "Passwords do not match!" });
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            setErrors({ password: "Password must be 8+ chars with uppercase, lowercase, and number" });
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup Successful!");
                navigate("/login");
            } else {
                setErrors({ general: data.message || "Signup failed" });
            }
        } catch (error) {
            setErrors({ general: "Error connecting to the server" });
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-pink-100 p-4 overflow-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-pink-500 text-2xl font-bold text-center">Sign Up</h2>
                {errors.general && <p className="text-red-500 text-center mt-2">{errors.general}</p>}
                
                <form className="mt-4" onSubmit={handleSignUp}>
                    {[
                        { name: "firstName", placeholder: "First Name", icon: <FaUser /> },
                        { name: "lastName", placeholder: "Last Name", icon: <FaUser /> },
                        { name: "userName", placeholder: "Username", icon: <FaUser /> },
                        { name: "email", placeholder: "Email", icon: <FaEnvelope /> },
                        { name: "password", placeholder: "Password", icon: <FaLock />, type: "password" },
                        { name: "confirmPassword", placeholder: "Confirm Password", icon: <FaLock />, type: "password" }
                    ].map(({ name, placeholder, icon, type = "text" }) => (
                        <div key={name} className="relative flex items-center border-b border-pink-300 py-2 mt-4">
                            <span className="text-pink-500 mr-2">{icon}</span>
                            <input
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                className={`w-full p-2 outline-none ${
                                    (name === "password" || name === "confirmPassword") && !isPasswordMatch && formData[name]
                                        ? "border-red-500"
                                        : ""
                                }`}
                                value={formData[name]}
                                onChange={handleChange}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                    {!isPasswordMatch && formData.confirmPassword && (
                        <p className="text-red-500 text-xs mt-2">Passwords do not match</p>
                    )}
                    <button 
                        className="w-full bg-pink-500 text-white p-2 rounded-lg mt-6 hover:bg-pink-600 disabled:bg-gray-400" 
                        disabled={Object.keys(errors).length > 0 || !isPasswordMatch}
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}