import React from 'react'
import Sidebar from '../../components/Sidebar'
import Result from './Result'

function ResultPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='w-[95%] ml-auto'>
            <Result/>
        </main>
    </div>
  )
}

export default ResultPage