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
// import useBlocker from 'react-router-prompt';

// import Modal from './components/UI/Modal';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  });

  return (
    <Layout>
      <h1>Rapid Servise</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/posts" element={<PostsPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path="newPost" element={<AddPostPage />} />
        <Route path="editPost" element={<EditPostPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/about" element={<AboutPages />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/takeAcar" element={<TakeACar />} />

        <Route path="/directory" element={<Directory />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}
//напиши мне функцию фильтрации списка в select
export default App;
