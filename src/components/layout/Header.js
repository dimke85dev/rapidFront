import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/home" activeClassName={styles.active}>
        <img alt="car service" src="check-engine.svg"></img>
      </NavLink>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/takeacar" activeClassName={styles.active}>
              Прийняти авто
            </NavLink>
          </li>
          <li>
            <NavLink to="/directory" activeClassName={styles.active}>
              Довідник
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName={styles.active}>
              Звіт
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName={styles.active}>
              Параметри
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
