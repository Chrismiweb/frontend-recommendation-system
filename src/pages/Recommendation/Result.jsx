
// export default Home;

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GoPlus } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { GrCloudUpload } from "react-icons/gr";
// import { SMTPClient } from 'emailjs';
import { Spin } from 'antd';

const categories = {
  "Health & Medicine": [
    { key: "interestedInHealth", label: "Are you interested in helping people stay healthy or understanding how the human body works?" }
  ],
  "Engineering & Technology": [
    { key: "curiousAboutMachines", label: "Do you enjoy building or understanding how machines and systems work?" }
  ],
  "Computer & IT": [
    { key: "interestedInTech", label: "Do you enjoy working with computers, coding, or creating digital solutions?" }
  ],
  "Business & Marketing": [
    { key: "interestedInBusiness", label: "Are you interested in business, money management, or leading teams?" }
  ],
  "Arts & Media": [
    { key: "creativeArtsInterest", label: "Do you enjoy creative work like music, art, fashion, or media production?" }
  ],
  "Education & Social Services": [
    { key: "helpingOrTeaching", label: "Do you like helping or teaching others, or working in communities?" }
  ],
  "Law & Politics": [
    { key: "justiceOrDebate", label: "Are you interested in law, justice, politics, or debating social issues?" }
  ],
  "Agriculture & Environment": [
    { key: "natureAndEnvironment", label: "Do you enjoy being outdoors or studying nature, animals, or the environment?" }
  ],
  "Hospitality & Tourism": [
    { key: "organizeAndTravel", label: "Do you enjoy organizing events or would like to work in travel, hotels, or airlines?" }
  ],
  "General Interests": [
    { key: "generalCreativeOrAnalytical", label: "Do you enjoy writing, designing, analyzing data, or making content?" }
  ]
};



  const options = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'A Little', value: 'little' }
  ];

const Result = () => {
  const { user } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([{ id: Date.now(), subject: "" }]);
  const [grades, setGrades] = useState([""]);
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [sampleFile, setSampleFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false)
  const [questionnaire, setQuestionnaire] = useState(() => {
    const q = {};
    for (let group in categories) {
      q[group] = {};
      categories[group].forEach(qs => q[group][qs.key] = "");
    }
    return q;
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false); // Track if questionnaire is complete

 

  const handleQuestionnaireChange = (group, key, value) => {
      setQuestionnaire(prev => ({
        ...prev,
        [group]: { ...prev[group], [key]: value }
      }));
    };


  // Get all questions as a flat array
  const allQuestions = Object.entries(categories).flatMap(([group, questions]) => 
    questions.map(q => ({ group, ...q }))
  );

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuestionnaireComplete(true); // Questionnaire complete
    }
  };

