// Image Imports
import logo from '@/images/logo.svg';

// Styles Imports
import styles from '@/styles/Navbar.module.scss';
import Link from 'next/link';


export const Navbar = ({
  pageName
}: {
  pageName: string
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <img src="https://res.cloudinary.com/dtzqgftjk/image/upload/v1674405674/Group_16_2_znhdgs.png" alt="" />
            </a>
          </Link>
        </div>
        <p className={styles.pageName}>{pageName}</p>
      </div>
      <div className={styles.dropdown}>

      </div>
    </div>
  );
}