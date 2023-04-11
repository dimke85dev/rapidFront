import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../store/features/auth/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobilMenuHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // usePrompt('Вы уверены, что хотите уйти?', true);

  const logoutHandler = () => {
    dispatch(logout());
    isMobileMenuOpen && setIsMobileMenuOpen(!isMobileMenuOpen);
    window.localStorage.removeItem('token');
    toast('Ви вийшли із системи', {
      position: 'bottom-right',
    });
  };

  return (
    <header>
      <div className={`container mx-auto ${styles.header}`}>
        <NavLink className={styles.logo} to="/" onClick={mobilMenuHandler}>
          <img alt="car service" src="check-engine.svg"></img>
        </NavLink>
        <button onClick={mobilMenuHandler} className={styles['menu-btn']}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          className={`${styles.nav} ${
            isMobileMenuOpen ? styles.mobileMenu : ''
          }`}
        >
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={isMobileMenuOpen && mobilMenuHandler}
              >
                Головна
              </NavLink>
            </li>
            {isAuth && (
              <React.Fragment>
                <li>
                  <NavLink
                    to="/takeacar"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Прийняти авто
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/directory"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Довідник
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Звіт
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
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
                onClick={isMobileMenuOpen && mobilMenuHandler}
              >
                Про нас
              </NavLink>
            </li>
            <li>
              {isAuth ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  onClick={logoutHandler}
                >
                  Вийти
                </NavLink>
              ) : (
                <NavLink
                  to={'/login'}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  onClick={isMobileMenuOpen && mobilMenuHandler}
                >
                  Увійти
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
