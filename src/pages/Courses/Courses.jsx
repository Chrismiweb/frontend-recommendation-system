import React, { useState } from 'react';
import recommendedCourses from '../Courses/CourseApi'; // adjust path if needed
import { Input, Space } from 'antd';
const { Search } = Input;

const RecommendedCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = recommendedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full px-[50px] pt-[50px]'>
      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[860px] rounded-[20px] overflow-hidden pb-[54px] flex flex-col gap-[20px] relative">
            <button
              className="absolute top-[35px] w-[40px] justify-center items-center flex h-[40px] right-[50px] text-[30px] border-white border-4 rounded-full cursor-pointer  font-bold text-white"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>
            <img src={selectedCourse.image} alt="course" className="w-full h-[400px] object-fill" />
           <div className='w-full px-[32px]'>
              <h2 className="text-[24px] font-bold">{selectedCourse.title}</h2>
              <div className='flex justify-between items-center'>
                <p className="text-[#4B5563] text-[18px]">{selectedCourse.institution}</p>
                <p className="text-[#4B5563] text-[18px]">{selectedCourse.duration}</p>
              </div>
              <p className="text-[16px] leading-[24px] text-[#374151] mt-[40px]">{selectedCourse.about}</p>
           </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className='flex flex-col gap-[10px]'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-[25px] font-bold'>Recommended Courses</p>
          </div>
           <Space direction="vertical">
            <Search placeholder="SEARCH COURSES" allowClear style={{ width: 800 }} className='placeholder:font-bold' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Space>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-[16px] py-[30px] justify-between items-center'>
          {/* {filteredCourses.map((r, index) => (
            <div key={index} className='w-[95%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
              <div className='w-full h-[300px]'>
                <img src={r.image} className='w-full h-full object-fill' alt="" />
              </div>
              <div className='px-[30px] gap-[20px] flex flex-col'>
                <div className='flex flex-col gap-[8px]'>
                  <p className='text-[20px] font-bold'>{r.title}</p>
                  <p className='text-[#4B5563] text-[15px]'>{r.institution}</p>
                </div>
                <div className='w-full justify-between flex items-center'>
                  <p className='text-[#4B5563]'>{r.duration}</p>
                  <p
                    onClick={() => setSelectedCourse(r)}
                    className='cursor-pointer text-[#2563EB] font-bold text-[18px]'
                  >
                    {r.view}
                  </p>
                </div>
              </div>
            </div>
          ))} */}
          {filteredCourses.length > 0 ? (
              filteredCourses.map((r, index) => (
                <div key={index} className='w-[95%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                  <div className='w-full h-[300px]'>
                    <img src={r.image} className='w-full h-full object-fill' alt="" />
                  </div>
                  <div className='px-[30px] gap-[20px] flex flex-col'>
                    <div className='flex flex-col gap-[8px]'>
                      <p className='text-[20px] font-bold'>{r.title}</p>
                      <p className='text-[#4B5563] text-[15px]'>{r.institution}</p>
                    </div>
                    <div className='w-full justify-between flex items-center'>
                      <p className='text-[#4B5563]'>{r.duration}</p>
                      <p
                        onClick={() => setSelectedCourse(r)}
                        className='cursor-pointer text-[#2563EB] font-bold text-[18px]'
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
  );
};

export default RecommendedCourses;
