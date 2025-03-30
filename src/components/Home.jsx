import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);


    useEffect(() => {
        console.log("inside use effect");
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId);
            console.log("page found")
            setTitle(paste.title);
            setValue(paste.content);
        }

    }, [pasteId])

    

    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        //after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});

    }

  return (
    <div>
        <div className='flex flex-row place-content-between'>
            <input 
                className='bg-[#f8f5f5] place-content-evenly w-[66%] pl-4 p-2 px-4 rounded-xl mt-5 c border border-blue-100 text-blue-950'
                type='text'
                placeholder='Enter title here'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button 
            className='bg-blue-900 rounded-md mt-5 p-2 hover:bg-blue-800 transition-all duration-200'
            onClick={createPaste}>
                {
                    pasteId ? "Update My Paste" : "Create My Paste"
                }
            </button>
        </div>
        <div className='mt-5 relative'>
            <textarea 
                className='bg-[#f8f5f5] rounded-xl mt-4 min-w-[500px] p-4 text-blue-950'
                value={value}
                placeholder='Enter content here...'
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            >

            </textarea>
            <button className='absolute top-6 right-2 hover:scale-125 transition-all duration-200 bg-slate-200 p-1 rounded' onClick={() => {
                    navigator.clipboard.writeText(value)
                    toast.success("Copied to Clipboard")
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"  viewBox="0 0 24 24" fill="none" color='black' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Home
