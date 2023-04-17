import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../store/features/auth/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  ///// Сохраняем состояние скроллинга и в компоненте меняем класс у элемента
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ///////
  /// Сохраняем состояние открытого меню мобильной версии
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobilMenuHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  //////

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    isMobileMenuOpen && setIsMobileMenuOpen(!isMobileMenuOpen);
    window.localStorage.removeItem('token');
    toast('Ви вийшли із системи', {
      position: 'bottom-right',
    });
  };
  //напиши фунцию изменения класса у элемента в компоненте реакт при скроле
  return (
    <header>
      <div className={`container mx-auto ${styles.header}`}>
        <img
          onClick={mobilMenuHandler}
          className={
            `${isScrolled ? styles['logo-scroll'] : ''} ` + styles.logo
          }
          alt="car service"
          src="check-engine.svg"
        ></img>

        <button onClick={mobilMenuHandler} className={styles['menu-btn']}>
          <span className={styles[isMobileMenuOpen ? 'black' : 'white']}></span>
          <span className={styles[isMobileMenuOpen ? 'black' : 'white']}></span>
          <span className={styles[isMobileMenuOpen ? 'black' : 'white']}></span>
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
                  to="/out"
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
