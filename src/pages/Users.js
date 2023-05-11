import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  getUsers,
  removeUser,
  updateUser,
} from '../store/features/auth/authSlice';
import { MdEditNote } from 'react-icons/md';
import { RiSaveLine } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { toast } from 'react-toastify';

const Users = () => {
  const { isLoading, users } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState('');

  const dispatch = useDispatch();
  const cancelHandler = (e) => {
    if (e.key === 'Escape') {
      window.location.reload();
    }
  };

  const EditHandler = (e) => {
    e.preventDefault();
    setIsEdit(
      e.target.dataset.id
        ? e.target.dataset.id
        : e.target.parentNode.parentNode.dataset.id // на svg элементе не всегда срабатывает data атрибут и если он не срабатывает, то берем его из родительского элемента
    );
    // document.querySelectorAll(`${e.target.dataset.id}`);
  };
  const defaultHandler = (e) => {
    if (e.key === 'Escape') {
    }
  };

  const saveHandler = (e) => {
    // e.preventDefault();
    const id = e.target.dataset.id
      ? e.target.dataset.id
      : e.target.parentNode.parentNode.dataset.id;

    const user = {};
    const nameInput = document.querySelectorAll(
      `[data-id="name${
        e.target.dataset.id
          ? e.target.dataset.id
          : e.target.parentNode.parentNode.dataset.id
      }"]`
    )[0].value;
    const roleInput = document.querySelectorAll(
      `[data-id="role${
        e.target.dataset.id
          ? e.target.dataset.id
          : e.target.parentNode.parentNode.dataset.id
      }"]`
    )[0].value;

    if (!roleInput.replace(/\s/g, '') || !nameInput.replace(/\s/g, '')) {
      toast('Поля повинні бути заповнені');
      return;
    }
    console.log(roleInput);
    if (
      roleInput.toUpperCase() !== 'ADMIN' &&
      roleInput.toUpperCase() !== 'MASTER' &&
      roleInput.toUpperCase() !== 'USER'
    ) {
      toast('Введіть ADMIN або MASTER або USER');
      return;
    }

    user.username = nameInput;
    user.roles = roleInput.toUpperCase();
    user.id = id;

    dispatch(updateUser(user));

    setIsEdit(!isEdit);
    window.location.reload();
  };

  const deleteHandler = (e) => {
    const id = {};
    id.id = e.target.dataset.id
      ? e.target.dataset.id
      : e.target.parentNode.parentNode.dataset.id;

    dispatch(removeUser(id));
    setIsEdit(!isEdit);
    window.location.reload();
  };

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
          <form
            data-form-type={el._id}
            onKeyDown={cancelHandler}
            key={el._id}
            className="flex gap-2"
          >
            <input
              onKeyDown={defaultHandler}
              type="text"
              defaultValue={el.username}
              id={`name${el._id}`}
              data-id={`name${el._id}`}
              className="w-4/5 mx-auto border-solid border-2 border-gray-600 rounded-xl mb-2 p-1"
              disabled={isEdit === el._id ? false : true}
            />
            <input
              type="text"
              defaultValue={el.roles}
              data-id={`role${el._id}`}
              className="w-2/5 mx-auto border-solid border-2 border-gray-600 rounded-xl mb-2 p-1"
              disabled={isEdit === el._id ? false : true}
            ></input>
            {isEdit !== el._id && (
              <button
                onClick={EditHandler}
                data-id={el._id}
                className="w-1/6 flex text-xl justify-center items-center cursor-pointer border-solid border-2 border-gray-600 rounded-xl mb-2"
              >
                <MdEditNote data-id={el._id} />
              </button>
            )}
            {isEdit === el._id && (
              <Fragment>
                <div
                  type="submit"
                  data-id={el._id}
                  onClick={saveHandler}
                  className="w-1/6 flex text-xl justify-center items-center border-solid border-2 cursor-pointer border-gray-600 rounded-xl mb-2"
                >
                  <RiSaveLine data-id={el._id} />
                </div>
                <div
                  type="submit"
                  data-id={el._id}
                  onClick={deleteHandler}
                  className="w-1/6 flex text-xl  cursor-pointer justify-center items-center border-solid border-2 border-gray-600 rounded-xl mb-2"
                >
                  <AiFillDelete data-id={el._id} />
                </div>
              </Fragment>
            )}
          </form>
        ))}
    </div>
  );
};

export default Users;
