import React from 'react'

function Demo() {
  return (
    <div className='w-[100vw] h-screen flex'>
        <navbar>

        </navbar>
       <div className='w-[100vw] flex'>
            <div className='w-[60%] bg-red-300 h-screen'>

            </div>
            <div className='w-[40%] bg-fuchsia-400 h-screen'>
                <img src="\image\student.png" className='w-full h-full object-cover' alt="" />
            </div>
       </div>
    </div>
  )
}

export default Demo