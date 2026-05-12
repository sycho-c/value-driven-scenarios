import styles from './DateDivider.module.css';

interface DateDividerProps {
  text: string;
}

export function DateDivider({ text }: DateDividerProps) {
  return (
    <div className={styles.divider}>
      <span className={styles.pill}>{text}</span>
    </div>
  );
}
