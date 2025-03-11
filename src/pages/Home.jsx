// import React, { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";






// const Home = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();


//   const handleLogout = () => {
//     logout();
//     navigate("/"); // Redirect to login after logout
//   };

//   const [subjects, setSubjects] = useState("")
//   const [grades, setGrades] = useState("")
//   const [result, setResult] = useState("")

//   const fetchApi =async ()=> {
//     // e.preventDefault()
//     const baseurl = 'https://recommendation-system-7a8m.onrender.com/recommendation'

//     try {
//       const response = await fetch(baseurl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ subjects, grades }),
//       })
//       const data = await response.json()
//       if(response){
//           // throw new error(data.error || "failed to find university")
//           alert("good")
//           console.log(data.recommendation)
//           setResult(data.recommendation)

//       }
//     } catch (error) {
//       console.log(error)
//     }

//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-6xl text-black font-bold">Helllo 😅</h1>
//       <button
//         onClick={handleLogout}
//         className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
//       >
//         Logout
//       </button>
//       <div>
//         <div className="flex">
//           <div className="flex flex-col">
//             <input type="text" placeholder="subject/course" onChange={(e)=>setSubjects(e.target.value)} name= "subjects" />
//             <input type="text" placeholder="subject/course" onChange={(e)=>setSubjects(e.target.value)} name= "subjects"  />
//             <input type="text" placeholder="subject/course" onChange={(e)=>setSubjects(e.target.value)} name= "subjects"  />
//             <input type="text" placeholder="subject/course" onChange={(e)=>setSubjects(e.target.value)} name= "subjects"  />
//             <input type="text" placeholder="subject/course" onChange={(e)=>setSubjects(e.target.value)} name= "subjects"  />
//           </div>
//           <div className="flex flex-col">
//             <input type="text" placeholder="grades" onChange={(e)=>setGrades(e.target.value)} name= "grades" />
//             <input type="text" placeholder="gradese" onChange={(e)=>setGrades(e.target.value)} name= "grades"  />
//             <input type="text" placeholder="grades" onChange={(e)=>setGrades(e.target.value)} name= "grades"  />
//             <input type="text" placeholder="grades" onChange={(e)=>setGrades(e.target.value)} name= "grades"  />
//             <input type="text" placeholder="grades" onChange={(e)=>setGrades(e.target.value)} name= "grades"  />
//           </div>
//         </div>
//         <button className="bg-red-400" onClick={fetchApi}>FIND UNIVERSITIES</button>
//         {result && 
//         <div className="bg-slate-300 h-[200px] w-[200px]">
//         </div>
//         }
//       </div>
      
   
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";

const Home = () => {
  const [subjects, setSubjects] = useState(["", "", "", "", ""]);
  const [grades, setGrades] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Fetch recommendations
  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    setResult("");

    // Check if all inputs are filled or throw error
    if (subjects.some(subj => subj.trim() === "") || grades.some(grade => grade.trim() === "")) {
      setError("Please fill in all subjects and grades.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:1050/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects, grades }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch recommendations.");
      }

      setResult(data.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Course Recommendation System 🎓</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex space-x-4">
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

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-600"
          onClick={fetchRecommendations}
          disabled={loading}
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
