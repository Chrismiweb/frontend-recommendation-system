import React from 'react'
import Sidebar from '../../components/Sidebar'
import Recommendation from './Recommendation'

function RecommendationPage() {
  return (
    <div className='flex'>
        <div className='hidden lg:flex'>
          <Sidebar />
        </div>
        <main className='w-full px-[30px] lg:px-0 lg:w-[95%] ml-auto'>
            <Recommendation/>
        </main>
    </div>
  )
}

export default RecommendationPage
