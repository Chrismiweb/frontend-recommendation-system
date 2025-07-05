import React from 'react'
import Sidebar from '../../components/Sidebar'
import Recommendation from './Recommendation'

function RecommendationPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='w-[95%] ml-auto'>
            <Recommendation/>
        </main>
    </div>
  )
}

export default RecommendationPage
