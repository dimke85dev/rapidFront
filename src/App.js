import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import TakeACar from './pages/TakeACar';
import Directory from './pages/Directory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getMe } from './store/features/auth/authSlice';
import AboutPages from './pages/AboutPages';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';
import AddCarRepair from './pages/AddCarRepair';
import AddCar from './components/addCar/AddCar';
import Posts from './pages/Directory';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <h1>Rapid Servise</h1>
      {/* <RouterProvider router={router} />; */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service" element={<MainPage />} />
        <Route path="/directory" element={<MainPage />} />

        <Route path="/posts" element={<PostsPage />} />
        <Route path="/out" element={<MainPage />} />
        <Route path="/:id" element={<PostPage />} />
        <Route path="/newPost" element={<AddPostPage />} />
        <Route path="/:id/editPost" element={<EditPostPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/about" element={<AboutPages />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/takeacar" element={<TakeACar />} />
        <Route path="/addcarrepair" element={<AddCarRepair />} />
        <Route path="/addcar" element={<AddCar />} />

        {/* <Route path="/directory" element={<Directory />} /> */}

        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}
//напиши мне функцию фильтрации списка в select
export default App;
