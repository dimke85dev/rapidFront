import React, { useEffect } from 'react';
import PostItem from '../components/layout/PostItem';
import PopularPosts from '../components/layout/PopularPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../store/features/post/postSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts?.length) {
    return (
      <div className="text-xl text-center text-black py-10">
        Статті відсутні
      </div>
    );
  }

  return (
    <div className="max-w-[900px] bg-slate-200 mx-auto py-10 px-3">
      <div className="post-elem flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-black">Популярні:</div>
          {popularPosts?.map((post, index) => (
            <PopularPosts key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
