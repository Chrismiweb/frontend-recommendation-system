import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const BASE_URL = "https://recommendation-system-7a8m.onrender.com/"; // Replace with your actual backend URL

export function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case "email":
                if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Valid email is required";
                } else {
                    delete newErrors.email;
                }
                break;
            case "password":
                if (!value.trim()) {
                    newErrors.password = "Password is required";
                } else {
                    delete newErrors.password;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        // Final validation
        if (!formData.email || !formData.password) {
            setErrors({ general: "Please fill in all fields" });
            setIsSubmitting(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrors({ email: "Valid email is required" });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login Successful!");
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setErrors({ general: data.message || "Login failed" });
            }
        } catch (error) {
            setErrors({ general: "Error connecting to the server" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-pink-100 p-4 overflow-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-pink-500 text-2xl font-bold text-center">Login</h2>
                {errors.general && <p className="text-red-500 text-center mt-2">{errors.general}</p>}
                
                <form className="mt-4" onSubmit={handleLogin}>
                    {[
                        { name: "email", placeholder: "Email", icon: <FaEnvelope />, type: "email" },
                        { name: "password", placeholder: "Password", icon: <FaLock />, type: "password" }
                    ].map(({ name, placeholder, icon, type }) => (
                        <div key={name} className="relative flex items-center border-b border-pink-300 py-2 mt-4">
                            <span className="text-pink-500 mr-2">{icon}</span>
                            <input
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                className={`w-full p-2 outline-none ${errors[name] ? "border-red-500" : ""}`}
                                value={formData[name]}
                                onChange={handleChange}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        className="w-full bg-pink-500 text-white p-2 rounded-lg mt-6 hover:bg-pink-600 disabled:bg-gray-400"
                        disabled={Object.keys(errors).length > 0 || isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Don't have an account? <Link to="/signup" className="text-pink-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}