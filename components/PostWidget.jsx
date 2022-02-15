import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPost, getSimilarPost } from '../services'

const PostWidget = ({category, slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(()=>{
    if(slug){
      getSimilarPost(category, slug).then((result)=>setRelatedPosts(result))
    }else{
      getRecentPost().then((result)=>setRelatedPosts(result))
    }
  })

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug?'Related Posts':'Recent Posts'}
      </h3>
      {relatedPosts.map((post)=>(
        <div className='flex items-center w-full mb-4' key={post.title}>
          <div className="w-16 flex-none">
            <img src={post.featuredImage.url} alt={post.title} height="60px" width="60px"/>
          </div>
          <div className="flex-grow ml-4 ">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link className='text-md' key={post.title} href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget