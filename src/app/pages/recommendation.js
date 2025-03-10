// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [subjects, setSubjects] = useState({});
//     const [recommendations, setRecommendations] = useState("");

//     const handleChange = (e) => {
//         setSubjects({ ...subjects, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("https://your-app-name.onrender.com/recommend", { subjects });
//             setRecommendations(response.data.recommendations);
//         } catch (error) {
//             console.error("Error fetching recommendations:", error);
//         }
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//             <h2>Course Recommendation System</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>English Language:</label>
//                 <input type="text" name="English" onChange={handleChange} required />
//                 <br />
//                 <label>Mathematics:</label>
//                 <input type="text" name="Mathematics" onChange={handleChange} required />
//                 <br />
//                 <label>Physics:</label>
//                 <input type="text" name="Physics" onChange={handleChange} />
//                 <br />
//                 <label>Biology:</label>
//                 <input type="text" name="Biology" onChange={handleChange} />
//                 <br />
//                 <button type="submit">Get Recommendations</button>
//             </form>
//             <h3>Recommended Courses:</h3>
//             <p>{recommendations}</p>
//         </div>
//     );
// }

// export default App;
