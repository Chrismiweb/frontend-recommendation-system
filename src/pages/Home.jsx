import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login after logout
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl text-black font-bold">Helllo 😅</h1>
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
      >
        Logout
      </button>
      {/* <div className="flex">
        <div>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
        </div>
        <div>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
            <input type="text" className="bg-black"/>
        </div>
      </div>
      <button className="text-red">submit</button> */}
    </div>
  );
};

export default Home;
