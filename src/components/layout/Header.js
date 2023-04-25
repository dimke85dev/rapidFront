import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../store/features/auth/authSlice';
import { carOut } from '../../store/features/car/carSlice';
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

  const carOutHandler = () => {
    dispatch(carOut());
    isMobileMenuOpen && mobilMenuHandler();
  };

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
          <ul className={styles['ul-main']}>
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
                <li className={styles.directory}>
                  <NavLink
                    to="/directory"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Довідники
                  </NavLink>
                  <ul className={styles['ul-dir-dropdown']}>
                    <li>
                      <Link>Користувачі</Link>
                    </li>
                    <li>
                      <Link>Автомобілі</Link>
                    </li>
                    <li>
                      <Link to="/mainrepair">Види Ремонту</Link>
                    </li>
                    <li>
                      <Link>Прайс</Link>
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
                  </ul>
                </li>
                <li className={styles.service}>
                  <NavLink
                    to="/service"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Сервіси
                  </NavLink>
                  <ul className={styles['ul-serv-dropdown']}>
                    <li>
                      <Link
                        to="/takeacar"
                        onClick={isMobileMenuOpen && mobilMenuHandler}
                      >
                        Прийняти авто
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/posts"
                        onClick={isMobileMenuOpen && mobilMenuHandler}
                      >
                        Мої Статті
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/newPost"
                        onClick={isMobileMenuOpen && mobilMenuHandler}
                      >
                        Створити статтю
                      </Link>
                    </li>
                  </ul>
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
