import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  addUserAdminPanel,
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
import Modal from '../components/UI/Modal';

const Users = () => {
  const { isLoading, users } = useSelector((state) => state.auth);
  const [focusLogin, setfocusLogin] = useState(false);
  const [focusPass, setfocusPass] = useState(false);
  const [focusRole, setfocusRole] = useState(false);
  const inputLoginRef = useRef(null);
  const inputPassRef = useRef(null);
  const selectRoleRef = useRef(null);
  const [isEdit, setIsEdit] = useState('');
  const [addName, setAddName] = useState('');
  const [addPass, setAddPass] = useState('');
  const [addRole, setAddRole] = useState('');
  const [isAddUserForm, setisAddUserForm] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (focusLogin) {
      inputLoginRef.current.focus();
    }
    if (focusPass) {
      inputPassRef.current.focus();
    }
    if (focusRole) {
      selectRoleRef.current.focus();
    }
  }, [focusLogin, focusPass, focusRole]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const EditHandler = (e) => {
    e.preventDefault();
    const roleInput = document.querySelectorAll(
      `[data-id="role${
        e.target.dataset.id
          ? e.target.dataset.id
          : e.target.parentNode.parentNode.dataset.id
      }"]`
    )[0].value;
    const nameInput = document.querySelectorAll(
      `[data-id="name${
        e.target.dataset.id
          ? e.target.dataset.id
          : e.target.parentNode.parentNode.dataset.id
      }"]`
    )[0].value;
    if (
      roleInput.toUpperCase() === 'ADMIN' &&
      nameInput.toUpperCase() === 'ADMIN'
    ) {
      toast('Не можливо редагувати користувача ADMIN');
      return;
    }
    setIsEdit(
      e.target.dataset.id
        ? e.target.dataset.id
        : e.target.parentNode.parentNode.dataset.id // на svg элементе не всегда срабатывает data атрибут и если он не срабатывает, то берем его из родительского элемента
    );
  };

  const addUserHandler = (e) => {
    setisAddUserForm(!isAddUserForm);
    setfocusLogin(true);
  };

  const addFormUserHandler = (e) => {
    dispatch(
      addUserAdminPanel({
        username: addName,
        password: addPass,
        formRole: addRole,
      })
    );
    setisAddUserForm(!isAddUserForm);
  };

  const backHandler = () => {
    setisAddUserForm(!isAddUserForm);
    setfocusLogin(false);
    setfocusPass(false);
  };

  const cancelHandler = (e) => {
    if (e.key === 'Escape') {
      e.target.value = e.target.defaultValue;
      setIsEdit(!isEdit);
    }
  };

  const saveHandler = (e) => {
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
  };

  const deleteHandler = (e) => {
    const id = {};
    id.id = e.target.dataset.id
      ? e.target.dataset.id
      : e.target.parentNode.parentNode.dataset.id;

    dispatch(removeUser(id));
    setIsEdit(!isEdit);
  };

  const toUppercaseValue = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const EnterFocusLogin = (e) => {
    if (e.key === 'Enter') {
      setfocusPass(true);
      setfocusLogin(false);
      // setfocusPass(false);
    }
  };

  const EnterFocusPass = (e) => {
    if (e.key === 'Enter') {
      setfocusRole(true);
      setfocusLogin(false);
      setfocusPass(false);
      // setfocusPass(false);
    }
  };

  const togleFocus = (e) => {
    setfocusPass(false);
    setfocusLogin(false);
    setfocusRole(false);
  };

  if (!users) return <Loader></Loader>;
  return isLoading ? (
    <Loader></Loader>
  ) : !isAddUserForm ? (
    <div className="w-1/2 mx-auto bg-white px-5 py-2 rounded-xl mobile-form">
      <h3>Користувачі</h3>
      <div className="flex  justify-between">
        <label className="w-2/5">Login</label>

        <label className="w-2/5">Доступ</label>
        <label className="w-1/5"></label>
      </div>
      {users.length &&
        users.map((el) => (
          <form
            data-form-type={el._id}
            onKeyDown={cancelHandler}
            key={el._id}
            className="flex gap-2"
          >
            <input
              type="text"
              defaultValue={el.username}
              id={`name${el._id}`}
              data-id={`name${el._id}`}
              className="w-2/5 mx-auto border-solid border-2 border-gray-600 rounded-xl mb-2 p-1"
              disabled={true}
            />

            <input
              type="text"
              defaultValue={el.roles}
              onChange={toUppercaseValue}
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
      <button
        type="button"
        className="p-1 border-solid border-2 border-gray-600 rounded-xl"
        onClick={addUserHandler}
      >
        Додати
      </button>
    </div>
  ) : (
    <form
      onSubmit={addFormUserHandler}
      className="flex flex-col p-3 mobile-form w-2/3 h-full mx-auto gap-3  bg-gray-300"
    >
      <input
        ref={inputLoginRef}
        onFocus={togleFocus}
        onChange={(e) => setAddName(e.target.value)}
        onKeyDown={EnterFocusLogin}
        className="p-2"
        placeholder="Введіть логін"
      ></input>
      <label></label>
      <input
        ref={inputPassRef}
        onChange={(e) => setAddPass(e.target.value)}
        onKeyDown={EnterFocusPass}
        className="p-2"
        placeholder="Введіть пароль"
      ></input>
      <select
        ref={selectRoleRef}
        onChange={(e) => setAddRole(e.target.value)}
        className="p-2"
        placeholder="Введіть тип користувача пароль"
      >
        <option>USER</option>
        <option>ADMIN</option>
        <option>MASTER</option>
      </select>
      <div className="flex  gap-5 mx-auto">
        <button
          onClick={addFormUserHandler}
          className="mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl p-2"
          type="button"
        >
          Зберегти
        </button>
        <button
          className="mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl p-2"
          type="button"
          onClick={backHandler}
        >
          Відміна
        </button>
      </div>
    </form>
  );
};

export default Users;
