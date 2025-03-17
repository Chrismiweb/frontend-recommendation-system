import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from 'axios';


const Home = () => {
  const [subjects, setSubjects] = useState(["", "", "", "", ""]);
  const [grades, setGrades] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [sampleFile, setSampleFile] = useState(null)
  const {user} = useContext(AuthContext)



  // handle user auth
  useEffect(() => {  
   if(user){
    console.log("loggedIn as: " + user.userName)
   }

  }, [user])
  

  // Check if cooldown is active on page load
  useEffect(() => {
    const storedCooldown = localStorage.getItem("rateLimitCooldown");
    if (storedCooldown && Date.now() < storedCooldown) {
      setCooldown(true);
      setError("You've reached the maximum request limit. Please try again later.");
    } else {
      localStorage.removeItem("rateLimitCooldown");
    }
  }, []);

  // Handle subject input
  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  // Handle grade input
  const handleGradeChange = (index, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = value;
    setGrades(updatedGrades);
  };

  const handleFileChange = (e)=>{
    setSampleFile(e.target.files[0])
  }
  // Fetch recommendations
  const fetchRecommendations = async () => {
    if (cooldown) {
      setError("You've exceeded your daily limit. Please try again later.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");



    const formData = new FormData()
    formData.append("subjects", JSON.stringify(subjects))
    formData.append("grades", JSON.stringify(grades))
    if(sampleFile){
      formData.append("sampleFile", sampleFile)
    }

    try {
      // const response = await fetch("http://localhost:1050/recommendation", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   // body: formData,
      //   body: JSON.stringify({subjects, grades})
      // });

      const response = await axios.post("http://localhost:1050/recommendation", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      if (response.status === 429) {
        setError("You've exceeded your daily limit. Try again after 24 hours.");
        setCooldown(true);

        // Save cooldown to localStorage (prevents further requests)
        localStorage.setItem("rateLimitCooldown", Date.now() + 24 * 60 * 60 * 1000);
        return;
      }

      // if (!response.ok) {
      //   // const data = await response.json();
      //   // throw new Error(data.error || "Failed to fetch recommendations.");
      // }

      // const data = await response.json();
      setResult(response.data.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


 
  return (
    <div className="flex flex-col w-[100%] items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Welcome {user.userName}</h1>


      <h1 className="text-3xl font-bold mb-6">Course Recommendation System 🎓</h1>

      <div className="bg-white w-[40%] p-6 rounded-lg shadow-md">
        <div className="flex w-[100%] justify-center items-center space-x-4">
          {/* Subjects Inputs */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">Subjects</h2>
            {subjects.map((subject, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Subject ${index + 1}`}
                value={subject}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
                className="border p-2 mb-2 rounded-md"
              />
            ))}
          </div>

          {/* Grades Inputs */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">Grades</h2>
            {grades.map((grade, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Grade ${index + 1}`}
                value={grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                className="border p-2 mb-2 rounded-md"
              />
            ))}
          </div>
        </div>

        <div>
          <input type="file"  
          onChange={handleFileChange}
          name="sampleFile"
          className="bg-red-500"
          />
        </div>

        <button
          className={`px-4 py-2 rounded-md mt-4 w-full ${
            cooldown ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={fetchRecommendations}
          disabled={loading || cooldown}
        >
          {loading ? "Finding Courses..." : "Find Universities"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="bg-gray-200 p-4 mt-4 rounded-md w-full">
            <h2 className="font-bold">Recommended Courses:</h2>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
