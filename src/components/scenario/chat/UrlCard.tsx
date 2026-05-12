import styles from './UrlCard.module.css';

interface UrlCardProps {
  title: string;
  url: string;
  badge?: string;
  metaText?: string;
}

export function UrlCard({ title, url, badge, metaText }: UrlCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>추적 코드 발급 완료</span>
      <div className={styles.title}>{title}</div>
      <div className={styles.url}>🔗 {url}</div>
      {(badge || metaText) && (
        <div className={styles.meta}>
          {badge && <span className={styles.metaBadge}>{badge}</span>}
          {metaText && <span className={styles.metaText}>{metaText}</span>}
        </div>
      )}
    </div>
  );
}
