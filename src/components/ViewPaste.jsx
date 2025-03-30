import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste: ", paste)

  return (
    <div>
        <div>
            <input 
                className='p-2 px-4 rounded-xl min-w-[100%] mt-5 bg-[#f8f5f5] border border-blue-100 text-blue-950'
                type='text'
                placeholder='Enter title here'
                value={paste.title}
                disabled
                onChange={(e) => setTitle(e.target.value)}
            />  

            {/* <button onClick={createPaste}>
                {
                    pasteId ? "Update My Paste" : "Create My Paste"
                }
            </button>           */}
        </div>
        <div className='mt-4'>
            <textarea 
                className='rounded-xl mt-4 min-w-[500px] p-4 bg-[#f8f5f5] text-blue-950'
                value={paste.content}
                placeholder='enter content here'
                onChange={(e) => setValue(e.target.value)}
                rows={20}
                disabled
            >
            </textarea> 
        </div>
    </div>
  )
}

export default ViewPaste
