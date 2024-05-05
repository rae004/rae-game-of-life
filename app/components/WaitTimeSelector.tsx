import styles from '@/app/styles.module.css';

export default function WaitTimeSelector({ ...props }: Record<string, any>) {
  const { setWaitTime, waitTime } = props;
  const waitTimes = [0, 100, 250, 1000, 2000];

  return (
    <div className={styles.waitRow}>
      {waitTimes.map((time) => (
        <span key={time}>
          <label htmlFor={'waitTime'} className={`${styles.filterLabel}`}>
            x{time}
          </label>
          <input
            type={'radio'}
            name={'waitTime'}
            onChange={() => setWaitTime(time)}
            checked={waitTime === time}
          />
        </span>
      ))}
    </div>
  );
}
