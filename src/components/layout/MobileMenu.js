import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../store/features/auth/authSlice';
import { carOut } from '../../store/features/car/carSlice';
import { toast } from 'react-toastify';
const MobileMenu = () => {
  ///// Сохраняем состояние скроллинга и в компоненте меняем класс у элемента
  const [isScrolled, setIsScrolled] = useState(false);
  const [directoryMenu, setDirectoryMenu] = useState(false);
  const [serviceMenu, setServiceMenu] = useState(false);
  const [mainMenu, setmainMenu] = useState(false);

  /// Сохраняем состояние открытого меню мобильной версии
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const mobilMenuHandler = (e) => {
    setmainMenu(true);
    setDirectoryMenu(false);
    setServiceMenu(false);
    e.target.dataset.type === 'directory'
      ? setDirectoryMenu(!directoryMenu)
      : setIsMobileMenuOpen(!isMobileMenuOpen);
    e.target.dataset.type === 'service'
      ? setServiceMenu(!serviceMenu)
      : setIsMobileMenuOpen(!isMobileMenuOpen);
    // e.target.dataset.type === 'directory' && setDirectoryMenu(!directoryMenu);
    // e.target.dataset.type === 'service' && setServiceMenu(!serviceMenu);
  };

  const directoryHandler = (e) => {
    setDirectoryMenu(!directoryMenu);
    setmainMenu(!mainMenu);
    // setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const serviceHandler = (e) => {
    setServiceMenu(!serviceMenu);
    setmainMenu(!mainMenu);
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

  const directory = directoryMenu ? '' : 'hidden';
  const service = serviceMenu ? '' : 'hidden';
  //   const mainMenu = directoryMenu || serviceMenu ? 'hidden' : '';
  return (
    <div className={`container  mx-auto ${styles.header}`}>
      <img
        onClick={mobilMenuHandler}
        className={`${isScrolled ? styles['logo-scroll'] : ''} ` + styles.logo}
        alt="car service"
        src="check-engine.svg"
      ></img>
      <div>
        <button onClick={mobilMenuHandler} className={styles['menu-btn']}>
          <span className={styles[isMobileMenuOpen ? 'black' : 'white']}></span>
          <span className={styles[isMobileMenuOpen ? 'black' : 'white']}></span>
          <span className={styles[isMobileMenuOpen ? 'black' : 'white']}></span>
        </button>
        <nav
          className={`${styles.nav}  ${
            isMobileMenuOpen ? styles.mobileMenu : ''
          }`}
        >
          <ul className={`${styles['ul-main']} gap-3 `}>
            {mainMenu && (
              <Fragment>
                <li>
                  <NavLink
                    to="/"
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
                        onClick={isMobileMenuOpen && directoryHandler}
                      >
                        Довідники
                      </NavLink>
                    </li>
                    <li className={styles.service}>
                      <NavLink
                        data-type="service"
                        onClick={isMobileMenuOpen && serviceHandler}
                      >
                        Сервіси
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/settings"
                        onClick={isMobileMenuOpen && mobilMenuHandler}
                      >
                        Параметри
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                <li>
                  <Link
                    to="/price"
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Прайс
                  </Link>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    onClick={isMobileMenuOpen && mobilMenuHandler}
                  >
                    Про нас
                  </NavLink>
                </li>
                <li className={''}>
                  {isAuth ? (
                    <NavLink to="/out" onClick={logoutHandler}>
                      Вийти
                    </NavLink>
                  ) : (
                    <NavLink
                      to={'/login'}
                      onClick={isMobileMenuOpen && mobilMenuHandler}
                    >
                      Увійти
                    </NavLink>
                  )}
                </li>
              </Fragment>
            )}

            <div className={`${directory} flex flex-col  gap-4`}>
              <li>
                <Link onClick={isMobileMenuOpen && mobilMenuHandler}>
                  Користувачі
                </Link>
              </li>
              <li>
                <Link onClick={isMobileMenuOpen && mobilMenuHandler}>
                  Автомобілі
                </Link>
              </li>
              <li>
                <Link
                  to="/mainrepair"
                  onClick={isMobileMenuOpen && mobilMenuHandler}
                >
                  Види Ремонту
                </Link>
              </li>

              <li>
                <NavLink
                  to="/reports"
                  onClick={isMobileMenuOpen && mobilMenuHandler}
                >
                  Звіт
                </NavLink>
              </li>
            </div>

            <div className={`${service} flex flex-col  gap-4`}>
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
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
