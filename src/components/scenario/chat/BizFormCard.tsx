import styles from './BizFormCard.module.css';

interface BizFormCardProps {
  title: string;
  fields?: string[];
  cta?: string;
}

export function BizFormCard({ title, fields, cta }: BizFormCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>📋 {title}</div>
      <div className={styles.sub}>탭하여 안전한 폼으로 작성</div>
      {fields && fields.length > 0 && (
        <div className={styles.fields}>
          {fields.map((f) => (
            <span key={f} className={styles.field}>
              {f}
            </span>
          ))}
        </div>
      )}
      {cta && <div className={styles.cta}>{cta} →</div>}
    </div>
  );
}
