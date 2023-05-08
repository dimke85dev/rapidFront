import React, { Fragment, useEffect } from 'react';
import { getUsers } from '../store/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';

const Users = () => {
  const { isLoading, users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(typeRepairClear());
    dispatch(getUsers());
  }, [dispatch]);

  if (!users) return <Loader></Loader>;

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="w-1/2 mx-auto bg-white px-5 py-2 rounded-xl mobile-form">
      <h3>Користувачі</h3>
      {users.length &&
        users.map((el) => (
          <div
            className="w-4/5 mx-auto border-solid border-2 border-gray-600 rounded-xl mb-2"
            key={el._id}
          >
            {el.username}
          </div>
        ))}
    </div>
  );
};

export default Users;
