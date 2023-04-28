import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../store/features/auth/authSlice';
import { carOut } from '../../store/features/car/carSlice';
import { toast } from 'react-toastify';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  ///// Сохраняем состояние скроллинга и в компоненте меняем класс у элемента
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [directoryMenu, setDirectoryMenu] = useState(true);
  const [serviceMenu, setServiceMenu] = useState(true);

  /// Сохраняем состояние открытого меню мобильной версии
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobilMenuHandler = (e) => {
    // e.target.dataset.type === 'directory'
    //   ? setDirectoryMenu(!directoryMenu)
    //   : setIsMobileMenuOpen(!isMobileMenuOpen);
    // e.target.dataset.type === 'service'
    //   ? setServiceMenu(!serviceMenu)
    //   : setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const directoryHandler = (e) => {
    // setDirectoryMenu(!directoryMenu);
    // setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const serviceHandler = (e) => {
    // setServiceMenu(!serviceMenu);
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
      {width > 768 ? (
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
            <span
              className={styles[isMobileMenuOpen ? 'black' : 'white']}
            ></span>
            <span
              className={styles[isMobileMenuOpen ? 'black' : 'white']}
            ></span>
            <span
              className={styles[isMobileMenuOpen ? 'black' : 'white']}
            ></span>
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
                      data-type="directory"
                      className={({ isActive }) =>
                        !isActive ? styles.active : ''
                      }
                      onClick={isMobileMenuOpen && directoryHandler}
                    >
                      Довідники
                    </NavLink>
                    {directoryMenu && (
                      <ul
                        //
                        className={styles['ul-dir-dropdown']}
                      >
                        <li>
                          <Link onClick={directoryHandler}>Користувачі</Link>
                        </li>
                        <li>
                          <Link onClick={directoryHandler}>Автомобілі</Link>
                        </li>
                        <li>
                          <Link to="/mainrepair" onClick={directoryHandler}>
                            Види Ремонту
                          </Link>
                        </li>
                        <li>
                          <Link onClick={directoryHandler}>Прайс</Link>
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
                    )}
                  </li>
                  <li className={styles.service}>
                    <NavLink
                      data-type="service"
                      className={({ isActive }) =>
                        !isActive ? styles.active : ''
                      }
                      onClick={isMobileMenuOpen && serviceHandler}
                    >
                      Сервіси
                    </NavLink>
                    {serviceMenu && (
                      <ul className={styles['ul-serv-dropdown']}>
                        <li>
                          <Link to="/takeacar" onClick={serviceHandler}>
                            Прийняти авто
                          </Link>
                        </li>

                        <li>
                          <Link to="/posts" onClick={serviceHandler}>
                            Мої Статті
                          </Link>
                        </li>

                        <li>
                          <Link to="/newPost" onClick={serviceHandler}>
                            Створити статтю
                          </Link>
                        </li>
                      </ul>
                    )}
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
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={logoutHandler}
                  >
                    Вийти
                  </NavLink>
                ) : (
                  <NavLink
                    to={'/login'}
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Увійти
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>{' '}
        </div>
      ) : (
        <MobileMenu />
      )}
    </header>
  );
};

export default Header;
