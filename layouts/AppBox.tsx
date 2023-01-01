import Link from 'next/link';
import styles from '@/styles/Dashboard.module.scss';

import { AppInterface } from '@/components/apps';

function ParentBox({
  children,
  color
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className={styles.appBox} style={{
      backgroundColor: color
    }}>
      {children}
    </div>
  )
}

function AppBox(data: AppInterface) {
  return (
    <ParentBox color="white">
      <div className={styles.appBoxContent}>
        <div
          style={{ background: data.gradient }}
          className={styles.appBoxHeader}
        >
          <img src={data.image} alt={data.name} />
        </div>
        <div className={styles.appBoxBody}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <Link href={data.link}>
            <a>
              <button>{data.button}</button>
            </a>
          </Link>
        </div>
      </div>
    </ParentBox>
  )
}


export { ParentBox, AppBox };