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
  // const [subjects, setSubjects] = useState([""]); // array of subject strings
  const [subjects, setSubjects] = useState([{ id: Date.now(), subject: "" }]);
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
      const response = await axios.post("https://recommendation-system-7a8m.onrender.com/recommendation", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      if (response.status === 429) {
        setError("You've exceeded your daily limit. Try again after 24 hours.");
        setCooldown(true);

        // Save cooldown to localStorage (prevents further requests)
        localStorage.setItem("rateLimitCooldown", Date.now() + 24 * 60 * 60 * 1000);
        return;
      }

     
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
                      <pre className="whitespace-pre-wrap">{result.replaceAll("*", "")}</pre>
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




// // new recommendaton code 


// // ✅ Career Recommendation Form with Questionnaire + O'Level Input
// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { MdOutlineUploadFile, MdDeleteOutline } from "react-icons/md";
// import { CiCirclePlus } from "react-icons/ci";
// import { GiAchievement } from "react-icons/gi";

// const categories = {
//   "Health & Medicine": [
//     { key: "helpPeopleStayHealthy", label: "Would you like to help people stay healthy or recover from illness?" },
//     { key: "enjoyLearningAboutBody", label: "Do you enjoy learning about the human body or diseases?" }
//   ],
//   "Engineering & Technology": [
//     { key: "fixMachines", label: "Do you enjoy fixing or building machines?" },
//     { key: "interestedInHowThingsWork", label: "Are you interested in how things work?" }
//   ],
//   "Computer & IT": [
//     { key: "likeComputersOrCoding", label: "Do you enjoy working with computers or coding?" },
//     { key: "buildAppsOrCybersecurity", label: "Are you interested in building apps, video games, or cybersecurity?" }
//   ],
//   "Business & Marketing": [
//     { key: "likePlanningOrSelling", label: "Do you enjoy planning or selling things?" },
//     { key: "interestedInMoney", label: "Are you interested in money management or entrepreneurship?" },
//     { key: "wantToManageBusiness", label: "Would you like to manage a team or a business?" }
//   ],
//   "Arts & Media": [
//     { key: "loveCreatingArt", label: "Do you love creating music, art, or videos?" },
//     { key: "interestedInActingFashion", label: "Are you interested in acting, drawing, or fashion?" }
//   ],
//   "Education & Social Services": [
//     { key: "likeHelpingOrTeaching", label: "Do you like helping or teaching others?" },
//     { key: "workInSchoolOrNGO", label: "Would you enjoy working in schools, NGOs, or communities?" }
//   ],
//   "Law & Politics": [
//     { key: "interestedInJustice", label: "Are you interested in rules, justice, or global affairs?" },
//     { key: "likeDebating", label: "Do you like debating or solving social issues?" },
//     { key: "wantToBeLawyer", label: "Do you see yourself as a lawyer one day?" }
//   ],
//   "Agriculture & Environment": [
//     { key: "curiousAboutNature", label: "Are you curious about nature, plants, or animals?" },
//     { key: "enjoyOutdoorResearch", label: "Do you enjoy being outdoors or doing research on the environment?" }
//   ],
//   "Hospitality & Tourism": [
//     { key: "enjoyHelpingOrOrganizing", label: "Do you enjoy helping others or organizing events?" },
//     { key: "wantToWorkInHotelOrTravel", label: "Would you like to work in hotels, airlines, or travel?" }
//   ],
//   "General Interests": [
//     { key: "loveComputers", label: "Do you love using computers or technology?" },
//     { key: "enjoyDesigning", label: "I enjoy drawing, designing, or creating things." },
//     { key: "likeScienceExperiments", label: "Do you like doing science experiments or analyzing data?" },
//     { key: "interestedInBusinessLeadership", label: "I’m interested in business, leadership, or managing projects." },
//     { key: "loveBlood", label: "Do you love seeing blood?" },
//     { key: "enjoyWriting", label: "Do you enjoy writing stories, poems, or articles?" },
//     { key: "loveArguments", label: "Do you love arguments?" },
//     { key: "loveSports", label: "Do you love sport-related stuff?" },
//     { key: "loveMakingContent", label: "Do you love making content?" }
//   ]
// };

// const Home = () => {
//   const { user } = useContext(AuthContext);

//   const [subjects, setSubjects] = useState([{ id: Date.now(), subject: "" }]);
//   const [grades, setGrades] = useState([""]);
//   const [region, setRegion] = useState("");
//   const [result, setResult] = useState("");
//   const [sampleFile, setSampleFile] = useState(null);
//   const [fileImagePreview, setFileImagePreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [cooldown, setCooldown] = useState(false);
//   const [questionnaire, setQuestionnaire] = useState(() => {
//     const q = {};
//     for (let group in categories) {
//       q[group] = {};
//       categories[group].forEach(qs => q[group][qs.key] = "");
//     }
//     return q;
//   });

//   useEffect(() => {
//     const storedCooldown = localStorage.getItem("rateLimitCooldown");
//     if (storedCooldown && Date.now() < storedCooldown) {
//       setCooldown(true);
//       setError("You've reached the maximum request limit. Please try again later.");
//     } else {
//       localStorage.removeItem("rateLimitCooldown");
//     }
//   }, []);

//   const handleQuestionnaireChange = (group, key, value) => {
//     setQuestionnaire(prev => ({
//       ...prev,
//       [group]: { ...prev[group], [key]: value }
//     }));
//   };

//   const fetchRecommendations = async () => {
//     if (cooldown) return toast.error("You're on cooldown. Try again later.");
//     if (!subjects || !grades || !region) return toast.error("Fill subjects, grades, and region.");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("subjects", JSON.stringify(subjects));
//     formData.append("grades", JSON.stringify(grades));
//     formData.append("region", region);
//     formData.append("questionnaire", JSON.stringify(questionnaire));
//     if (sampleFile) formData.append("sampleFile", sampleFile);

//     try {
//       const res = await axios.post("http://localhost:1050/recommendation", formData);
//       setResult(res.data.recommendations);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-4">Career Recommendation System</h1>

//       {subjects.map((subj, index) => (
//         <div key={subj.id} className="flex gap-4 mb-2">
//           <select
//             value={subj.subject}
//             onChange={(e) => {
//               const updated = [...subjects];
//               updated[index].subject = e.target.value;
//               setSubjects(updated);
//             }}
//             className="border p-2 rounded w-1/2"
//           >
//             <option value="">Select Subject</option>
//             <option>English Language</option>
//             <option>Mathematics</option>
//             <option>Biology</option>
//             <option>Physics</option>
//             <option>Chemistry</option>
//             <option>COMMERCE</option>
//             <option>FINANCIAL ACCOUNTING</option>
//             <option>GEOGRAPHY</option>
//             <option>Economics</option>
//             <option>CIVIC EDUCATION</option>
//             <option>FURTHER MATHEMATICS</option>
//             <option>AGRICULTURAL SCIENCE</option>
//             <option>FURTHER MATHEMATICS</option>
//             <option>CHRISTIAN RELIGIOUS STUDIES</option>
//             <option>LITERATURE IN ENGLISH</option>
//             <option>ISLAMIC STUDIES</option>
//             <option>Government</option>




//           </select>
//           <select
//             value={grades[index] || ""}
//             onChange={(e) => {
//               const g = [...grades];
//               g[index] = e.target.value;
//               setGrades(g);
//             }}
//             className="border p-2 rounded w-1/2"
//           >
//             <option value="">Select Grade</option>
//             <option>A1</option><option>B2</option><option>B3</option>
//             <option>C4</option><option>C5</option><option>C6</option>
//             <option>D7</option><option>E8</option><option>F9</option>
//           </select>
//           {subjects.length > 1 && <MdDeleteOutline onClick={() => setSubjects(subjects.filter(s => s.id !== subj.id))} className="cursor-pointer text-red-500" />}
//         </div>
//       ))}

//       <button onClick={() => setSubjects([...subjects, { id: Date.now(), subject: "" }])} className="mb-4 flex items-center gap-2 text-blue-600">
//         <CiCirclePlus /> Add Subject
//       </button>

//       <select value={region} onChange={(e) => setRegion(e.target.value)} className="mb-4 p-2 border rounded w-full">
//         <option value="">Select Region</option>
//         <option>North Central</option>
//         <option>North East</option>
//         <option>North West</option>
//         <option>South East</option>
//         <option>South South</option>
//         <option>South West</option>
//         <option>All Region</option>

//       </select>

//       <input type="file" onChange={(e) => setSampleFile(e.target.files[0])} className="mb-4" />

//       <div className="space-y-6">
//         {Object.entries(categories).map(([group, questions]) => (
//           <div key={group}>
//             <h3 className="text-lg font-semibold mb-2">{group}</h3>
//             {questions.map(({ key, label }) => (
//               <div key={key} className="mb-2">
//                 <label className="block mb-1">{label}</label>
//                 <select
//                   value={questionnaire[group][key]}
//                   onChange={(e) => handleQuestionnaireChange(group, key, e.target.value)}
//                   className="p-2 border rounded w-full"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                   <option value="little">A Little</option>
//                 </select>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={fetchRecommendations}
//         disabled={loading}
//         className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
//       >
//         {loading ? "Loading..." : "Get Recommendations"}
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {result && (
//         <div className="bg-gray-100 p-4 mt-6 rounded">
//           <h2 className="text-lg font-bold mb-2">Recommended Courses:</h2>
//           <pre className="whitespace-pre-wrap">{result.replaceAll("*", "")}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

