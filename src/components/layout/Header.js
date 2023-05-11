import { Link, NavLink } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

import styles from './Header.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsAuth,
  checkIsRole,
  logout,
} from '../../store/features/auth/authSlice';
import { carOut } from '../../store/features/car/carSlice';
import { toast } from 'react-toastify';
import MobileMenu from './MobileMenu';

const Header = () => {
  //получаеть ширину экрана и относительно ширины экрана используем то или иное меню

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ////////////////////////////////////

  /// Сохраняем состояние открытого меню мобильной версии

  //////
  const isAuth = useSelector(checkIsAuth);
  const isRole = useSelector(checkIsRole);
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Ви вийшли із системи', {
      position: 'bottom-right',
    });
  };

  const takeCarHandler = () => {
    dispatch(carOut());
  };

  return (
    <header>
      {width > 768 ? (
        <div className={`container mx-auto ${styles.header}`}>
          <img
            alt="car service"
            src="check-engine.svg"
            className={styles.logo}
          ></img>
          <nav className={`${styles.nav}`}>
            <ul className={styles['ul-main']}>
              {isRole !== 'MASTER' && (
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                  >
                    Головна
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <React.Fragment>
                  {isRole === 'ADMIN' && (
                    <li className={styles.directory}>
                      <NavLink data-type="directory">Довідники</NavLink>

                      <ul
                        //
                        className={styles['ul-dir-dropdown']}
                      >
                        <li>
                          <Link to="/users">Користувачі</Link>
                        </li>
                        <li>
                          <Link to="/cars">Автомобілі</Link>
                        </li>
                        <li>
                          <Link to="/mainrepair">Види Ремонту</Link>
                        </li>

                        <li>
                          <NavLink
                            to="/reports"
                            // className={({ isActive }) =>
                            //   isActive ? styles.active : ''
                            // }
                          >
                            Звіт
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  )}
                  {(isRole === 'MASTER' || isRole === 'ADMIN') && (
                    <li className={styles.service}>
                      <NavLink
                        data-type="service"
                        // className={({ isActive }) =>
                        //   !isActive ? styles.active : ''
                        // }
                      >
                        Сервіси
                      </NavLink>
                      <ul className={styles['ul-serv-dropdown']}>
                        <li>
                          <Link onClick={takeCarHandler} to="/takeacar">
                            Прийняти авто
                          </Link>
                        </li>

                        <li>
                          <Link to="/posts">Мої Статті</Link>
                        </li>

                        <li>
                          <Link to="/newPost">Створити статтю</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  {isRole === 'ADMIN' && (
                    <li>
                      <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                          isActive ? styles.active : ''
                        }
                      >
                        Параметри
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              )}

              <li>
                <Link to="/price">Прайс</Link>
              </li>
              {isRole !== 'MASTER' && (
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                  >
                    Про нас
                  </NavLink>
                </li>
              )}

              <li>
                {isAuth ? (
                  <NavLink
                    to="/out"
                    className={({ isActive }) =>
                      isActive && width < 768 ? styles.active : ''
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
                  >
                    Увійти
                  </NavLink>
                )}
              </li>
              <li className="">
                <FaUserTie className="mx-auto" />
                {user?.username}
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
