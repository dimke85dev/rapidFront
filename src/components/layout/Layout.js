import { Fragment } from 'react';
import Header from './Header';
import styles from './Layout.module.css';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <Fragment>
      <div className="mx-auto text-center items-center">
        <Header />
        <main className={'container ' + styles.main}>{props.children}</main>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default Layout;
