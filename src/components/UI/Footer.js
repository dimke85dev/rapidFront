import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a
          aria-label="facebook"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          aria-label="Instagram"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          aria-label="twitter"
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Your Company Name</p>
    </footer>
  );
};

export default Footer;
