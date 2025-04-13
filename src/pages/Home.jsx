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
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [subjects, setSubjects] = useState([""]); // array of subject strings
  const [grades, setGrades] = useState([""]);     
  const [region, setRegion] = useState("");
  const [result, setResult] = useState("");
  const [fileImagePreview, setFileImagePreview] = useState("");

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

  // handle subject change
  const handleSubjectChange = (index, value) => {
    const updated = [...subjects];
    updated[index].subject = value;
    setSubjects(updated);
  };
  
 
  const handleGradeChange = (index, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = value;
    setGrades(updatedGrades);
  };

 
  

  // Fetch recommendations
  const fetchRecommendations = async () => {
   

    if (cooldown) {
      setError("You've exceeded your daily limit. Please try again later.");
      return;
    }
    
    setError("");
    setResult("");
    if(!subjects || !grades || !region){
     return toast.error("Please input subjects, grades and region")
    }

    setLoading(true);


    const formData = new FormData()
    formData.append("subjects", JSON.stringify(subjects))
    formData.append("grades", JSON.stringify(grades))
    formData.append("region", JSON.stringify(region));
    if(sampleFile){
      formData.append("sampleFile", sampleFile)
    }

    try {
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
      setLoading(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { id: Date.now() }]);
  };

  const handleRemoveSubject = (id) => {
    // Prevent removing the first/default one if needed
    if (subjects.length === 1) return;
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  // file upload
  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    setSampleFile(file)
    setFileImagePreview(URL.createObjectURL(file))

  }
  
 
  return (
    <div className="flex flex-col w-[100%] items-center  min-h-screen bg-pink-100">
      <ToastContainer/>
     

      <div className=" gap-[30px] flex justify-center pb-[50px] items-center flex-col w-[100%]">
        <div className="justify-between px-[10px] md:px-[40px] py-[20px] w-[100%] items-center flex bg-pink-200">
          <p className='text-pink-600 w-[40%] md:w-[55%] font-semibold text-[14px] md:text-[22px] lg:text-[18px] font-serif'>Career Recommendation System 🎓</p>
          <p className="text-[14px] md:text-[22px] lg:text-[18px]  text-pink-600 font-semibold font-serif">Welcome {user?.userName || "Guest"}</p>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <h1 className="text-pink-500 text-center font-bold text-[30px] md:text-[50px]">Enter Your Results</h1>
          <p className="text-pink-700 text-[20px]">Record Your Academic Achievement</p>
        </div>
        <div className="w-[95%] md:w-[80%]  lg:w-[60%] rounded-2xl  drop-shadow-xl bg-white">
          <div className="w-[100%] h-[8px] rounded-t-2xl bg-pink-500"></div>
          <div className="flex w-[100%] flex-col gap-[30px] p-[10px] md:p-[30px]">
              <div className="flex w-[100%]  justify-between">
                  <div className="flex gap-[15px] justify-center items-center">
                    <GiAchievement className="text-pink-500 text-[22px]"/>
                    <p className="text-black text-[15px] md:text-[22px] font-bold">Your Subjects</p>
                  </div>
                  <div className="flex gap-[30px]">
                      {/* <div className="flex gap-[5px] bg-white cursor-pointer shadow-md rounded-2xl p-[15px] font-semibold justify-center items-center">
                        <TbWorld className="text-pink-500 text-[22px]"/>
                        <p>Add Regions</p>
                      </div> */}
                      <button 
                      onClick={handleAddSubject}
                      className="flex gap-[5px] bg-white cursor-pointer shadow-md rounded-2xl p-[15px] font-semibold justify-center items-center">
                        <CiCirclePlus className="text-pink-500 text-[22px]"/>
                        <p className="hover:text-pink-500 ">Add Subject</p>
                      </button>
                  </div>
              </div>
             

              {/* Region section */}
              {/* {region.map((region, index) => ( */}
                  <div className="w-full flex flex-col drop-shadow-xl px-[20px]">
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="inset-shadow-2xs bg-gray-100 w-[60%] md:w-[40%] cursor-pointer rounded-2xl p-[15px]"
                    >
                      <option value="" className="text-[15px] font-semibold">Select Region</option>
                      <option value="North Central">North Central</option>
                      <option value="North East">North East</option>
                      <option value="North West">North West</option>
                      <option value="South East">South East</option>
                      <option value="South South">South South</option>
                      <option value="South West">South West</option>
                      <option value="All Regions">All Regions</option>
                    </select>
                  </div>
                {/* ))} */}


           

            {/* Subject and Grade section */}
            <div className="w-full flex flex-col gap-[20px] md:gap-[20px]">
                  {subjects.map((subject, index) => (
                <div key={subject.id} className="w-full flex justify-center items-center gap-[10px] md:gap-[30px]">
                      {/* Subject Select */}
                      <div className="w-[45%] md:w-[40%]">
                        <select
                          value={subject.subject || ""}
                          onChange={(e) => handleSubjectChange(index, e.target.value)}
                          className="inset-shadow-2xs bg-gray-100 drop-shadow-lg  w-full cursor-pointer rounded-2xl p-[15px]"
                        >
                          <option value="" className="text-[15px] font-semibold">Select Subject</option>
                          <option value="English Language">English Language</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Biology">Biology</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Economics">Economics</option>
                          <option value="Geography">Geography</option>
                        </select>
                      </div>

                      {/* Grade Select */}
                      <div className="w-[45%] md:w-[40%]">
                        <select
                          // value={subject.grade || ""}
                          value={grades[index]}
                          onChange={(e) => handleGradeChange(index, e.target.value)}
                          className="inset-shadow-2xs drop-shadow-lg bg-gray-100 w-full cursor-pointer rounded-2xl p-[15px]"
                        >
                          <option value="" className="text-[15px] font-semibold">Select Grade</option>
                          <option value="A1">A1</option>
                          <option value="B2">B2</option>
                          <option value="B3">B3</option>
                          <option value="C4">C4</option>
                          <option value="C5">C5</option>
                          <option value="C6">C6</option>
                          <option value="D7">D7</option>
                          <option value="E8">E8</option>
                          <option value="F9">F9</option>
                        </select>
                      </div>

                      {/* Delete Button */}
                      <div onClick={() => handleRemoveSubject(subject.id)}>
                        <MdDeleteOutline className="text-red-500 text-[30px] md:text-[20px] font-bold cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>


              <div className="w-[100%] gap-[30px] flex flex-col justify-center items-center">
                  <p className="text-[20px] font-bold mb-[30px]">OR</p>
                  <div 
                    className="w-full  max-w-md mx-auto">
                      <label
                        htmlFor="fileUpload"
                        className="flex gap-[10px] items-center justify-center w-full py-[10px] border border-dashed border-gray-400 rounded-md cursor-pointer bg-white hover:border-pink-500 transition duration-200"
                      >
                        <MdOutlineUploadFile className="text-[20px]"/>
                        <span className="text-gray-500">Choose File</span>
                      </label>
                      <input
                        id="fileUpload"
                        onClick={handleFileChange}
                        type="file"
                        className="hidden"
                      />
                  </div>
                  {
                fileImagePreview && 
                  <div className="w-[30%] h-[200px]">
                    <img className="w-full h-full" src={fileImagePreview} alt="" />
                  </div>
              }
                  
              </div>
                <button
                    className={`px-4 py-2 rounded-md mt-4 w-full ${
                      cooldown ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 cursor-pointer hover:bg-pink-600 cursor- text-white"
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
              {/* <Button 
              color="pink" variant="solid" className="bg-pink-500 w-[100%] items-center flex justify-center gap-[12px] p-[10px] rounded-2xl">
                <FaFileAlt className="text-white font-bold"/>
                <p 
                onClick={fetchRecommendations}
                className="text-white font-bold ">Submit Results</p>
              </Button> */}
              
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;