const handlePrevQuestion = () => {
  if (isQuestionnaireComplete) {
    // User is on the final page (result upload), go back to last question
    setIsQuestionnaireComplete(false);
    setCurrentQuestionIndex(allQuestions.length - 1); // Go to last question
  } else if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};

  // Submit the recommendation request
  const fetchRecommendations = async () => {
    if (!subjects || !grades || !region) return toast.error("Fill subjects, grades, and region.");
    setLoading(true)

    const formData = new FormData();
    formData.append("subjects", JSON.stringify(subjects));
    formData.append("grades", JSON.stringify(grades));
    formData.append("region", JSON.stringify(region));
    formData.append("questionnaire", JSON.stringify(questionnaire));
    formData.append("email", JSON.stringify(email));

    if (sampleFile) formData.append("sampleFile", sampleFile);

    try {
      const res = await axios.post("https://recommendation-system-7a8m.onrender.com/recommendation", formData);
      setResult(res.data.recommendations);
    } catch (err) {
      toast.error(err.message);
    } finally{
      setLoading(false)

    }
  };
  
  const renderQuestion = () => {
      const currentQuestion = allQuestions[currentQuestionIndex];
      return (
        <div key={currentQuestion.key}>
          <label className="block mb-2 text-black mt-[60px] text-[24px]">{currentQuestion.label}</label>

          {/* Mapped checkboxes */}
          <div className="w-full h-[100px] gap-[16px] mt-[32px] flex flex-col">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex gap-[16px] py-[25px] px-[25px] bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-[10px]"
              >
                <input
                  type="checkbox"
                  id={`${option.value}-${currentQuestion.key}`}
                  checked={questionnaire[currentQuestion.group]?.[currentQuestion.key] === option.value} // Check if selected
                  onChange={() => handleQuestionnaireChange(currentQuestion.group, currentQuestion.key, option.value)}
                  className="cursor-pointer"
                />
                <label htmlFor={`${option.value}-${currentQuestion.key}`} className="text-[24px] cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    };

    
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSampleFile(file);
    if (file && file.type.startsWith("image/")) {
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setPreviewURL(null); // Clear preview if not an image
    }
  };

    // Calculate progress percentage
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  return (
    <div className="w-[100%] flex flex-col justify-center items-center pt-[96px]">
      <ToastContainer />
      <h1 className="text-[36px]">Discover Your Ideal Career Path</h1>
      <p className="text-[24px] text-[#4B5563]">Answer a few questions to get personalized career recommendations</p>


      <div className="w-[100%] flex flex-col justify-center items-center mt-[25px]">
          <div className="flex justify-between items-center w-[50%]">
              <p>Step 1 of 5</p>
              <p className="mt-2 text-lg text-[#4B5563">{Math.round(progress)}%</p>
          </div>
          <div className="w-[50%] bg-gray-300 h-2 rounded-full">
            <div
              className="bg-[#2563EB] h-full rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
      </div>
      

      {/* Questionnaire Page */}
      {!isQuestionnaireComplete ? (
        <div className="w-[50%]">
          <div>
            {renderQuestion()}
          </div>
          <div className="flex justify-between items-center mt-[300px]">
              <button onClick={handlePrevQuestion} className=" bg-[#2563EB] text-white text-[18px] px-[31px] py-2 rounded cursor-pointer">
              Back
            </button>
              <button onClick={handleNextQuestion} className=" bg-[#2563EB] text-white text-[18px] px-[31px] py-2 rounded cursor-pointer">
              Next {">"}
            </button>
          </div>
        </div>
      ) : (
        // After completing the questionnaire, show the subject/grade form
        <div className="w-[50%] flex flex-col justify-center items-center gap-[15px] mt-[24px]">
          {/* Subject and Grade Selection */}
          {subjects.map((subj, index) => (
            <div key={subj.id} className="flex gap-4 w-[95%] justify-between items-center ">
              <select
                value={subj.subject}
                onChange={(e) => {
                  const updated = [...subjects];
                  updated[index].subject = e.target.value;
                  setSubjects(updated);
                }}
                className="border-2 p-2 w-[80%] border-[#E5E7EB] rounded-[5px] text-[#9CA3AF]"
              >
                <option value="">Subject</option>
                <option>English Language</option>
                <option>Mathematics</option>
                <option>Biology</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>COMMERCE</option>
                <option>FINANCIAL ACCOUNTING</option>
                <option>GEOGRAPHY</option>
                <option>Economics</option>
                <option>CIVIC EDUCATION</option>
                <option>FURTHER MATHEMATICS</option>
                <option>AGRICULTURAL SCIENCE</option>
                <option>FURTHER MATHEMATICS</option>
                <option>CHRISTIAN RELIGIOUS STUDIES</option>
                <option>LITERATURE IN ENGLISH</option>
                <option>ISLAMIC STUDIES</option>
                <option>Government</option>
                <option>Accounting</option>

                {/* Add more subjects here */}
              </select>
              <select
                value={grades[index] || ""}
                onChange={(e) => {
                  const g = [...grades];
                  g[index] = e.target.value;
                  setGrades(g);
                }}
                className="border p-2 rounded w-[15%] border-[#E5E7EB] text-[#9CA3AF]"
              >
                <option value="">Grade</option>
                <option>A1</option><option>B2</option><option>B3</option>
                <option>C4</option><option>C5</option><option>C6</option>
                <option>D7</option><option>E8</option><option>F9</option>
              </select>
              {subjects.length > 1 && <MdOutlineClose onClick={() => setSubjects(subjects.filter(s => s.id !== subj.id))} className="cursor-pointer text-[25px] text-[#9CA3AF]" />}
                
            </div>
          ))}
          <div className="w-full">
              <button onClick={() => setSubjects([...subjects, { id: Date.now(), subject: "" }])} className="mb-4 flex items-center mt-[6px] cursor-pointer gap-2 text-[17px] font-semibold text-[#2563EB]">
                <GoPlus className="text-[17px] font-bold"/> Add Another Subject
              </button>
          </div>
          <p className="text-[250x] font-bold mt-[20px]">OR</p>
          <div className="relative mt-[20px] w-full">
              <input
                type="file"
                // onChange={(e) => setSampleFile(e.target.files[0])}
                onChange={handleFileChange}
                id="file-upload"
                className="hidden" // Hide the default input element
              />
              <label 
                htmlFor="file-upload"
                className="w-[100%] border-[#2563EB] flex justify-center items-center gap-[5px] text-[#2563EB] rounded-[10px] text-[16px] py-[10px] border-2 cursor-pointer"
              >
                <GrCloudUpload />
                <span>Upload Result</span>
              </label>
          </div>

          {/* image preview */}
             {previewURL && (
              <div className="mt-4">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full max-h-[300px] object-contain rounded-[10px] border border-gray-300"
                />
              </div>
            )}

          <div className="w-full mt-[30px]">
              <p className='text-[20px] font-bold'>Preferred Study Location</p>
              <p className='text-[#4B5563] text-[14px] font-semibold mt-[24px]'>Select the region where you'd like to study</p>
          </div>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="border-2 p-2 w-full py-[10px] border-[#E5E7EB] rounded-[5px] text-[#9CA3AF]">
            <option value="">Select a Region</option>
            <option>North Central</option>
            <option>North East</option>
            <option>North West</option>
            <option>South East</option>
            <option>South South</option>
            <option>South West</option>
            <option>All Region</option>
          </select>

          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />

          {/* Final recommendation button */}
         <div className="w-full justify-between items-center flex">
           <button onClick={handlePrevQuestion} className=" bg-[#2563EB] text-white text-[18px] px-[31px] py-2 rounded cursor-pointer">
              Back
            </button>
            <button 
                onClick={fetchRecommendations}
                disabled={loading}  // Disable the button when loading is true
                className={`mt-6 bg-[#2563EB] text-[18px] text-white px-[31px] py-2 rounded ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    {/* Replace button text with "Loading..." or show a spinner */}
                    <span>Providing recommendation ...</span>  {/* You can also use a spinner here */}
                  </div>
                ) : (
                  "View Recommendation"
                )}
              </button>
         </div>
        </div>
      )}

      {/* Display recommendations */}
      {result && (
        <div className="bg-gray-100 p-4 mt-6 rounded">
          <h2 className="text-lg font-bold mb-2">Recommended Courses:</h2>
          <pre className="whitespace-pre-wrap font-sans text-[20px]">{result.replaceAll("*", "")}</pre>
        </div>
      )}
      {/* email sending  */}
      
    </div>
  );
};

export default Result;
