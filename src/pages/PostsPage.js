import { useDispatch } from 'react-redux';
import PostItem from '../components/layout/PostItem';
import axios from '../utils/axios';
import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../components/UI/Loader';
import { postClear } from '../store/features/post/postSlice';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();

  const fetchMyPosts = async () => {
    try {
      const data1 = await axios.get('/posts/user/me');
      const { data, status } = await axios.get('/posts/user/me');
      setPosts(data);
      setStatus(status === 200 ? true : false);
      // console.log(statusText);
      console.log(data1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (!posts?.length) {
    return (
      <Fragment>
        {!status ? (
          <Loader />
        ) : (
          <div className="text-xl text-center text-red-500 py-10">
            Статті відсутні
          </div>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      {!status ? (
        <Loader />
      ) : (
        <div className="w-1/2 bg-slate-200 px-2 mobile-form mx-auto py-10 flex flex-col gap-10 ">
          {posts.map((post, index) => {
            return post && <PostItem post={post} key={index} />;
          })}
        </div>
      )}
    </Fragment>
  );
};

export default PostsPage;
