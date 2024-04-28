import styles from '@/app/styles.module.css';

export default function WaitTimeSelector({ ...props }: Record<string, any>) {
  const { setWaitTime } = props;

  return (
    <div className={styles.waitRow}>
      <span>
        <label htmlFor={'waitTime'} className={`${styles.filterLabel}`}>
          x1
        </label>
        <input
          type={'radio'}
          name={'waitTime'}
          defaultChecked={true}
          onChange={() => setWaitTime(0)}
        />
      </span>
      <span>
        <label htmlFor={'waitTime'} className={`${styles.filterLabel}`}>
          x10
        </label>
        <input
          type={'radio'}
          name={'waitTime'}
          onChange={() => setWaitTime(100)}
        />
      </span>
      <span>
        <label htmlFor={'waitTime'} className={`${styles.filterLabel}`}>
          x50
        </label>
        <input
          type={'radio'}
          name={'waitTime'}
          onChange={() => setWaitTime(250)}
        />
      </span>
      <span>
        <label htmlFor={'waitTime'} className={`${styles.filterLabel}`}>
          x100
        </label>
        <input
          type={'radio'}
          name={'waitTime'}
          onChange={() => setWaitTime(1000)}
        />
      </span>
      <span>
        <label htmlFor={'waitTime'} className={`${styles.filterLabel}`}>
          x200
        </label>
        <input
          type={'radio'}
          name={'waitTime'}
          onChange={() => setWaitTime(2000)}
        />
      </span>
    </div>
  );
}
