import React, {useEffect, useState, useRef} from 'react'
import { submitComment } from '../services'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(()=>{
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  },[])

  const handleCommentSubmission = ()=>{
    setError(false)
    const {value: comment} = commentEl.current;
    const {value: email} = emailEl.current;
    const {value: name} = nameEl.current;
    const {checked: storeData} = storeDataEl.current;
    if(!comment || !name || !email){
      setError(true);
      return;
    }
    const commentObj = {
      name, email, slug, comment
    };
    if(storeData){
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    }else{
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj).then((res)=>{
      setShowSuccessMessage(true);
      setTimeout(()=>{
        setShowSuccessMessage(false)
      }, 3000)
    });

  }

  return (
    <div className="bg-white  shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="px-4 py-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameEl}
          name="name"
          placeholder="name"
          type="text"
          className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"/>
        <input
          ref={emailEl}
          name="email"
          placeholder="Email"
          type="email"
          className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"/>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData"/>
          <label className="ml-2 text-gray-500 cursor-pointer" htmlFor="storeData">Save my e-mail and name for the next time.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required.</p>}
      <div className="mt-8">
        <button
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          type="button"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment Submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm