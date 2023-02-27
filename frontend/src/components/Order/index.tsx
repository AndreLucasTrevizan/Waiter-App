import styles from './styles.module.scss';

export default function Order() {
  return (
    <div className={styles.orderContainer}>
      <h2>Mesa 12</h2>
      <div className={styles.orderContent}>
        <span>1x - Caipirinha</span>
        <span>1x - Pizza de calebresa</span>
        <div className={styles.orderActions}>
          <button>Concluir</button>
        </div>
      </div>
    </div>
  );
}
