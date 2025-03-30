import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { format, isToday, parseISO } from 'date-fns';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPaste, setSelectedPaste] = useState(null);

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(isoDate) {
    const date = parseISO(isoDate);
    if (isToday(date)) {
      return `Today, ${format(date, 'hh:mm a')}`;
    } else {
      return `${format(date, 'MMM d, yyyy, hh:mm a')}`;
    }
  }

  function handleSetSearchTerm(e){
    setSearchTerm(e.target.value);
  }

  function handleShare(paste) {
    setSelectedPaste(paste);
    
    // Try Web Share API first
    if (navigator.share) {
      const shareData = {
        title: paste.title,
        text: paste.content,
        url: `${window.location.origin}/pastes/${paste._id}`
      };
      
      navigator.share(shareData)
        .then(() => toast.success('Shared successfully'))
        .catch((error) => {
          if (error.name !== 'AbortError') {
            // Fall back to custom modal if Web Share fails
            setShowShareModal(true);
          }
        });
    } else {
      // Show custom modal if Web Share not available
      setShowShareModal(true);
    }
  }


  



  
  


  return (
    <div> 
      <input 
        className='p-2 px-4 rounded-xl w-[100%] min-w-[600px] mt-5 bg-[#f8f5f5] border border-blue-100 text-blue-950'
        type="search"
        placeholder='Search here...'
        value={searchTerm}
        onChange={(e) => {handleSetSearchTerm(e)}} 
      />

      <div
        className='flex flex-col gap-5 mt-5 min-w-[600px]'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) =>{
              return(
                <div className='flex flex-col gap-2 border rounded-md hover:scale-105 transition-all duration-200 bg-[#f8f5f5]' key={paste?._id}>

                  <div className='flex flex-row place-content-between place-items-center  px-3 pt-1'>
                    <div className='font-medium text-lg text-gray-700'>
                      {paste.title}
                    </div>

                    <div className='font-thin text-xs align-text-bottom text-gray-700'>
                      {formatDate(paste.createdAt)}
                    </div>
                  </div>

                  <div className='flex px-3 font-thin pb-2 text-gray-700'>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-3 place-content-start px-3 pb-2'>

                    {/* Edit Icon */}
                    <button className='hover:scale-125 transition-all duration-200 bg-slate-200 p-1 rounded'>
                      <a className='font-thin text-xs w-3 ' href={`/?pasteId=${paste?._id}`}>
                        <svg color='black' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <title>Edit</title>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        
                      </a>
                    </button>

                    {/* View Icon */}
                    <button className='hover:scale-125 transition-all duration-200 bg-slate-200 p-1 rounded'>
                      <a href={`/pastes/${paste?._id}`}>
                        <svg color='black' xmlns="http://www.w3.org/2000/svg" width="18" height="18"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <title>View</title>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>  
                      </a>
                    </button>

                    {/* Delete Icon */}
                    <button className='hover:scale-125 transition-all duration-200 bg-slate-200 p-1 rounded' onClick={() => handleDelete(paste?._id)}>
                      <svg color="black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <title>Delete</title>
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>

                    {/* Copy Icon */}
                    <button className='hover:scale-125 transition-all duration-200 bg-slate-200 p-1 rounded' onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to Clipboard")
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"  viewBox="0 0 24 24" fill="none" color='black' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <title>Copy</title>
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>

                    {/* Share Icon */}
                    <button
                    onClick={() => handleShare(paste)}
                    className='hover:scale-125 transition-all duration-200 bg-slate-200 p-1 rounded'>
                      <svg color='black' xmlns="http://www.w3.org/2000/svg" width="18" height="18"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <title>Share</title>
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    </button>

                  </div>


                  
                </div>
              )
            }
          )
        }


      

      </div>



      {showShareModal && selectedPaste && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Share "{selectedPaste.title}"</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Link:</label>
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/pastes/${selectedPaste._id}`}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/pastes/${selectedPaste._id}`);
                  toast.success('Link copied to clipboard');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}







    </div>
  )
}

export default Paste
