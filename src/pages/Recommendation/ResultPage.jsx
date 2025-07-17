import React from 'react'
import Sidebar from '../../components/Sidebar'
import Result from './Result'

function ResultPage() {
  return (
    <div className='flex'>
      <div className='hidden lg:flex'>
        <Sidebar />
      </div>
      <main className='w-full px-[20px] lg:px-0 lg:w-[95%] ml-auto'>
          <Result/>
      </main>
    </div>
  )
}

export default ResultPage