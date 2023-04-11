import { Fragment } from 'react';
import Header from './Header';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <div className="mx-auto">
        <Header />
        <main className={'container ' + styles.main}>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
