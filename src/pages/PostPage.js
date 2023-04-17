import React, { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import axios from '../utils/axios';
import { Link, useParams } from 'react-router-dom';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams(); //берет params из строки браузера
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data.post);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // console.log(post);

  if (!post) {
    return (
      <div className="text-xl text-center text-black py-10">
        Статті відсутні
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto bg-slate-200 px-3 py-2">
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-md py-2 px-4">
        <Link to={'/'}>Назад</Link>
      </button>

      <div className="post-elem flex gap-10  py-4  ">
        <div className="">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
              }
            >
              {post.imgUrl && (
                <img
                  src="/uploads/default.jpg"
                  // src={`https://rapid-back.vercel.app/${post.imgUrl}`}
                  // src={`http://localhost:5000/${post.imgUrl}`}
                  // src={`http://192.168.0.105:5000/${post.imgUrl}`}
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
        </div>
        <div className="w-1/3">COMMENTS</div>
      </div>
    </div>
  );
};

export default PostPage;
