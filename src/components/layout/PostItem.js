import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';

const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        Статті відсутні
      </div>
    );
  }
  return (
    <div className="flex flex-col basis-1/4 flex-grow">
      <div className={post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
        {post.imgUrl && (
          <img
            src={`https://rapid-back.vercel.app/${post.imgUrl}`}
            // src={`http://localhost:5000/${post.imgUrl}`}
            alt="img"
            className="object-cover w-full"
          />
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="text-xs opacity-50">{post.username}</div>
        <div className="text-xs text-black opacity-50">
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </div>
      </div>
      <div className="text-xl">{post.title}</div>
      <p className="opacity-60 text-xs pt-4">{post.text}</p>
      <div className="flex gap-3 items-center">
        <button className="flex items-center justify-center gap-2 text-xs opacity-50">
          <AiFillEye />
          <span>{post.views || 0}</span>
        </button>
        <button className="flex items-center justify-center gap-2 text-xs opacity-50">
          <AiOutlineMessage />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
