import Link from 'next/link';
import styles from './styles.module.scss';

import { FiLogOut, FiMenu } from 'react-icons/fi';
import { signOut } from '../../../contexts/AuthContext';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href='/dashboard'><h1>Waiter</h1></Link>

        <nav className={styles.menuItems}>
          <Link href='/categories'>Categorias</Link>
          <Link href='/products'>Produtos</Link>
          <button onClick={signOut}>
            <FiLogOut size={25} color='#FFFFFF' />
          </button>
        </nav>
        <button className={styles.menuIcon}>
          <FiMenu size={25} color='#FFFFFF'/>
        </button>
      </div>
    </header>
  );
}
