import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from 'axios';
import { GiAchievement } from "react-icons/gi";
import { CiCirclePlus } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { Button } from "antd";
import { TbWorld } from "react-icons/tb";
import { MdOutlineUploadFile } from "react-icons/md";

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






      <div className="bg-pink-100 gap-[30px] flex justify-center items-center flex-col w-[100%]">
        <div className="w-[100%] flex flex-col justify-center items-center">
          <h1 className="text-pink-500 font-bold text-[50px]">Enter Your Results</h1>
          <p className="text-pink-700 text-[20px]">Record Your Academic Achievement</p>
        </div>
        <div className="w-[60%] rounded-2xl  drop-shadow-xl bg-white">
          <div className="w-[100%] h-[8px] rounded-t-2xl bg-pink-500"></div>
          <div className="flex w-[100%] flex-col gap-[30px] p-[30px]">
              <div className="flex w-[100%]  justify-between">
                  <div className="flex gap-[15px] justify-center items-center">
                    <GiAchievement className="text-pink-500 text-[22px]"/>
                    <p className="text-black text-[22px] font-bold">Your Subjects</p>
                  </div>
                  <div className="flex gap-[30px]">
                      <div className="flex gap-[5px] bg-white cursor-pointer shadow-md rounded-2xl p-[15px] font-semibold justify-center items-center">
                        <TbWorld className="text-pink-500 text-[22px]"/>
                        <p>Add Regions</p>
                      </div>
                      <div className="flex gap-[5px] bg-white cursor-pointer shadow-md rounded-2xl p-[15px] font-semibold justify-center items-center">
                        <CiCirclePlus className="text-pink-500 text-[22px]"/>
                        <p>Add Subject</p>
                      </div>
                  </div>
              </div>
              <div className="w-[100%] flex flex-col drop-shadow-xl gap-[20px] p-[20px]">
                  <div className="w-[100%] justify-center items-center gap-[30px] flex">
                    <select className="inset-shadow-2xs bg-gray-100 w-[40%] cursor-pointer rounded-2xl p-[15px] " name="" id="">
                      <option className="text-[15px] font-semibold" value="">Select Subject</option>
                      <option className="text-[15px]" value="">English Language</option>
                      <option className="text-[15px]" value="">English Language</option>
                      <option className="text-[15px]" value="">English Language</option>
                      <option className="text-[15px]" value="">English Language</option>
                      <option className="text-[15px]" value="">English Language</option>
                      <option className="text-[15px]" value="">English Language</option>
                      <option className="text-[15px]" value="">English Language</option>
                    </select>
                    <select className="inset-shadow-2xs bg-gray-100 w-[40%] cursor-pointer rounded-2xl p-[15px] " name="" id="">
                      <option className="text-[15px] font-semibold" value="">Select Grade</option>
                      <option className="text-[15px]" value="">A1</option>
                      <option className="text-[15px]" value="">B2</option>
                      <option className="text-[15px]" value="">B3</option>
                      <option className="text-[15px]" value="">C4</option>
                      <option className="text-[15px]" value="">C5</option>
                      <option className="text-[15px]" value="">C6</option>
                      <option className="text-[15px]" value="">D7</option>
                      <option className="text-[15px]" value="">E8</option>
                      <option className="text-[15px]" value="">F9</option>
                    </select>
                    <div>
                        <MdDeleteOutline className="text-red-500 text-[20px] font-bold cursor-pointer"/>
                    </div>
                  </div>
              </div>
              <div className="w-[100%] flex flex-col justify-center items-center">
                  <p className="text-[20px] font-bold mb-[30px]">OR</p>
                  <div className="w-full  max-w-md mx-auto">
                      <label
                        htmlFor="fileUpload"
                        className="flex gap-[10px] items-center justify-center w-full py-[10px] border border-dashed border-gray-400 rounded-md cursor-pointer bg-white hover:border-pink-500 transition duration-200"
                      >
                        <MdOutlineUploadFile className="text-[20px]"/>
                        <span className="text-gray-500">Choose File</span>
                      </label>
                      <input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                      />
                  </div>
                  
              </div>
              <Button color="pink" variant="solid" className="bg-pink-500 w-[100%] items-center flex justify-center gap-[12px] p-[10px] rounded-2xl">
                <FaFileAlt className="text-white font-bold"/>
                <p className="text-white font-bold ">Submit Results</p>
              </Button>
              
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
