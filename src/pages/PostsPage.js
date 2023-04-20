import PostItem from '../components/layout/PostItem';
import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);
  if (!posts.length) {
    return (
      <div className="text-xl text-center text-black py-10">
        Статті відсутні
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-slate-200 px-2 mobile-form mx-auto py-10 flex flex-col gap-10 ">
      {posts.map((post, index) => {
        return post && <PostItem post={post} key={index} />;
      })}
    </div>
  );
};

export default PostsPage;
