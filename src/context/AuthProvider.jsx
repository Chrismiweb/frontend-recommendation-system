import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast for better messages

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error(" Error parsing localStorage user:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
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

      setUser(data.user);
      toast.success("✅ Login Successful!");
      return { success: true };
    } catch (error) {
      toast.error(` ${error.message}`);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch("https://recommendation-system-7a8m.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Sending confirmPassword too
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || " Signup failed");
      }

      setUser(data.user);
      toast.success("✅ Signup Successful!");
      return { success: true };
    } catch (error) {
      toast.error(` ${error.message}`);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("🔔 Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
