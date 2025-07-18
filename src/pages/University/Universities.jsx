import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { universities } from '../University/UniversitiesApi';
import { RiCloseCircleLine } from "react-icons/ri";
import Sidebar from '../../components/Sidebar';
import { HiOutlineMenuAlt3 } from "react-icons/hi"




const { Search } = Input;

const ExploreUniversities = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false)
      
      
  //   handle display sidebar
    const handleDisplaySidebar = () => {
        setShowSidebar(true); // open sidebar
    };
  
    const handleCloseSidebar = () => {
        setShowSidebar(false); // close sidebar
    };

  const filteredUniversities = universities.filter((university) =>
    university.institution.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className='w-full pt-[50px] lg:px-[50px]'>
      {/* Modal */}
      {selectedUniversity && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[90%] lg:w-[50%] rounded-[20px] overflow-hidden pb-[54px] flex flex-col gap-[20px] relative">
            <button
              className="absolute top-[35px] justify-center items-center flex right-[30px] lg:right-[50px] md:text-[6vw] lg:text-[2.5vw] text-[10vw] cursor-pointer  font-bold text-white"
              onClick={() => setSelectedUniversity(null)}
            >
              <RiCloseCircleLine />
            </button>
            <img src={selectedUniversity.image} alt="university" className="w-full h-[30vh] lg:h-[40vh] object-fill" />
            <div className='px-[15px] md:px-[30px] gap-[10px] flex flex-col'>
              <h2 className="md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-bold">{selectedUniversity.institution}</h2>
              <p className="text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]">{selectedUniversity.address}</p>
              <p className="md:text-[2.3vw] lg:text-[0.9vw] text-[4vw] leading-[24px] text-[#374151] mt-[20px] lg:mt-[2vh] mb-[30px] lg:mb-[2vh]">{selectedUniversity.about}</p>
              <a className='md:text-[2.3vw] lg:text-[0.9vw] text-[4vw] leading-[24px] text-blue-600 font-bold' href={selectedUniversity.website}>Visit School Website</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className='flex flex-col gap-[10px]'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-[20px] md:gap-0'>
          <div className='hidden lg:flex'>
            <p className='text-[25px] font-bold'>Explore Universities</p>
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-[16px] lg:gap-[0.7vw] py-[30px] justify-between items-center'>
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((u, index) => (
              <div key={index} className='w-[98%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                <div className='w-full h-[32vh]'>
                  <img src={u.image} className='w-full h-full object-fill' alt={u.institution} />
                </div>
                <div className='px-[30px] gap-[20px] flex flex-col'>
                  <div className='flex flex-col gap-[8px]'>
                    <p className='md:text-[2.5vw] lg:text-[1.1vw] text-[5.5vw] font-bold'>{u.institution}</p>
                    <div className='flex items-center gap-[10px]'>
                        <p className='text-[#4B5563] text-[20px]'>{u.icons}</p>
                        <p className='text-[#4B5563] md:text-[2.3vw] lg:text-[0.9vw] text-[4.5vw]'>{u.address}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedUniversity(u)} className='w-[100%] border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-[10px] md:text-[2.5vw] lg:text-[1.1vw] text-[4vw] py-[10px] border-2 cursor-pointer'>{u.button}</button>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full w-full text-center py-[50px]'>
              <p className='text-[#9CA3AF] text-[18px] font-semibold'>No universities found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
</div>

  );
};

export default ExploreUniversities;

// import React from 'react'

// function Universities() {
//   return (
//     <div>Universities</div>
//   )
// }

// export default Universities