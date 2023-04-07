import { NavLink, Link, useNavigate } from 'react-router-dom';
import usePrompt from 'react-router-prompt';

import styles from './Header.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../store/features/auth/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // usePrompt('Вы уверены, что хотите уйти?', true);
  const logoutHandler = () => {
    dispatch(logout());

    window.localStorage.removeItem('token');
    toast('Ви вийшли із системи', {
      position: 'bottom-right',
    });
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img alt="car service" src="check-engine.svg"></img>
      </NavLink>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Головна
            </NavLink>
          </li>
          {isAuth && (
            <React.Fragment>
              <li>
                <NavLink
                  to="/takeacar"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Прийняти авто
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/directory"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Довідник
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Звіт
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Параметри
                </NavLink>
              </li>
            </React.Fragment>
          )}

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Про нас
            </NavLink>
          </li>
          <li>
            {isAuth ? (
              <button onClick={logoutHandler}>Вийти</button>
            ) : (
              <NavLink
                to={'/login'}
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={''}
              >
                Увійти
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
