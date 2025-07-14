import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { universities } from '../University/UniversitiesApi';
const { Search } = Input;

const ExploreUniversities = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUniversities = universities.filter((university) =>
    university.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  return (
    <div className='w-full px-[50px] pt-[50px]'>
      {/* Modal */}
      {selectedUniversity && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[860px] rounded-[20px] overflow-hidden pb-[54px] flex flex-col gap-[20px] relative">
            <button
              className="absolute top-[35px] w-[40px] justify-center items-center flex h-[40px] right-[50px] text-[30px] border-black border-4 rounded-full cursor-pointer font-bold text-black"
              onClick={() => setSelectedUniversity(null)}
            >
              ×
            </button>
            <img src={selectedUniversity.image} alt="university" className="w-full h-[400px] object-fill" />
            <div className='w-full px-[32px]'>
              <h2 className="text-[24px] font-bold">{selectedUniversity.institution}</h2>
              <p className="text-[#4B5563] text-[18px] mt-[20px]">{selectedUniversity.address}</p>
              <p className="text-[#4B5563] text-[18px] mb-[30px] mt-[20px]">{selectedUniversity.about}</p>
              <a className='mt-[20px] text-[19px] text-blue-500 font-bold' href={selectedUniversity.website}>Visit School Website</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className='flex flex-col gap-[10px]'>
        <div className='flex justify-between items-center'>
          <p className='text-[25px] font-bold'>Explore Universities</p>
          <Space direction="vertical">
            <Search
              placeholder="Search Universities"
              allowClear
              style={{ width: 800 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Space>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-[16px] py-[30px] justify-between items-center'>
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((u, index) => (
              <div key={index} className='w-[98%] rounded-[20px] overflow-hidden pb-[25px] shadow-lg gap-[15px] flex flex-col'>
                <div className='w-full h-[300px]'>
                  <img src={u.image} className='w-full h-full object-fill' alt={u.institution} />
                </div>
                <div className='px-[30px] gap-[20px] flex flex-col'>
                  <div className='flex flex-col gap-[8px]'>
                    <p className='text-[20px] font-bold'>{u.institution}</p>
                    <div className='flex items-center gap-[10px]'>
                        <p className='text-[#4B5563] text-[20px]'>{u.icons}</p>
                        <p className='text-[#4B5563] text-[15px]'>{u.address}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedUniversity(u)} className=' w-[100%] border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-[10px] text-[20px] py-[10px] border-2 cursor-pointer'>{u.button}</button>
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