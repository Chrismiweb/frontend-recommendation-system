import React, { useState } from 'react';
import recommendedCourses from '../Courses/CourseApi'; // adjust path if needed
import { Input, Space } from 'antd';
const { Search } = Input;
import { RiCloseCircleLine } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import Sidebar from '../../components/Sidebar';


const RecommendedCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false)
    
    
//   handle display sidebar
  const handleDisplaySidebar = () => {
      setShowSidebar(true); // open sidebar
  };

  const handleCloseSidebar = () => {
      setShowSidebar(false); // close sidebar
  };

  const filteredCourses = recommendedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div>
    <div className='flex lg:hidden justify-between items-center pt-[30px]'> 
        <div>
            <p className='md:text-[3.2vw] lg:text-[1.5vw] text-[5vw] w-[100%] font-bold'>Recommended Courses</p>
        </div>
        <div className='flex lg:hidden w-[30%]  justify-end'>
            <div>
                {!showSidebar && (
                    <button onClick={handleDisplaySidebar} className='text-[9vw] md:text-[6vw]'>
                    <HiOutlineMenuAlt3 />
                    </button>
                )}
            </div>
            {/* Mobile sidebar */}
              {showSidebar && (
                  <Sidebar onClose={handleCloseSidebar} />
              )}
        </div>
    </div>
    <div className='w-full lg:px-[50px] pt-[50px]'>
      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[90%] lg:w-[50%] rounded-[20px] overflow-hidden pb-[54px] flex flex-col gap-[20px] relative">
            <button
              className="absolute top-[35px] justify-center items-center flex right-[30px] lg:right-[50px] md:text-[6vw] lg:text-[2.5vw] text-[10vw] cursor-pointer  font-bold text-white"
              onClick={() => setSelectedCourse(null)}
            >
              <RiCloseCircleLine />
            </button>
            <img src={selectedCourse.image} alt="course" className="w-full h-[30vh]  lg:h-[400px] object-fill" />
           <div className='px-[15px] md:px-[30px] gap-[10px] flex flex-col'>
              <h2 className="md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-bold">{selectedCourse.title}</h2>
              <div className='flex justify-between items-center'>
                <p className="text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]">{selectedCourse.institution}</p>
                <p className="text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]">{selectedCourse.duration}</p>
              </div>
              <p className="md:text-[2.3vw] lg:text-[0.9vw] text-[4vw] leading-[24px] text-[#374151] mt-[20px] lg:mt-[40px]">{selectedCourse.about}</p>
           </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className='flex flex-col gap-[10px]'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-[20px] md:gap-0'>

           {/* <Space direction="vertical">
            <Search placeholder="SEARCH COURSES" allowClear style={{ width: 800 }} className='placeholder:font-bold' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Space> */}
          <div className='hidden lg:flex'>
            <p className='md:text-[3.2vw] lg:text-[1.5vw] text-[5vw] font-bold'>Recommended Courses</p>
          </div>
          <Space direction="vertical">
              <Search
                placeholder="SEARCH COURSES"
                allowClear
                className="placeholder:font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                      width: window.innerWidth >= 1024
                        ? '800px' // lg
                        : window.innerWidth >= 768
                        ? '90vw' // md
                        : '90vw'  // sm
                    }}
              />
          </Space>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-[16px] py-[30px] justify-between items-center'>
          {filteredCourses.length > 0 ? (
              filteredCourses.map((r, index) => (
                <div key={index} className='w-full lg:w-[95%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                  <div className='w-full h-[300px]'>
                    <img src={r.image} className='w-full h-full object-fill' alt="" />
                  </div>
                  <div className='px-[15px] md:px-[30px] gap-[20px] flex flex-col'>
                    <div className='flex flex-col gap-[8px]'>
                      <p className='md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-bold'>{r.title}</p>
                      <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{r.institution}</p>
                    </div>
                    <div className='w-full justify-between flex items-center'>
                      <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{r.duration}</p>
                      <p
                        onClick={() => setSelectedCourse(r)}
                        className='cursor-pointer text-[#2563EB] font-bold md:text-[2.3vw] lg:text-[0.9vw] text-[4.2vw]'
                      >
                        {r.view}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-full w-full text-center py-[50px]'>
                <p className='text-[#9CA3AF] text-[18px] font-semibold'>No courses available for your search.</p>
              </div>
            )}
        </div>
      </div>
    </div>
</div>
  
  );
};

export default RecommendedCourses;
